import { NextResponse, NextRequest } from 'next/server'
import Razorpay from 'razorpay'

// Define subscription plans (in INR - Indian Rupees)
const PLANS = [
  {
    id: 'free',
    nickname: 'Free',
    amount: 0,
    credits: '10',
  },
  {
    id: 'pro',
    nickname: 'Pro',
    amount: 2499, // ₹24.99/month in paise (smallest currency unit)
    credits: '100',
  },
  {
    id: 'unlimited',
    nickname: 'Unlimited',
    amount: 9999, // ₹99.99/month in paise
    credits: 'unlimited',
  },
]

export async function GET(req: NextRequest) {
  // Return the plans as products (similar to Stripe's format)
  const products = PLANS.map((plan) => ({
    id: plan.id,
    nickname: plan.nickname,
    unit_amount: plan.amount,
    currency: 'INR',
  }))

  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: 'Razorpay is not configured' },
      { status: 503 }
    )
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const data = await req.json()
    const planId = data.priceId

    // Find the plan
    const plan = PLANS.find((p) => p.id === planId)
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // If free plan, return success immediately
    if (plan.amount === 0) {
      return NextResponse.json({ 
        orderId: 'free_plan',
        amount: 0,
        currency: 'INR',
      })
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: plan.amount, // Amount in paise
      currency: 'INR',
      receipt: `plan_${planId}_${Date.now()}`,
      notes: {
        planId: planId,
        planName: plan.nickname,
        credits: plan.credits,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error: any) {
    console.error('Razorpay error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    )
  }
}
