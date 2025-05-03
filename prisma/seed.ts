import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create the admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {}, // Keep existing data if user exists
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: 'ADMIN',
      bio: 'Administrator of the AI Journal App',
    },
  });

  console.log('Admin user created or updated:', admin.email);

  // Create sample journal entries
  const journalEntry1 = await prisma.journalEntry.create({
    data: {
      title: 'Getting Started with AI Journal',
      date: new Date(),
      content: 'Today marks the beginning of my journey with AI-enhanced content creation. This platform will help transform simple journal entries into comprehensive blog posts with minimal effort.',
      tags: ['ai', 'journaling', 'getting-started'],
      published: true,
      authorId: admin.id,
    },
  });

  const journalEntry2 = await prisma.journalEntry.create({
    data: {
      title: 'The Power of Consistent Writing',
      date: new Date(Date.now() - 86400000), // Yesterday
      content: 'Consistency is key to building a successful blog. Even a short daily entry can provide the foundation for meaningful content when enhanced by AI.',
      tags: ['writing', 'consistency', 'blogging-tips'],
      published: true,
      authorId: admin.id,
    },
  });

  console.log('Created sample journal entries:', journalEntry1.title, journalEntry2.title);

  // Create a blog post linked to the first journal entry
  const blogPost = await prisma.blogPost.create({
    data: {
      title: 'Leveraging AI to Transform Your Writing Process',
      slug: 'ai-transform-writing-process',
      summary: 'How AI tools can help turn simple journal entries into comprehensive blog content.',
      content: `# Leveraging AI to Transform Your Writing Process

AI technology is revolutionizing how we approach content creation. What begins as a simple journal entry can quickly evolve into a comprehensive blog post with the right tools.

## The Journal-to-Blog Pipeline

The process is straightforward:
1. Write a quick journal entry with your core thoughts
2. Let AI expand on your ideas with relevant research
3. Review and refine the generated content
4. Publish your enhanced blog post

This approach maintains your authentic voice while saving hours of research and writing time.

## Benefits of AI-Enhanced Writing

- **Efficiency**: Transform brief notes into full articles
- **Consistency**: Maintain a regular publishing schedule
- **Quality**: Ensure comprehensive coverage of topics
- **Focus**: Concentrate on ideas rather than execution

By combining your unique insights with AI assistance, you can create more valuable content for your readers while spending less time on the technical aspects of writing.`,
      publishDate: new Date(),
      journalEntryId: journalEntry1.id,
      authorId: admin.id,
      tags: ['ai-writing', 'content-creation', 'productivity', 'blogging'],
      aiGenerated: true,
      published: true,
    },
  });

  console.log('Created sample blog post:', blogPost.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });