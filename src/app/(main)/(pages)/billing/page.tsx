import React from 'react'
import Razorpay from 'razorpay'
import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'
import BillingDashboard from './_components/billing-dashboard'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Billing = async (props: Props) => {
  const { payment_id, order_id, plan_id } = props.searchParams ?? {
    payment_id: '',
    order_id: '',
    plan_id: '',
  }
  
  // Handle Razorpay payment success callback
  if (payment_id && order_id && plan_id) {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        // Verify payment
        const payment = await razorpay.payments.fetch(payment_id)
        
        if (payment.status === 'authorized' || payment.status === 'captured') {
          const user = await currentUser()
          if (user) {
            const planName = plan_id === 'pro' ? 'Pro' : plan_id === 'unlimited' ? 'Unlimited' : 'Free'
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
      } catch (error) {
        console.error('Payment verification error:', error)
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
