'use client'

import { useEffect } from 'react'

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (error?.message?.includes('auth')) {
      console.error('Auth Error - attempting recovery')
      // Try to reset on auth errors
      const timer = setTimeout(() => {
        reset()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [error, reset])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">{error?.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
