// OpenAlex API Types
export interface OpenAlexAuthor {
  id: string;
  orcid?: string;
  display_name: string;
  display_name_alternatives?: string[];
  works_count: number;
  cited_by_count: number;
  summary_stats: {
    h_index: number;
    i10_index: number;
    "2yr_mean_citedness": number;
  };
  last_known_institutions?: Array<{
    id: string;
    ror: string;
    display_name: string;
    country_code: string;
    type: string;
  }>;
  x_concepts: Concept[];
  counts_by_year?: Array<{
    year: number;
    works_count: number;
    cited_by_count: number;
  }>;
  works_api_url: string;
  updated_date: string;
}

export interface Concept {
  id: string;
  wikidata?: string;
  display_name: string;
  level: number;
  score: number;
}

export interface OpenAlexWork {
  id: string;
  doi?: string;
  title: string;
  display_name: string;
  publication_year: number;
  publication_date: string;
  type: string;
  cited_by_count: number;
  is_retracted: boolean;
  is_paratext: boolean;
  abstract_inverted_index?: Record<string, number[]>;
  authorships: Array<{
    author_position: string;
    author: {
      id: string;
      display_name: string;
      orcid?: string;
    };
    institutions: Array<{
      id: string;
      display_name: string;
      ror: string;
      country_code: string;
      type: string;
    }>;
  }>;
  concepts: Concept[];
  biblio?: {
    volume?: string;
    issue?: string;
    first_page?: string;
    last_page?: string;
  };
  host_venue?: {
    id: string;
    display_name: string;
    type: string;
  };
  open_access?: {
    is_oa: boolean;
    oa_status: string;
    oa_url?: string;
  };
}

export interface OpenAlexInstitution {
  id: string;
  ror?: string;
  display_name: string;
  country_code: string;
  type: string;
  homepage_url?: string;
  image_url?: string;
  works_count: number;
  cited_by_count: number;
}

export interface OpenAlexSearchResponse<T> {
  results: T[];
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
  };
  group_by?: Array<{
    key: string;
    key_display_name: string;
    count: number;
  }>;
}

// UI Types
export interface ResearcherProfile extends OpenAlexAuthor {
  recentWorks?: OpenAlexWork[];
  topConcepts?: Concept[];
  matchScore?: number;
}

export interface SearchFilters {
  query?: string;
  institution?: string;
  country?: string;
  conceptId?: string;
  minHIndex?: number;
  minCitations?: number;
  institutionType?: string;
}

export type SearchCategory = "authors" | "institutions" | "proposals";

// Proposal Types
export interface Proposal {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    industry: string;
  };
  description: string;
  researchArea: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
  postedDate: string;
  status: "open" | "in-review" | "closed";
  matchingCriteria: {
    minHIndex?: number;
    minCitations?: number;
    requiredExpertise: string[];
    preferredInstitutions?: string[];
  };
  contactEmail: string;
}

export interface ExtendedInstitution extends OpenAlexInstitution {
  summary_stats?: {
    h_index: number;
    i10_index: number;
    "2yr_mean_citedness": number;
  };
  geo?: {
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  x_concepts?: Concept[];
}

export interface MatchResult {
  researcher: ResearcherProfile;
  score: number;
  matchReasons: string[];
}

// Demo Role Types
export type UserRole = "company" | "faculty" | "admin";

