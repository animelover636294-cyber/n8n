'use client'

import { useEffect } from 'react'

export default function ClerkDebug() {
  useEffect(() => {
    try {
      console.log('DEBUG: window.__CLERK_PUBLISHABLE_KEY =', (window as any).__CLERK_PUBLISHABLE_KEY)
      console.log('DEBUG: window.Clerk =', (window as any).Clerk)
      console.log('DEBUG: navigator.userAgent =', navigator.userAgent)
    } catch (e) {
      console.error('ClerkDebug error', e)
    }
  }, [])

  return null
}
