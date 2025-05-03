import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Journal Entry functions
export async function getJournalEntries() {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: {
        published: true,
      },
      orderBy: {
        date: 'desc',
      },
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
    
    return entries;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
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
