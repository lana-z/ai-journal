"use client";

import { useState } from "react";
import Link from "next/link";
import { JournalEntry } from "@prisma/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface JournalEntriesTableProps {
  entries: JournalEntry[];
  onDelete?: (id: string) => void;
}

export default function JournalEntriesTable({ 
  entries, 
  onDelete 
}: JournalEntriesTableProps) {
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedContent === id) {
      setExpandedContent(null);
    } else {
      setExpandedContent(id);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No journal entries found
              </TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.id} className="group">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{entry.title}</span>
                    {expandedContent === entry.id && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="line-clamp-3">{entry.content}</div>
                      </div>
                    )}
                    <button
                      onClick={() => toggleExpand(entry.id)}
                      className="text-xs text-primary mt-1 hover:underline"
                    >
                      {expandedContent === entry.id ? "Show less" : "Show more"}
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(entry.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-[#333333]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={entry.published ? "default" : "outline"}
                    className={entry.published ? "bg-green-600" : "text-yellow-500 border-yellow-500"}
                  >
                    {entry.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/journal/${entry.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/journal/edit/${entry.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100/10"
                        onClick={() => onDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
