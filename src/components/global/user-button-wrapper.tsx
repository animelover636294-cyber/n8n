'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, Component, ErrorInfo } from 'react'

const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
)

type Props = {
  afterSignOutUrl?: string
}

// Error boundary component for UserButton
class UserButtonErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UserButton error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    }
    return this.props.children
  }
}

export const UserButtonWrapper = ({ afterSignOutUrl }: Props) => {
  const [mounted, setMounted] = useState(false)
  const [clerkReady, setClerkReady] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Check if Clerk is loaded by checking for the Clerk object
    const checkClerkReady = () => {
      if (typeof window !== 'undefined') {
        // Check if Clerk is available in window and has initialized
        const clerk = (window as any).Clerk
        if (clerk && (clerk.loaded || clerk.__internal || clerk.user || clerk.session || clerk.client)) {
          // Double check that Clerk is actually ready
          setTimeout(() => {
            setClerkReady(true)
          }, 100)
        } else {
          // Retry after a delay, but limit retries
          const maxRetries = 30
          let retries = 0
          const retry = () => {
            retries++
            if (retries < maxRetries) {
              setTimeout(checkClerkReady, 100)
            }
          }
          retry()
        }
      }
    }
    
    // Start checking after component mounts
    if (mounted) {
      checkClerkReady()
    }
  }, [mounted])

  // Show loading if not mounted or Clerk not ready
  // DO NOT render UserButton until Clerk is confirmed ready
  if (!mounted || !clerkReady) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  // Only render UserButton when Clerk is confirmed ready
  return (
    <UserButtonErrorBoundary>
      <UserButton afterSignOutUrl={afterSignOutUrl} />
    </UserButtonErrorBoundary>
  )
}

