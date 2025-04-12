import Link from "next/link"
import { Youtube, Linkedin, Instagram, X, Github } from "lucide-react"

export default function SocialLinks() {
  return (
    <div className="flex gap-5 mt-4">
      <Link href="#" aria-label="LinkedIn" className="text-[#b3b3b3] hover:text-[#00e5ff] transition-colors">
        <Linkedin className="h-5 w-5" />
      </Link>
      <Link href="#" aria-label="Github" className="text-[#b3b3b3] hover:text-[#9333ea] transition-colors">
        <Github className="h-5 w-5" />
      </Link>
      <Link href="#" aria-label="X" className="text-[#b3b3b3] hover:text-[#9333ea] transition-colors">
        <X className="h-5 w-5" />
      </Link>
      <Link href="#" aria-label="YouTube" className="text-[#b3b3b3] hover:text-[#9333ea] transition-colors">
        <Youtube className="h-5 w-5" />
      </Link>
      <Link href="#" aria-label="Instagram" className="text-[#b3b3b3] hover:text-[#9333ea] transition-colors">
        <Instagram className="h-5 w-5" />
      </Link>
    </div>
  )
}