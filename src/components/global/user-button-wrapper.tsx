'use client'

import { UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

type Props = {
  afterSignOutUrl?: string
}

export const UserButtonWrapper = ({ afterSignOutUrl }: Props) => {
  const [isClerkReady, setIsClerkReady] = useState(false)

  useEffect(() => {
    // Wait for Clerk to be available
    const checkClerk = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        setIsClerkReady(true)
      } else {
        // Retry after a short delay
        setTimeout(checkClerk, 100)
      }
    }
    checkClerk()
  }, [])

  if (!isClerkReady) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  return <UserButton afterSignOutUrl={afterSignOutUrl} />
}

