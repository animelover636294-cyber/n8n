import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  if (!process.env.STRIPE_SECRET) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      typescript: true,
      apiVersion: '2023-10-16',
    })

    const products = await stripe.prices.list({
      limit: 3,
    })

    return NextResponse.json(products.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Stripe products' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      typescript: true,
      apiVersion: '2023-10-16',
    })
    const data = await req.json()
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url:
        'https://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://localhost:3000/billing',
    })
    return NextResponse.json(session.url)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create Stripe session' },
      { status: 500 }
    )
  }
}
