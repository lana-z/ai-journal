'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
      <div className="max-w-md w-full bg-[#2a2a2a] p-8 rounded-xl border-gradient shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#f0f0f0] mb-4">Something went wrong</h2>
        <p className="text-[#b3b3b3] mb-6">
          Apologies for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-gradient-to-r from-[#9333ea] to-[#00e5ff] text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-[#333333] text-[#f0f0f0] rounded-md hover:bg-[#444444] transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
