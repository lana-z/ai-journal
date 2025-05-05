"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during sign in");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1f1f] p-4">
      <Card className="w-full max-w-md bg-[#2a2a2a] text-white border-[#444]">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-400">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 text-red-400 border border-red-800 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-300">Email</div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#333] border-[#444] text-white  placeholder:text-gray-500"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-300">Password</div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#333] border-[#444] text-white placeholder:text-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
