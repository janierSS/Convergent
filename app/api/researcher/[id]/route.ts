import { NextRequest, NextResponse } from "next/server";
import { getAuthor, getAuthorWorks } from "@/lib/openalex";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Researcher ID is required" },
        { status: 400 }
      );
    }

    // Fetch author details and their works in parallel
    const [author, worksResponse] = await Promise.all([
      getAuthor(id),
      getAuthorWorks(id, 1, 10),
    ]);

    // Get top concepts (sorted by score)
    const topConcepts = author.x_concepts
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({
      ...author,
      recentWorks: worksResponse.results,
      topConcepts,
    });
  } catch (error) {
    console.error("Researcher fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch researcher details" },
      { status: 500 }
    );
  }
}

