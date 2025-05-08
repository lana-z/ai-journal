import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import JournalEntryForm from "@/components/admin/journal-entry-form";

interface EditJournalEntryPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(_props: EditJournalEntryPageProps) {
  return {
    title: "Edit Journal Entry - Admin Dashboard",
  };
}

export default async function EditJournalEntryPage({ params }: EditJournalEntryPageProps) {
  // Ensure user is authenticated as admin
  await requireAdmin();
  
  const { id } = params;
  
  // Fetch the journal entry
  const entry = await prisma.journalEntry.findUnique({
    where: { id },
  });
  
  // If entry doesn't exist, show 404
  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Journal Entry</h1>
      <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-6">
        <JournalEntryForm entry={entry} isEditing={true} />
      </div>
    </div>
  );
}
