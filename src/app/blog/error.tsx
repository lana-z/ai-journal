'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/nav'

export default function BlogError({
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
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-[#f0f0f0]">Blog Error</h1>
        
        <div className="bg-[#2a2a2a] p-8 rounded-xl border-gradient shadow-md max-w-2xl w-full">
          <h2 className="text-xl font-bold text-[#f0f0f0] mb-4">Something went wrong</h2>
          <p className="text-[#b3b3b3] mb-6">
            The blog content could not be loaded. Please try again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-gradient-to-r from-[#9333ea] to-[#00e5ff] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
            <Link 
              href="/" 
              className="px-4 py-2 bg-[#333333] text-[#f0f0f0] rounded-md hover:bg-[#444444] transition-colors flex items-center justify-center"
            >
              <span>←</span>&nbsp;Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
