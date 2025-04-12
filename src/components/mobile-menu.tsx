"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/blog" className="text-xl py-2 hover:text-purple-300" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/about" className="text-xl py-2 hover:text-purple-300" onClick={() => setOpen(false)}>
            About Me
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
