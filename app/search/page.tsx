"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ResearcherCard from "@/components/ResearcherCard";
import InstitutionCard from "@/components/InstitutionCard";
import ProposalCard from "@/components/ProposalCard";
import FilterPanel from "@/components/FilterPanel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ResearcherProfile, SearchFilters, SearchCategory, ExtendedInstitution, Proposal } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { useDemoRole } from "@/contexts/DemoRoleContext";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { role } = useDemoRole();
  const [researchers, setResearchers] = useState<ResearcherProfile[]>([]);
  const [institutions, setInstitutions] = useState<ExtendedInstitution[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [category, setCategory] = useState<SearchCategory>("proposals");

  const query = searchParams.get("q") || "";
  const categoryParam = (searchParams.get("category") || "proposals") as SearchCategory;
  const perPage = 20;

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    // For proposals, always fetch (even with empty query)
    // For other categories, only fetch when query exists
    if (query || category === "proposals") {
      fetchResults(query, category, filters, currentPage);
    }
  }, [query, category, filters, currentPage, role]);

  const fetchResults = async (
    searchQuery: string,
    searchCategory: SearchCategory,
    searchFilters: SearchFilters,
    page: number
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (searchCategory === "proposals") {
        // Fetch proposals from the proposals API
        const params = new URLSearchParams({
          query: searchQuery,
          page: page.toString(),
          per_page: perPage.toString(),
          role: role, // Pass the current demo role
        });

        const response = await fetch(`/api/proposals?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }

        const data = await response.json();
        setProposals(data.proposals);
        setResearchers([]);
        setInstitutions([]);
        setTotalCount(data.meta.total);
      } else {
        // Fetch authors or institutions from the search API
        const params = new URLSearchParams({
          q: searchQuery,
          category: searchCategory,
          page: page.toString(),
          per_page: perPage.toString(),
        });

        // Add filters to params
        if (searchFilters.country) params.append("country", searchFilters.country);
        if (searchFilters.institution)
          params.append("institution", searchFilters.institution);
        if (searchFilters.minHIndex)
          params.append("min_h_index", searchFilters.minHIndex.toString());
        if (searchFilters.minCitations)
          params.append("min_citations", searchFilters.minCitations.toString());

        const response = await fetch(`/api/search?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${searchCategory}`);
        }

        const data = await response.json();
        
        if (searchCategory === "authors") {
          // Remove duplicates based on author ID
          const uniqueAuthors = data.results.filter(
            (researcher: ResearcherProfile, index: number, self: ResearcherProfile[]) =>
              index === self.findIndex((r) => r.id === researcher.id)
          );
          setResearchers(uniqueAuthors);
          setInstitutions([]);
          setProposals([]);
        } else {
          // Remove duplicates based on institution ID
          const uniqueInstitutions = data.results.filter(
            (institution: ExtendedInstitution, index: number, self: ExtendedInstitution[]) =>
              index === self.findIndex((i) => i.id === institution.id)
          );
          setInstitutions(uniqueInstitutions);
          setResearchers([]);
          setProposals([]);
        }
        
        setTotalCount(data.meta.count);
      }
    } catch (err) {
      setError(`Failed to load ${searchCategory}. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string, newCategory?: SearchCategory) => {
    setCurrentPage(1);
    const categoryToUse = newCategory || category;
    // For proposals with empty query, don't include q parameter
    if (!newQuery && categoryToUse === "proposals") {
      router.push(`/search?category=${categoryToUse}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(newQuery)}&category=${categoryToUse}`);
    }
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="min-h-screen bg-chime-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <Navigation />
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              initialValue={query}
              initialCategory={category}
              size="small"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Role-based Info Banner for Proposals */}
        {category === "proposals" && (
          <motion.div
            className={`mb-6 p-4 rounded-lg border-2 ${
              role === "company"
                ? "bg-blue-50 border-blue-200"
                : role === "faculty"
                ? "bg-purple-50 border-purple-200"
                : "bg-green-50 border-green-200"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className={`text-base font-semibold ${
              role === "company" 
                ? "text-blue-800" 
                : role === "faculty"
                ? "text-purple-800"
                : "text-green-800"
            }`}>
              {role === "company" 
                ? "📋 Viewing: Your Company's Proposals (BioTech Innovations Inc.)"
                : role === "faculty"
                ? "🎓 Viewing: All Available Research Proposals from Companies"
                : "👤 Viewing: All Research Proposals (Admin View)"}
            </p>
          </motion.div>
        )}

        {/* Filters - Only show for authors and institutions */}
        {category !== "proposals" && (
          <div className="mb-6">
            <FilterPanel
              onFilterChange={handleFilterChange}
              initialFilters={filters}
              category={category}
            />
          </div>
        )}

        {/* Results Header */}
        {!loading && !error && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 text-lg">
              Found{" "}
              <span className="font-bold text-chime-teal text-xl">
                {totalCount.toLocaleString()}
              </span>{" "}
              {category}{query ? ` for "${query}"` : ""}
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-xl">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && researchers.length === 0 && institutions.length === 0 && proposals.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 text-2xl mb-4 font-medium">
              No {category} found{query ? " for your search" : ""}.
            </p>
            <p className="text-gray-500 text-lg">
              {query 
                ? "Try adjusting your filters or search terms." 
                : category === "proposals" && role === "company"
                ? "You don't have any proposals yet."
                : "No proposals are currently available."}
            </p>
          </motion.div>
        )}

        {/* Results Grid - Authors */}
        {!loading && !error && category === "authors" && researchers.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {researchers.map((researcher, index) => (
                <ResearcherCard
                  key={researcher.id}
                  researcher={researcher}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                  Previous
                </button>

                <span className="text-gray-600 text-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  Next
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Results Grid - Institutions */}
        {!loading && !error && category === "institutions" && institutions.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {institutions.map((institution, index) => (
                <InstitutionCard
                  key={institution.id}
                  institution={institution}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                  Previous
                </button>

                <span className="text-gray-600 text-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  Next
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Results Grid - Proposals */}
        {!loading && !error && category === "proposals" && proposals.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {proposals.map((proposal, index) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                  Previous
                </button>

                <span className="text-gray-600 text-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 active:shadow-button-active-gray transition-all font-medium"
                >
                  Next
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchPageContent />
    </Suspense>
  );
}

