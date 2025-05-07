"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, FileText, Clock } from "lucide-react";

interface DashboardStats {
  totalJournalEntries: number;
  totalBlogPosts: number;
  recentEntries: any[];
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalJournalEntries: 0,
    totalBlogPosts: 0,
    recentEntries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Placeholder until API is implemented
        setStats({
          totalJournalEntries: 2,
          totalBlogPosts: 0,
          recentEntries: [
            {
              id: "1",
              title: "Getting Started with AI",
              createdAt: new Date(),
              published: true
            },
            {
              id: "2",
              title: "My Journey with Next.js",
              createdAt: new Date(),
              published: false
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#9333ea]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/journal/new">
          <Button className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] hover:from-[#8323d0] hover:to-[#00d0eb]">
            <PlusCircle className="mr-2 h-4 w-4" /> New Journal Entry
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#2a2a2a] border-[#333333]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-[#9333ea]" />
              Journal Entries
            </CardTitle>
            <CardDescription className="text-[#b3b3b3]">
              Total entries in your journal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalJournalEntries}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2a2a] border-[#333333]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-[#00e5ff]" />
              Blog Posts
            </CardTitle>
            <CardDescription className="text-[#b3b3b3]">
              Published blog posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalBlogPosts}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2a2a] border-[#333333]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-[#9333ea]" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-[#b3b3b3]">
              Your latest journal entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentEntries.length === 0 ? (
                <p className="text-[#b3b3b3]">No recent entries</p>
              ) : (
                stats.recentEntries.map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center border-b border-[#333333] pb-2">
                    <div>
                      <p className="font-medium text-white">{entry.title}</p>
                      <p className="text-xs text-[#b3b3b3]">{formatDate(entry.createdAt)}</p>
                    </div>
                    <div>
                      {entry.published ? (
                        <span className="px-2 py-1 text-xs bg-green-900/20 text-green-500 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-yellow-900/20 text-yellow-500 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
