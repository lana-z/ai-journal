import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import JournalEntriesTable from "@/components/admin/journal-entries-table";

export const metadata = {
  title: "Journal Entries - Admin Dashboard",
};

export default async function JournalEntriesPage() {
  // Ensure user is authenticated as admin
  await requireAdmin();
  
  // Fetch all journal entries
  const entries = await prisma.journalEntry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Journal Entries</h1>
        <Link href="/admin/journal/new">
          <Button className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] hover:from-[#8323d0] hover:to-[#00d0eb]">
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </Link>
      </div>
      
      <div className="rounded-lg border border-[#333333] bg-[#2a2a2a]">
        <div className="p-1">
          <JournalEntriesTable entries={entries} />
        </div>
      </div>
    </div>
  );
}
