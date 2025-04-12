import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"

export default function Nav() {
  return (
    <header className="max-w-[1600px] mx-auto px-6 py-8 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        <h1 className="font-handwriting text-2xl neon-glow gradient-text">LANA ZUMBRUNN</h1>
      </Link>

      <nav className="hidden md:flex gap-10">
        <Link href="/blog" className="hover:text-[#9333ea] transition-colors">
          Blog
        </Link>
        <Link href="/about" className="hover:text-[#9333ea] transition-colors">
          About Me
        </Link>
      </nav>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  )
}
