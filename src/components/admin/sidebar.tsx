"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Home, 
  BookOpen, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Journal Entries", href: "/admin/journal", icon: BookOpen },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];
  
  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };
  
  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-[#2a2a2a] border-[#444444]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out md:relative md:flex z-40`}
      >
        <div className="w-64 bg-[#2a2a2a] h-full flex flex-col shadow-xl">
          {/* Logo */}
          <div className="p-6 border-b border-[#444444]">
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] text-transparent bg-clip-text font-bold text-xl">
                AI Journal
              </span>
              <span className="text-white font-bold">Admin</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 pt-6 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-[#9333ea]/20 to-[#00e5ff]/20 text-white"
                      : "text-[#b3b3b3] hover:bg-[#333333] hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-[#444444]">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-[#b3b3b3] hover:bg-[#333333] hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
