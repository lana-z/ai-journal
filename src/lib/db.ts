import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Types for filtering and sorting
export type JournalEntrySortOption = 'newest' | 'oldest' | 'title';

export interface JournalEntryFilters {
  search?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
  sort?: JournalEntrySortOption;
}

// Journal Entry functions
export async function getJournalEntries(filters?: JournalEntryFilters) {
  try {
    const {
      search,
      tags,
      page = 1,
      pageSize = 5,
      sort = 'newest'
    } = filters || {};

    // Build where clause
    const where: any = {
      published: true,
    };

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add tags filter
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    // Determine sort order
    const orderBy: any = {};
    switch (sort) {
      case 'oldest':
        orderBy.date = 'asc';
        break;
      case 'title':
        orderBy.title = 'asc';
        break;
      case 'newest':
      default:
        orderBy.date = 'desc';
        break;
    }

    // Get total count for pagination
    const totalCount = await prisma.journalEntry.count({ where });

    // Get entries with pagination
    const entries = await prisma.journalEntry.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        blogPost: {
          select: {
            slug: true,
          },
        },
      },
    });
    
    return {
      entries,
      pagination: {
        total: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
      }
    };
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return {
      entries: [],
      pagination: {
        total: 0,
        pageCount: 0,
        page: 1,
        pageSize: 5,
      }
    };
  }
}

// Get all unique tags from journal entries
export async function getAllTags() {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { published: true },
      select: { tags: true },
    });
    
    // Extract and deduplicate tags
    const allTags = entries.flatMap(entry => entry.tags);
    const uniqueTags = [...new Set(allTags)];
    
    return uniqueTags.sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Blog Post functions
export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        journalEntry: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        journalEntry: {
          select: {
            title: true,
            content: true,
            tags: true,
          },
        },
      },
    });
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
