'use server'

import { currentUser } from '@clerk/nextjs/server'

export interface PaymentDetailsResponse {
  tier: 'Free' | 'Pro' | 'Unlimited'
  credits: number
}

export async function onPaymentDetails(): Promise<PaymentDetailsResponse | null> {
  try {
    const user = await currentUser()
    
    if (!user) {
      console.error('User not authenticated')
      return null
    }

    // For now, return default values
    // In a real implementation, this would fetch from a database or payment provider
    return {
      tier: 'Free',
      credits: 0,
    }
  } catch (error) {
    console.error('Error fetching payment details:', error)
    return null
  }
}
