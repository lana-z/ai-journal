import Image from "next/image"
import { Card } from "@/components/ui/card"
import Nav from "@/components/nav"
import SocialLinks from "@/components/social-links"
import { FilterBar } from "@/components/filter-bar"
import { getJournalEntries, getAllTags, type JournalEntryFilters, type JournalEntrySortOption } from "@/lib/db"
import { JournalEntryCard } from "@/components/journal-entry-card"
import { Pagination } from "@/components/pagination"

// Define page size for pagination
const ITEMS_PER_PAGE = 5;

interface HomeProps {
  searchParams: {
    search?: string;
    tags?: string;
    sort?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  // Await searchParams object
  const params = await searchParams;
  
  const filters: JournalEntryFilters = {
    search: params.search,
    tags: params.tags?.split(',').filter(Boolean),
    sort: (params.sort as JournalEntrySortOption) || 'newest',
    page: params.page ? parseInt(params.page) : 1,
    pageSize: ITEMS_PER_PAGE
  };
  
  // Fetch journal entries with filters
  const { entries: journalEntries, pagination } = await getJournalEntries(filters);
  
  // Fetch all unique tags for the filter UI
  const allTags = await getAllTags();
  
  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <Nav />

      <main className="max-w-[1600px] mx-auto px-0 md:px-4 pt-16 pb-20 relative">
        {/* Mobile layout - only visible on small screens */}
        <div className="md:hidden flex flex-col space-y-8 m-4">
          {/* Title and subheading */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight">
              My AI Journal
            </h1>
            <div className="text-xl leading-relaxed">
              <span className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] px-1 neon-glow">A chronological record</span><br />
              of my journey with AI tools and workflows
            </div>
          </div>

          {/* Abbreviated bio */}
          <div className="flex items-center space-x-4 bg-[#2a2a2a] p-4 rounded-xl">
            <div className="rounded-full overflow-hidden border-2 border-[#9333ea] p-1 bg-gradient-to-r from-[#9333ea] to-[#00e5ff] self-start w-fit">
              <Image
                src="/lana-pfp-pink-purple.png?height=60&width=60"
                alt="Lana Zumbrunn"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-[#b3b3b3]">
                I&apos;m a full stack developer who does technical consulting and contract team leadership. My background is in startup ecosystem building and strategy.
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Search and Filters */}
          <FilterBar allTags={allTags} isMobile={true} />

          {/* Journal Entries */}
          <div className="space-y-8">
            {journalEntries.length > 0 ? (
              journalEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))
            ) : (
              <Card className="p-8 shadow-md rounded-xl hover:shadow-lg transition-shadow bg-[#2a2a2a] border-gradient card-glow">
                <h4 className="text-xl font-handwriting mb-3 text-[#9333ea]">No entries found</h4>
                <p className="text-[#f0f0f0] leading-relaxed font-semibold">
                  No journal entries match your search criteria.
                </p>
                <p className="text-[#b3b3b3] leading-relaxed mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </Card>
            )}
          </div>
          
          {/* Pagination - Mobile */}
          {pagination.pageCount > 1 && (
            <Pagination 
              totalItems={pagination.total}
              itemsPerPage={pagination.pageSize}
              currentPage={pagination.page}
            />
          )}
        </div>

        {/* Desktop layout - hidden on mobile */}
        {/* Left Column - Bio (sticky) */}
        <div className="hidden flex md:flex md:flex-row m-4 md:mx-0 md:my-12">
          <div className="md:mr-30 md:flex md:flex-row md:w-[25%] space-y-8 md:sticky md:top-[20%] md:h-fit min-w-[70px] min-h-[70px]">
            <div className="mx-5 rounded-full overflow-hidden border-2 border-[#9333ea] p-1 bg-gradient-to-r from-[#9333ea] to-[#00e5ff] self-start w-fit flex items-center justify-center min-w-[70px] min-h-[70px]">
              <Image
                src="/lana-pfp-pink-purple.png?height=200&width=200"
                alt="Lana Zumbrunn"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col items-start gap-5">
              <p className="text-sm lg:text-lg leading-relaxed text-[#b3b3b3]">
              I&apos;m a full stack dev who does technical consulting and contract team leadership.
              </p>
              <p className="text-sm lg:text-lg leading-relaxed pt-2 text-[#b3b3b3]">
                I became a developer because of my love for new and emerging tech like AI, blockchain and multi-cloud.
              </p>
              <p className="text-sm lg:text-lg leading-relaxed pt-2 text-[#b3b3b3]">My background is in startup ecosystem building and strategy.</p>
              <div className="pt-2">
                <h3 className="text-base md:text-lg mb-4 text-[#00e5ff]">Find Me</h3>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Right Column - Content (scrolls normally) */}
          <div className="w-full md:w-[50%] space-y-12">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                My AI Journal<br />
                <span className="bg-gradient-to-r from-[#9333ea] to-[#00e5ff] px-1 neon-glow">A chronological record</span><br />
                of my journey with AI tools and workflows
              </h1>
              <div>
                <FilterBar allTags={allTags} />
              </div>
            </div>
            
            {/* Journal Entries */}
            <div className="space-y-8">
              {journalEntries.length > 0 ? (
                journalEntries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))
              ) : (
                <Card className="p-8 shadow-md rounded-xl hover:shadow-lg transition-shadow bg-[#2a2a2a] border-gradient card-glow">
                  <h4 className="text-xl font-handwriting mb-3 text-[#9333ea]">No entries found</h4>
                  <p className="text-[#f0f0f0] leading-relaxed font-semibold">
                    No journal entries match your search criteria.
                  </p>
                  <p className="text-[#b3b3b3] leading-relaxed mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </Card>
              )}
            </div>
            
            {/* Pagination - Desktop */}
            {pagination.pageCount > 1 && (
              <Pagination 
                totalItems={pagination.total}
                itemsPerPage={pagination.pageSize}
                currentPage={pagination.page}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
