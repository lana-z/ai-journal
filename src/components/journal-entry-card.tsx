import { JournalEntry } from '@prisma/client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

type JournalEntryWithRelations = JournalEntry & {
  author: { name: string | null } | null;
  blogPost: { slug: string } | null;
};

interface JournalEntryCardProps {
  entry: JournalEntryWithRelations;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const hasBlogPost = entry.blogPost !== null;
  
  return (
    <Card className="p-8 shadow-md rounded-xl hover:shadow-lg transition-shadow bg-[#2a2a2a] border-gradient card-glow">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-handwriting text-[#9333ea]">
            {formatDate(entry.date)}
          </h4>
          {hasBlogPost && (
            <Link 
              href={`/blog/${entry.blogPost?.slug}`}
              className="text-sm text-[#00e5ff] hover:underline"
            >
              Read full blog post →
            </Link>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-[#f0f0f0]">
          {entry.title}
        </h3>
        
        <p className="text-[#b3b3b3] leading-relaxed">
          {entry.content}
        </p>
        
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {entry.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-[#333333] text-[#b3b3b3]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
