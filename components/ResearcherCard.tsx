"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ResearcherProfile } from "@/types";
import {
  AcademicCapIcon,
  BeakerIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import GitHubStarsWheel from "./GitHubStarsWheel";

interface ResearcherCardProps {
  researcher: ResearcherProfile;
  index?: number;
  disableLink?: boolean;
}

export default function ResearcherCard({
  researcher,
  index = 0,
  disableLink = false,
}: ResearcherCardProps) {
  const lastInst = researcher.last_known_institutions?.[0];
  const institution = lastInst?.display_name || "Unknown Institution";
  const country = lastInst?.country_code || "";
  const hIndex = researcher.summary_stats?.h_index || 0;
  const citations = researcher.cited_by_count || 0;
  const worksCount = researcher.works_count || 0;
  const matchScore = researcher.matchScore;

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      const millions = num / 1000000;
      return millions >= 100 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
    }
    if (num >= 1000) {
      const thousands = num / 1000;
      return thousands >= 100 ? `${Math.round(thousands)}k` : `${thousands.toFixed(1)}k`;
    }
    return num.toString();
  };

  // Get top 3 unique concepts (no duplicates)
  const topConcepts = researcher.x_concepts
    ?.sort((a, b) => b.score - a.score)
    .filter((concept, index, self) => 
      index === self.findIndex((c) => c.display_name === concept.display_name)
    )
    .slice(0, 3) || [];

  // Extract clean ID from OpenAlex URL
  const researcherId = researcher.id.replace("https://openalex.org/", "");

  const cardContent = (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col relative overflow-hidden">
          {/* Match Score Corner Badge */}
          {matchScore && (
            <div className="absolute -top-1 -right-1 z-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-chime-light-mint text-chime-deep-teal text-base font-bold rounded-bl-2xl rounded-tr-2xl">
                <StarIcon className="w-5 h-5" />
                <div className="flex items-center gap-1">
                  <GitHubStarsWheel
                    value={matchScore}
                    delay={index * 100}
                    direction="btt"
                    step={150}
                    itemsSize={24}
                    sideItemsCount={2}
                    inView={true}
                    inViewOnce={true}
                    className="text-chime-deep-teal"
                  />
                  <span>% Match</span>
                </div>
              </div>
            </div>
          )}

          {/* Researcher Name */}
          <h3 className="text-2xl font-bold text-chime-text mb-2 hover:text-chime-teal transition-colors">
            {researcher.display_name}
          </h3>

          {/* Institution */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <AcademicCapIcon className="w-6 h-6 text-chime-mint" />
            <span className="text-base font-medium">
              {institution}
              {country && ` (${country})`}
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
            <div className="text-center min-w-0">
              <div className="text-2xl font-bold text-chime-teal break-words">{formatNumber(hIndex)}</div>
              <div className="text-base text-gray-500 font-medium">h-index</div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-2xl font-bold text-chime-teal break-words">
                {formatNumber(citations)}
              </div>
              <div className="text-base text-gray-500 font-medium">Citations</div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-2xl font-bold text-chime-teal break-words">{formatNumber(worksCount)}</div>
              <div className="text-base text-gray-500 font-medium">Works</div>
            </div>
          </div>

          {/* Top Concepts */}
          {topConcepts.length > 0 && (
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <BeakerIcon className="w-5 h-5 text-chime-mint" />
                <span className="text-base text-gray-500 font-semibold">
                  Research Areas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topConcepts.map((concept) => (
                  <span
                    key={concept.id}
                    className="px-4 py-2 bg-chime-light-mint text-chime-deep-teal text-base rounded-full font-bold"
                  >
                    {concept.display_name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative"
    >
      {disableLink ? (
        cardContent
      ) : (
        <Link href={`/researcher/${researcherId}`}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}

