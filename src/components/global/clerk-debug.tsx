'use client'

import { useEffect } from 'react'

export default function ClerkDebug() {
  useEffect(() => {
    try {
      const w = window as any
      console.log('[Clerk Debug] Initialization check at', new Date().toISOString())
      console.log('[Clerk Debug] __CLERK_PUBLISHABLE_KEY =', w.__CLERK_PUBLISHABLE_KEY)
      console.log('[Clerk Debug] window.Clerk exists?', !!w.Clerk)
      console.log('[Clerk Debug] window.Clerk object =', w.Clerk)
      console.log('[Clerk Debug] navigator.userAgent =', navigator.userAgent)
      
      // Check if Clerk SDK is loaded
      if (w.Clerk) {
        console.log('[Clerk Debug] Clerk.loaded =', w.Clerk.loaded)
        console.log('[Clerk Debug] Clerk.session =', w.Clerk.session)
        console.log('[Clerk Debug] Clerk.user =', w.Clerk.user)
      }
      
      // Log environment detection
      console.log('[Clerk Debug] NODE_ENV =', process.env.NODE_ENV)
      console.log('[Clerk Debug] Origin =', typeof window !== 'undefined' ? window.location.origin : 'N/A')
    } catch (e) {
      console.error('[Clerk Debug] Error during check:', e)
    }
  }, [])

  return null
}
