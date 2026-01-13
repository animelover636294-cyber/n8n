'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { useEffect, useState, Component, ErrorInfo } from 'react'

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
  const { isLoaded } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoaded) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  return (
    <UserButtonErrorBoundary>
      <UserButton afterSignOutUrl={afterSignOutUrl} />
    </UserButtonErrorBoundary>
  )
}

