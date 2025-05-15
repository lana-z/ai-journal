import { requireAdmin } from "@/lib/auth";
import JournalEntryForm from "@/components/admin/journal-entry-form";

export const metadata = {
  title: "New Journal Entry - Admin Dashboard",
};

export default async function NewJournalEntryPage() {
  // Ensure user is authenticated as admin
  await requireAdmin();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Journal Entry</h1>
      <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-6">
        <JournalEntryForm />
      </div>
    </div>
  );
}
