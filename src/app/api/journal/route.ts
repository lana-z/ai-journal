import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import slugify from "slugify";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { title, content, tags, published } = body;

    // Validate required fields
    if (!title || !content || !tags) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slug = slugify(title, { lower: true, strict: true });
    
    // Check if slug already exists
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { slug },
    });

    // If slug exists, append a unique identifier
    if (existingEntry) {
      slug = `${slug}-${Date.now()}`;
    }

    // Create new journal entry
    const journalEntry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        // Use type casting to handle the slug property
        ...(slug ? { slug } as any : {}),
        tags,
        published: published || false,
        authorId: user.id,
      },
    });

    return NextResponse.json(journalEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all journal entries
    const journalEntries = await prisma.journalEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(journalEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 }
    );
  }
}
