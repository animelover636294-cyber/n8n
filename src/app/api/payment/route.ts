import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

// Define subscription plans (in USD for PayPal)
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
    amount: 24.99, // $24.99/month
    credits: '100',
  },
  {
    id: 'unlimited',
    nickname: 'Unlimited',
    amount: 99.99, // $99.99/month
    credits: 'unlimited',
  },
]

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'

// GET handler - Returns available plans
export async function GET(req: NextRequest) {
  try {
    // Return the plans as products
    const products = PLANS.map((plan) => ({
      id: plan.id,
      nickname: plan.nickname,
      unit_amount: Math.round(plan.amount * 100), // Convert to cents
      credits: plan.credits,
      currency: 'USD',
    }))

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Payment GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment plans' },
      { status: 500 }
    )
  }
}

// POST handler - Handles payment creation
export async function POST(req: NextRequest) {
  try {
    // If PayPal credentials are not configured, return free plan
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET_KEY) {
      return NextResponse.json(
        {
          success: true,
          message: 'Payment processing disabled - Free plan applied',
          tier: 'Free',
          credits: '10',
        },
        { status: 200 }
      )
    }

    const { priceId } = await req.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Find the plan
    const plan = PLANS.find((p) => p.id === priceId)
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      )
    }

    // If free plan, just return success
    if (plan.amount === 0) {
      return NextResponse.json(
        {
          success: true,
          amount: 0,
          tier: plan.nickname,
          credits: plan.credits,
        },
        { status: 200 }
      )
    }

    // For paid plans, return success (payment processing disabled for now)
    return NextResponse.json(
      {
        success: true,
        message: 'Payment plan selected - contact support to activate',
        tier: plan.nickname,
        credits: plan.credits,
        amount: plan.amount,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Payment POST error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}
