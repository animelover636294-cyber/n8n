'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application Error:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="rounded-lg border border-red-300 bg-red-50 p-6">
        <h1 className="mb-2 text-xl font-bold text-red-800">Something went wrong!</h1>
        <p className="mb-4 text-red-700">{error.message}</p>
        <details className="mb-4 cursor-pointer">
          <summary className="font-mono text-sm text-red-600">Details</summary>
          <pre className="mt-2 overflow-auto rounded bg-red-100 p-2 text-xs text-red-900">
            {error.stack}
          </pre>
        </details>
        <button
          onClick={() => reset()}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
