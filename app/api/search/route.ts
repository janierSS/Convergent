import { NextRequest, NextResponse } from "next/server";
import { searchAuthors, searchInstitutions, calculateMatchScore } from "@/lib/openalex";
import { SearchFilters, SearchCategory } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "20");
    const category = (searchParams.get("category") || "authors") as SearchCategory;

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Build filters
    const filters: SearchFilters = {
      query,
      country: searchParams.get("country") || undefined,
      institution: searchParams.get("institution") || undefined,
      conceptId: searchParams.get("concept") || undefined,
      minHIndex: searchParams.get("min_h_index")
        ? parseInt(searchParams.get("min_h_index")!)
        : undefined,
      minCitations: searchParams.get("min_citations")
        ? parseInt(searchParams.get("min_citations")!)
        : undefined,
      institutionType: searchParams.get("institution_type") || undefined,
    };

    // Search based on category
    if (category === "institutions") {
      const response = await searchInstitutions(query, filters, page, perPage);

      // Remove duplicates based on institution ID
      const uniqueResults = response.results.filter(
        (institution, index, self) =>
          index === self.findIndex((i) => i.id === institution.id)
      );

      return NextResponse.json({
        results: uniqueResults,
        meta: response.meta,
      });
    } else {
      // Default to authors
      const response = await searchAuthors(query, filters, page, perPage);

      // Remove duplicates based on author ID
      const uniqueResults = response.results.filter(
        (author, index, self) =>
          index === self.findIndex((a) => a.id === author.id)
      );

      // Calculate match scores for each result
      const resultsWithScores = uniqueResults.map((author) => ({
        ...author,
        matchScore: calculateMatchScore(author, query),
      }));

      // Sort by match score
      resultsWithScores.sort((a, b) => b.matchScore - a.matchScore);

      return NextResponse.json({
        results: resultsWithScores,
        meta: response.meta,
      });
    }
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: `Failed to search ${searchParams.get("category") || "authors"}` },
      { status: 500 }
    );
  }
}

