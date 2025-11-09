"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navigation from "@/components/Navigation";
import { ResearcherProfile, OpenAlexWork } from "@/types";
import {
  AcademicCapIcon,
  BeakerIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function ResearcherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [researcher, setResearcher] = useState<ResearcherProfile | null>(null);
  const [works, setWorks] = useState<OpenAlexWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params.id as string;

  useEffect(() => {
    if (id) {
      fetchResearcher(id);
    }
  }, [id]);

  const fetchResearcher = async (researcherId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/researcher/${researcherId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch researcher");
      }

      const data = await response.json();
      setResearcher(data);
      setWorks(data.recentWorks || []);
    } catch (err) {
      setError("Failed to load researcher details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chime-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !researcher) {
    return (
      <div className="min-h-screen bg-chime-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link
            href="/"
            className="text-chime-teal hover:underline font-semibold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const institution = researcher.last_known_institutions?.[0];
  const stats = researcher.summary_stats;

  return (
    <div className="min-h-screen bg-chime-background">
      <Navigation />
      
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-chime-teal transition-colors font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Results
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-chime rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {researcher.display_name.charAt(0)}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow">
              <h1 className="text-4xl font-bold text-chime-text mb-3">
                {researcher.display_name}
              </h1>

              {institution && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-chime-mint" />
                  <span className="text-lg">
                    {institution.display_name}
                    {institution.country_code && ` (${institution.country_code})`}
                  </span>
                </div>
              )}

              {researcher.orcid && (
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <span className="text-sm">ORCID: {researcher.orcid}</span>
                  <a
                    href={`https://orcid.org/${researcher.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chime-teal hover:underline"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 inline" />
                  </a>
                </div>
              )}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-chime-mint-light text-white font-semibold rounded-full hover:bg-chime-teal active:shadow-button-active transition-all"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Connect with Researcher
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-chime-teal mb-2">
              {stats?.h_index || 0}
            </div>
            <div className="text-gray-600 font-semibold">h-index</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-chime-teal mb-2">
              {researcher.cited_by_count >= 1000
                ? `${(researcher.cited_by_count / 1000).toFixed(1)}k`
                : researcher.cited_by_count}
            </div>
            <div className="text-gray-600 font-semibold">Total Citations</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-chime-teal mb-2">
              {researcher.works_count}
            </div>
            <div className="text-gray-600 font-semibold">Publications</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-chime-teal mb-2">
              {stats?.i10_index || 0}
            </div>
            <div className="text-gray-600 font-semibold">i10-index</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Research Areas */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <BeakerIcon className="w-7 h-7 text-chime-mint" />
                <h2 className="text-2xl font-bold text-chime-text">
                  Research Areas
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {researcher.topConcepts?.slice(0, 15).map((concept) => (
                  <span
                    key={concept.id}
                    className="px-4 py-2 bg-chime-light-mint text-chime-deep-teal rounded-full font-medium"
                  >
                    {concept.display_name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Recent Publications */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <DocumentTextIcon className="w-7 h-7 text-chime-mint" />
                <h2 className="text-2xl font-bold text-chime-text">
                  Top Publications
                </h2>
              </div>

              <div className="space-y-6">
                {works.slice(0, 10).map((work, index) => (
                  <motion.div
                    key={work.id}
                    className="pb-6 border-b border-gray-100 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    <h3 className="text-lg font-semibold text-chime-text mb-2 hover:text-chime-teal transition-colors">
                      {work.doi ? (
                        <a
                          href={`https://doi.org/${work.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {work.display_name}
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 inline ml-1" />
                        </a>
                      ) : (
                        work.display_name
                      )}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>{work.publication_year}</span>
                      {work.host_venue?.display_name && (
                        <>
                          <span>•</span>
                          <span className="italic">
                            {work.host_venue.display_name}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span className="font-semibold text-chime-teal">
                        {work.cited_by_count} citations
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity by Year */}
            {researcher.counts_by_year && researcher.counts_by_year.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-chime-text mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {researcher.counts_by_year.slice(0, 5).map((year) => (
                    <div key={year.year} className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">{year.year}</span>
                      <div className="text-right">
                        <div className="text-sm text-chime-teal font-semibold">
                          {year.works_count} works
                        </div>
                        <div className="text-xs text-gray-500">
                          {year.cited_by_count} citations
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Stats */}
            <motion.div
              className="bg-gradient-chime rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">Impact Metrics</h3>
              <div className="space-y-3">
                {stats?.["2yr_mean_citedness"] && (
                  <div>
                    <div className="text-2xl font-bold">
                      {stats["2yr_mean_citedness"].toFixed(1)}
                    </div>
                    <div className="text-sm text-white/80">
                      2-year mean citedness
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

