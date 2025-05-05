"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JournalEntry } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";

const journalEntrySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),
  published: z.boolean().default(false),
});

type JournalEntryFormValues = z.infer<typeof journalEntrySchema>;

interface JournalEntryFormProps {
  entry?: JournalEntry;
  isEditing?: boolean;
}

export default function JournalEntryForm({ entry, isEditing = false }: JournalEntryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<JournalEntryFormValues> = {
    title: entry?.title || "",
    content: entry?.content || "",
    tags: entry?.tags || [],
    published: entry?.published || false,
  };

  const form = useForm<JournalEntryFormValues>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues,
  });

  async function onSubmit(data: JournalEntryFormValues) {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/journal/${entry?.id}` : "/api/journal";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save journal entry");
      }

      router.push("/admin/journal");
      router.refresh();
    } catch (error) {
      console.error("Error saving journal entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your journal entry here..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="Add tags (press Enter)"
                  tags={field.value}
                  setTags={(newTags) => field.onChange(newTags)}
                />
              </FormControl>
              <FormDescription>
                Press Enter to add a tag. Tags help categorize your entries.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#333333] p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  Make this entry visible to readers
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/journal")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] hover:from-[#8323d0] hover:to-[#00d0eb]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update Entry" : "Create Entry"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
