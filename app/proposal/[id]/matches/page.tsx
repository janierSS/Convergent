"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import ResearcherCard from "@/components/ResearcherCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import TypewriterText from "@/components/TypewriterText";
import { ResearcherProfile } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, XMarkIcon, EnvelopeIcon, AcademicCapIcon, BeakerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface MatchedResearcher extends ResearcherProfile {
  matchScore: number;
  matchReasons: string[];
}

interface ProposalInfo {
  id: string;
  title: string;
  company: {
    name: string;
    industry: string;
  };
  matchingCriteria: {
    minHIndex?: number;
    minCitations?: number;
    requiredExpertise: string[];
  };
}

export default function ProposalMatchesPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params.id as string;
  
  const [researchers, setResearchers] = useState<MatchedResearcher[]>([]);
  const [proposal, setProposal] = useState<ProposalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedResearcher, setSelectedResearcher] = useState<MatchedResearcher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMatchReasons, setShowMatchReasons] = useState(false);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const perPage = 20;

  useEffect(() => {
    fetchMatches(currentPage);
  }, [proposalId, currentPage]);

  const fetchMatches = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const response = await fetch(`/api/proposals/${proposalId}/matches?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }

      const data = await response.json();
      setResearchers(data.results);
      setProposal(data.proposal);
      setTotalCount(data.meta.count);
    } catch (err) {
      setError("Failed to load matching researchers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  const handleResearcherClick = (researcher: MatchedResearcher, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedResearcher(researcher);
    setIsModalOpen(true);
    setShowMatchReasons(false);
    setCurrentReasonIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowMatchReasons(false);
    setCurrentReasonIndex(0);
    setTimeout(() => setSelectedResearcher(null), 300);
  };

  const handleIntroComplete = () => {
    setShowMatchReasons(true);
  };

  const handleReasonComplete = () => {
    if (selectedResearcher && currentReasonIndex < selectedResearcher.matchReasons.length - 1) {
      setCurrentReasonIndex(currentReasonIndex + 1);
    }
  };

  const handleGetInTouch = () => {
    if (selectedResearcher && proposal) {
      const subject = encodeURIComponent(`Research Collaboration: ${proposal.title}`);
      const body = encodeURIComponent(
        `Dear ${selectedResearcher.display_name},\n\nI am reaching out from ${proposal.company.name} regarding our research proposal "${proposal.title}".\n\nBased on your expertise and research background, we believe you would be an excellent match for this collaboration opportunity.\n\nI would love to discuss this further with you.\n\nBest regards`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="min-h-screen bg-chime-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <Navigation />
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/search?q=&category=proposals"
          className="inline-flex items-center gap-2 text-chime-mint-light hover:text-chime-teal transition-colors mb-6 text-lg font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Proposals
        </Link>

        {/* Proposal Info */}
        {!loading && proposal && (
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-chime-text mb-2">
                Finding Matches for: {proposal.title}
              </h1>
              <p className="text-lg text-gray-600">
                {proposal.company.name} • {proposal.company.industry}
              </p>
            </div>

            {/* Matching Criteria */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Matching Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {proposal.matchingCriteria.minHIndex && (
                  <div className="bg-chime-mint-light/10 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Min H-Index</p>
                    <p className="text-xl font-bold text-chime-deep-teal">
                      {proposal.matchingCriteria.minHIndex}
                    </p>
                  </div>
                )}
                {proposal.matchingCriteria.minCitations && (
                  <div className="bg-chime-mint-light/10 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Min Citations</p>
                    <p className="text-xl font-bold text-chime-deep-teal">
                      {proposal.matchingCriteria.minCitations.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="bg-chime-mint-light/10 p-3 rounded-lg md:col-span-full">
                  <p className="text-sm text-gray-600 font-medium mb-2">Required Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {proposal.matchingCriteria.requiredExpertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-chime-light-mint text-chime-deep-teal text-sm rounded-full font-semibold"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
              matching researchers
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
        {!loading && !error && researchers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 text-2xl mb-4 font-medium">
              No matching researchers found.
            </p>
            <p className="text-gray-500 text-lg">Try adjusting your matching criteria.</p>
          </motion.div>
        )}

        {/* Results Grid */}
        {!loading && !error && researchers.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {researchers.map((researcher, index) => (
                <div 
                  key={researcher.id}
                  onClick={(e) => handleResearcherClick(researcher, e)}
                  className="cursor-pointer"
                >
                  <ResearcherCard researcher={researcher} index={index} disableLink={true} />
                  {/* Match Reasons */}
                  {researcher.matchReasons.length > 0 && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs font-semibold text-green-800 mb-1">Match Reasons:</p>
                      <ul className="text-xs text-green-700 space-y-1">
                        {researcher.matchReasons.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedResearcher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-chime-text">
                      {selectedResearcher.display_name}
                    </h2>
                    <div className="px-4 py-2 bg-gradient-to-br from-chime-mint-light to-chime-teal text-white rounded-full">
                      <span className="text-lg font-bold">{selectedResearcher.matchScore}%</span>
                      <span className="text-sm ml-1">Match</span>
                    </div>
                  </div>
                  
                  {/* Institution */}
                  {selectedResearcher.last_known_institutions?.[0] && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <AcademicCapIcon className="w-6 h-6 text-chime-mint" />
                      <span className="text-lg font-medium">
                        {selectedResearcher.last_known_institutions[0].display_name}
                        {selectedResearcher.last_known_institutions[0].country_code && 
                          ` (${selectedResearcher.last_known_institutions[0].country_code})`
                        }
                      </span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-chime-teal">
                        {selectedResearcher.summary_stats.h_index}
                      </div>
                      <div className="text-sm text-gray-600">H-Index</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-chime-teal">
                        {selectedResearcher.cited_by_count.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-chime-teal">
                        {selectedResearcher.works_count}
                      </div>
                      <div className="text-sm text-gray-600">Works</div>
                    </div>
                  </div>
                </div>

                {/* Why This is a Good Match */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BeakerIcon className="w-6 h-6 text-chime-mint" />
                    Why This is a Good Match
                  </h3>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-xl text-gray-700 mb-3">
                      <TypewriterText
                        text={`${selectedResearcher.display_name} is an excellent match for your proposal based on the following criteria:`}
                        speed={20}
                        onComplete={handleIntroComplete}
                      />
                    </p>
                    
                    {showMatchReasons && selectedResearcher.matchReasons.length > 0 && (
                      <ul className="space-y-3">
                        {selectedResearcher.matchReasons.map((reason, idx) => (
                          idx <= currentReasonIndex && (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2 text-xl text-gray-700"
                            >
                              <span className="text-green-600 font-bold text-xl">✓</span>
                              <span>
                                <TypewriterText
                                  text={reason}
                                  speed={15}
                                  delay={100}
                                  onComplete={idx === currentReasonIndex ? handleReasonComplete : undefined}
                                />
                              </span>
                            </motion.li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Research Areas */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Research Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResearcher.x_concepts.slice(0, 5).map((concept) => (
                        <span
                          key={concept.id}
                          className="px-3 py-2 bg-chime-light-mint text-chime-deep-teal text-sm rounded-full font-semibold"
                        >
                          {concept.display_name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proposal Context */}
                {proposal && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Proposal:</p>
                    <p className="text-base text-blue-800 font-medium">{proposal.title}</p>
                    <p className="text-sm text-blue-700 mt-1">{proposal.company.name}</p>
                  </div>
                )}

                {/* Get in Touch Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleGetInTouch}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-chime-mint-light hover:bg-chime-teal text-white rounded-lg text-lg font-semibold hover:shadow-button-active transition-all"
                  >
                    <EnvelopeIcon className="w-6 h-6" />
                    Get in Touch
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-lg font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

