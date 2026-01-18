import React from 'react'
import axios from 'axios'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import BillingDashboard from './_components/billing-dashboard'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

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
}

const Billing = async (props: Props) => {
  const { payment_success, payment_cancelled, token, plan_id, PayerID } =
    props.searchParams ?? {
      payment_success: '',
      payment_cancelled: '',
      token: '',
      plan_id: '',
      PayerID: '',
    }

  // Handle PayPal payment success callback
  // PayPal redirects with 'token' parameter containing the order ID
  if (payment_success === 'true' && token && plan_id) {
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET_KEY) {
      try {
        const accessToken = await getPayPalAccessToken()

        // Capture the PayPal order (token is the order ID)
        const captureResponse = await axios.post(
          `${PAYPAL_API_BASE}/v2/checkout/orders/${token}/capture`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        const order = captureResponse.data

        // Verify payment was successful
        if (order.status === 'COMPLETED') {
              const { userId } = await auth()
              if (userId) {
            const planName =
              plan_id === 'pro'
                ? 'Pro'
                : plan_id === 'unlimited'
                ? 'Unlimited'
                : 'Free'
            await db.user.update({
              where: {
                clerkId: user.id,
              },
              data: {
                tier: planName,
                credits:
                  plan_id === 'unlimited'
                    ? 'Unlimited'
                    : plan_id === 'pro'
                    ? '100'
                    : '10',
              },
            })
          }
        }
      } catch (error: any) {
        console.error(
          'PayPal payment verification error:',
          error.response?.data || error.message
        )
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <BillingDashboard />
    </div>
  )
}

export default Billing
