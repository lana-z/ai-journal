import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions as any);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  
  return user;
}
