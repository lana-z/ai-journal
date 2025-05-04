'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBarProps {
  allTags: string[];
  isMobile?: boolean;
}

export function FilterBar({ allTags, isMobile = false }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');

  // Update URL when filters change
  const updateFilters = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (sortOption !== 'newest') params.set('sort', sortOption);
    
    // Update the page number to 1 when filters change
    if (searchParams.has('page') && (
      searchQuery !== searchParams.get('search') ||
      selectedTags.join(',') !== (searchParams.get('tags') || '') ||
      sortOption !== (searchParams.get('sort') || 'newest')
    )) {
      params.set('page', '1');
    } else if (searchParams.has('page')) {
      params.set('page', searchParams.get('page')!);
    }
    
    router.push(`?${params.toString()}`);
  }, [searchQuery, selectedTags, sortOption, router, searchParams]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle tag removal
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Update filters when sort option changes
  useEffect(() => {
    updateFilters();
  }, [sortOption, updateFilters]);

  // Update filters when tags change
  useEffect(() => {
    updateFilters();
  }, [selectedTags, updateFilters]);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className={`flex items-center ${isMobile ? "w-full" : "max-w-md"}`}>
          <Input
            type="text"
            placeholder="Search journal entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`rounded-none border-[#444444] bg-[#333333] ${
              isMobile ? "py-4 px-3" : "py-6 px-4"
            } text-[#f0f0f0] focus:border-[#9333ea]`}
          />
          <Button 
            type="submit"
            className={`rounded-none bg-gradient-to-r from-[#9333ea] to-[#00e5ff] hover:from-[#8429d8] hover:to-[#00c4e0] text-[#f0f0f0] md:py-5 ${
              isMobile ? "px-4" : "px-6"
            }`}
          >
            Search
          </Button>
        </div>
      </form>

      {/* Filters and Sort */}
      <div className={`flex ${isMobile ? "flex-col space-y-4" : "flex-row justify-between items-center"}`}>
        {/* Tag Filters */}
        <div className="space-y-2">
          <p className="text-sm text-[#b3b3b3]">Filter by tags:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, isMobile ? 5 : 8).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-[#9333ea] hover:bg-[#8429d8]"
                    : "bg-[#333333] hover:bg-[#444444] text-[#b3b3b3]"
                }`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Badge>
            ))}
            {allTags.length > (isMobile ? 5 : 8) && (
              <Badge
                variant="outline"
                className="bg-[#333333] hover:bg-[#444444] text-[#b3b3b3] cursor-pointer"
              >
                +{allTags.length - (isMobile ? 5 : 8)} more
              </Badge>
            )}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#b3b3b3]">Sort by:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px] bg-[#333333] border-[#444444] text-[#f0f0f0]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] border-[#444444] text-[#f0f0f0]">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedTags.length > 0 || searchQuery) && (
        <div className="pt-2">
          <p className="text-sm text-[#b3b3b3] mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="bg-[#9333ea] flex items-center gap-1"
              >
                {tag}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
            {searchQuery && (
              <Badge
                variant="default"
                className="bg-[#00e5ff] flex items-center gap-1"
              >
                Search: {searchQuery}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchQuery('');
                    updateFilters();
                  }}
                />
              </Badge>
            )}
            <Button
              variant="link"
              className="text-[#00e5ff] p-0 h-auto text-xs"
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
                setSortOption('newest');
                router.push('/');
              }}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
