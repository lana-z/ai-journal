import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import slugify from "slugify";
import { JournalEntry } from "@prisma/client";

// Interface for JournalEntry with optional slug field
// Currently using type assertions instead due to TypeScript limitations with Prisma
// but keeping this as documentation of the actual schema structure
// interface JournalEntryWithSlug extends JournalEntry {
//   slug?: string;
// }

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get journal entry by ID
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
    });

    if (!journalEntry) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(journalEntry);
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entry" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    // Check if journal entry exists
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    // Use a type assertion with Record to safely access dynamic properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entryWithSlug = existingEntry as any;
    let slug: string | undefined = entryWithSlug.slug;
    if (title !== existingEntry.title) {
      slug = slugify(title, { lower: true, strict: true });

      // Check if new slug already exists (excluding current entry)
      const slugExists = await prisma.journalEntry.findFirst({
        where: {
          title: { equals: title }, // Check by title instead of slug
          id: { not: id },
        },
      });

      // If slug exists, append a unique identifier
      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Update journal entry
    const updatedEntry = await prisma.journalEntry.update({
      where: { id },
      data: {
        title,
        content,
        // Use spread operator to conditionally include the slug property
        ...(slug ? { slug } : {}),
        tags,
        published,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Error updating journal entry:", error);
    return NextResponse.json(
      { error: "Failed to update journal entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if journal entry exists
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    // Delete journal entry
    await prisma.journalEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    return NextResponse.json(
      { error: "Failed to delete journal entry" },
      { status: 500 }
    );
  }
}
