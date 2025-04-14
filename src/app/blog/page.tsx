import Link from "next/link"
import Nav from "@/components/nav"

export const metadata = {
  title: "Blog | Lana Zumbrunn - AI Journal",
  description: "Blog posts about AI tools, workflows, and experiences.",
}

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-[#f0f0f0]">Blog</h1>
        
        <div className="bg-[#2a2a2a] p-8 rounded-xl border-gradient shadow-md max-w-2xl w-full">
          <p className="text-lg text-[#b3b3b3] mb-6">Coming soon...</p>
          
          <Link href="/" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors flex items-center gap-2">
            <span>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
