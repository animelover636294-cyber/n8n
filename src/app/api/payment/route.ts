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

// PayPal Sandbox API base URL
const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'

// Get PayPal access token
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_SECRET_KEY

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured')
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${auth}`,
        },
      }
    )

    return response.data.access_token
  } catch (error: any) {
    console.error('PayPal auth error:', error.response?.data || error.message)
    throw new Error('Failed to get PayPal access token')
  }
}

export async function GET(req: NextRequest) {
  // Return the plans as products
  const products = PLANS.map((plan) => ({
    id: plan.id,
    nickname: plan.nickname,
    unit_amount: Math.round(plan.amount * 100), // Convert to cents
    currency: 'USD',
  }))

  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET_KEY) {
    return NextResponse.json(
      { error: 'PayPal is not configured' },
      { status: 503 }
    )
  }

  try {
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
        currency: 'USD',
      })
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Get the origin URL for return/cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3001'

    // Create PayPal order
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `plan_${planId}_${Date.now()}`,
          description: `${plan.nickname} Plan - ${plan.credits} credits`,
          amount: {
            currency_code: 'USD',
            value: plan.amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Fuzzie',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${origin}/billing?payment_success=true&plan_id=${planId}`,
        cancel_url: `${origin}/billing?payment_cancelled=true&plan_id=${planId}`,
      },
    }

    const orderResponse = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const order = orderResponse.data

    // Find approval URL
    const approvalUrl = order.links.find(
      (link: any) => link.rel === 'approve'
    )?.href

    return NextResponse.json({
      orderId: order.id,
      approvalUrl: approvalUrl,
      amount: plan.amount,
      currency: 'USD',
      planId: planId,
    })
  } catch (error: any) {
    console.error('PayPal error:', error.response?.data || error.message)
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to create PayPal order',
      },
      { status: 500 }
    )
  }
}
