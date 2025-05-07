"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
    
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1f1f1f] text-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#9333ea]"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1f1f1f] text-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#9333ea]"></div>
          <p className="mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1f1f1f] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#1f1f1f] text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
