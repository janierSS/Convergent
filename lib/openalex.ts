import {
  OpenAlexAuthor,
  OpenAlexWork,
  OpenAlexSearchResponse,
  SearchFilters,
  ExtendedInstitution,
} from "@/types";

const OPENALEX_API_URL =
  process.env.NEXT_PUBLIC_OPENALEX_API_URL || "https://api.openalex.org";

// Rate limiting: 50 requests per second max
const requestDelay = 25; // ms between requests

let lastRequestTime = 0;

async function throttledFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < requestDelay) {
    await new Promise((resolve) =>
      setTimeout(resolve, requestDelay - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Convergent Demo (mailto:demo@convergent.ai)",
    },
  });

  if (!response.ok) {
    throw new Error(`OpenAlex API error: ${response.status}`);
  }

  return response;
}

/**
 * Search for authors by query string
 */
export async function searchAuthors(
  query: string,
  filters?: SearchFilters,
  page = 1,
  perPage = 20
): Promise<OpenAlexSearchResponse<OpenAlexAuthor>> {
  const params = new URLSearchParams({
    search: query,
    page: page.toString(),
    per_page: perPage.toString(),
    select: "id,display_name,orcid,works_count,cited_by_count,summary_stats,last_known_institutions,x_concepts,counts_by_year,works_api_url,updated_date",
  });

  // Add filters
  const filterParts: string[] = [];

  if (filters?.country) {
    filterParts.push(`last_known_institutions.country_code:${filters.country}`);
  }

  if (filters?.institution) {
    filterParts.push(`last_known_institutions.display_name:${filters.institution}`);
  }

  if (filters?.conceptId) {
    filterParts.push(`x_concepts.id:${filters.conceptId}`);
  }

  if (filters?.minHIndex) {
    filterParts.push(`summary_stats.h_index:>${filters.minHIndex}`);
  }

  if (filters?.minCitations) {
    filterParts.push(`cited_by_count:>${filters.minCitations}`);
  }

  if (filterParts.length > 0) {
    params.append("filter", filterParts.join(","));
  }

  const url = `${OPENALEX_API_URL}/authors?${params.toString()}`;
  const response = await throttledFetch(url);
  return response.json();
}

/**
 * Get a single author by ID
 */
export async function getAuthor(authorId: string): Promise<OpenAlexAuthor> {
  // Ensure the ID is properly formatted
  const id = authorId.startsWith("https://openalex.org/")
    ? authorId
    : `https://openalex.org/${authorId}`;

  const cleanId = id.replace("https://openalex.org/", "");
  const params = new URLSearchParams({
    select: "id,display_name,orcid,works_count,cited_by_count,summary_stats,last_known_institutions,x_concepts,counts_by_year,works_api_url,updated_date",
  });

  const url = `${OPENALEX_API_URL}/authors/${cleanId}?${params.toString()}`;
  const response = await throttledFetch(url);
  return response.json();
}

/**
 * Get works for an author
 */
export async function getAuthorWorks(
  authorId: string,
  page = 1,
  perPage = 10
): Promise<OpenAlexSearchResponse<OpenAlexWork>> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    sort: "cited_by_count:desc",
  });

  // Extract just the author ID (e.g., "A1234567890")
  const cleanId = authorId.replace("https://openalex.org/", "");

  const url = `${OPENALEX_API_URL}/works?filter=authorships.author.id:${cleanId}&${params.toString()}`;
  const response = await throttledFetch(url);
  return response.json();
}

/**
 * Autocomplete for institutions
 */
export async function searchInstitutionsAutocomplete(
  query: string
): Promise<Array<{ id: string; display_name: string; country_code: string }>> {
  const params = new URLSearchParams({
    search: query,
    per_page: "10",
  });

  const url = `${OPENALEX_API_URL}/institutions?${params.toString()}`;
  const response = await throttledFetch(url);
  const data = await response.json();

  return data.results.map((inst: any) => ({
    id: inst.id,
    display_name: inst.display_name,
    country_code: inst.country_code,
  }));
}

/**
 * Full institution search with filters and pagination
 */
export async function searchInstitutions(
  query: string,
  filters?: SearchFilters,
  page = 1,
  perPage = 20
): Promise<OpenAlexSearchResponse<ExtendedInstitution>> {
  const params = new URLSearchParams({
    search: query,
    page: page.toString(),
    per_page: perPage.toString(),
    select: "id,display_name,ror,country_code,type,homepage_url,image_url,works_count,cited_by_count,summary_stats,geo,x_concepts,updated_date",
  });

  // Add filters
  const filterParts: string[] = [];

  if (filters?.country) {
    filterParts.push(`country_code:${filters.country}`);
  }

  if (filters?.minCitations) {
    filterParts.push(`cited_by_count:>${filters.minCitations}`);
  }

  // Filter by institution type if needed
  if (filters?.institutionType) {
    filterParts.push(`type:${filters.institutionType}`);
  }
  
  if (filterParts.length > 0) {
    params.append("filter", filterParts.join(","));
  }

  const url = `${OPENALEX_API_URL}/institutions?${params.toString()}`;
  const response = await throttledFetch(url);
  return response.json();
}

/**
 * Get a single institution by ID
 */
export async function getInstitution(
  institutionId: string
): Promise<ExtendedInstitution> {
  // Ensure the ID is properly formatted
  const cleanId = institutionId.replace("https://openalex.org/", "");
  const params = new URLSearchParams({
    select: "id,display_name,ror,country_code,type,homepage_url,image_url,works_count,cited_by_count,summary_stats,geo,x_concepts,updated_date",
  });

  const url = `${OPENALEX_API_URL}/institutions/${cleanId}?${params.toString()}`;
  const response = await throttledFetch(url);
  return response.json();
}

/**
 * Get top concepts/topics by field
 */
export async function getTopConcepts(
  field?: string
): Promise<Array<{ id: string; display_name: string }>> {
  const params = new URLSearchParams({
    per_page: "20",
    sort: "works_count:desc",
  });

  if (field) {
    params.append("filter", `display_name.search:${field}`);
  }

  const url = `${OPENALEX_API_URL}/concepts?${params.toString()}`;
  const response = await throttledFetch(url);
  const data = await response.json();

  return data.results.map((concept: any) => ({
    id: concept.id,
    display_name: concept.display_name,
  }));
}

/**
 * Convert inverted abstract to readable text
 */
export function invertedIndexToText(
  invertedIndex: Record<string, number[]> | undefined
): string {
  if (!invertedIndex) return "";

  const words: Array<{ word: string; position: number }> = [];

  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const pos of positions) {
      words.push({ word, position: pos });
    }
  }

  words.sort((a, b) => a.position - b.position);
  return words.map((w) => w.word).join(" ");
}

/**
 * Calculate match score based on query and author data
 */
export function calculateMatchScore(
  author: OpenAlexAuthor,
  query: string
): number {
  let score = 50; // Base score

  // Boost by h-index (normalize to 0-25 points)
  const hIndexScore = Math.min(author.summary_stats.h_index / 2, 25);
  score += hIndexScore;

  // Boost by citation count (normalize to 0-15 points)
  const citationScore = Math.min(author.cited_by_count / 10000, 15);
  score += citationScore;

  // Boost by works count (normalize to 0-10 points)
  const worksScore = Math.min(author.works_count / 50, 10);
  score += worksScore;

  // Check for keyword matches in name or concepts
  const queryLower = query.toLowerCase();
  const nameMatch = author.display_name.toLowerCase().includes(queryLower);
  const conceptMatch = author.x_concepts.some((c) =>
    c.display_name.toLowerCase().includes(queryLower)
  );

  if (nameMatch) score += 10;
  if (conceptMatch) score += 5;

  // Normalize to 0-100
  return Math.min(Math.round(score), 100);
}

