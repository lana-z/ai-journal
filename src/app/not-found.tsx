import Link from 'next/link'
import Nav from '@/components/nav'

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-[#2a2a2a] p-8 rounded-xl border-gradient shadow-md max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-2 text-[#9333ea]">404</h1>
          <h2 className="text-2xl font-bold mb-6 text-[#f0f0f0]">Page Not Found</h2>
          <p className="text-[#b3b3b3] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            href="/" 
            className="px-6 py-3 bg-gradient-to-r from-[#9333ea] to-[#00e5ff] text-white rounded-md hover:opacity-90 transition-opacity inline-flex items-center"
          >
            <span>←</span>&nbsp;Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
