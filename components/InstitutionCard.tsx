"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExtendedInstitution } from "@/types";
import {
  BuildingLibraryIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

interface InstitutionCardProps {
  institution: ExtendedInstitution;
  index?: number;
}

export default function InstitutionCard({
  institution,
  index = 0,
}: InstitutionCardProps) {
  const citations = institution.cited_by_count || 0;
  const worksCount = institution.works_count || 0;
  const type = institution.type || "education";
  const country = institution.country_code || "";
  const hIndex = institution.summary_stats?.h_index || 0;
  const geo = institution.geo;

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

  // Get type display name and color
  const getTypeInfo = (type: string) => {
    const typeMap: Record<string, { label: string; color: string }> = {
      education: { label: "University", color: "bg-blue-100 text-blue-800" },
      healthcare: { label: "Healthcare", color: "bg-green-100 text-green-800" },
      company: { label: "Company", color: "bg-purple-100 text-purple-800" },
      archive: { label: "Archive", color: "bg-yellow-100 text-yellow-800" },
      nonprofit: { label: "Nonprofit", color: "bg-pink-100 text-pink-800" },
      government: { label: "Government", color: "bg-red-100 text-red-800" },
      facility: { label: "Facility", color: "bg-indigo-100 text-indigo-800" },
      other: { label: "Other", color: "bg-gray-100 text-gray-800" },
    };
    return typeMap[type] || typeMap.other;
  };

  const typeInfo = getTypeInfo(type);

  // Extract clean ID from OpenAlex URL
  const institutionId = institution.id.replace("https://openalex.org/", "");

  // Get top 3 unique concepts/research areas (no duplicates)
  const topConcepts = institution.x_concepts
    ?.sort((a, b) => b.score - a.score)
    .filter((concept, index, self) => 
      index === self.findIndex((c) => c.display_name === concept.display_name)
    )
    .slice(0, 3) || [];

  // Format location string
  const getLocationString = () => {
    if (!geo) return country;
    const parts = [];
    if (geo.city) parts.push(geo.city);
    if (geo.region && geo.city !== geo.region) parts.push(geo.region);
    if (geo.country) parts.push(geo.country);
    return parts.length > 0 ? parts.join(", ") : country;
  };

  const locationString = getLocationString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col cursor-pointer">
        {/* Type Badge */}
        <div className="flex justify-between items-start mb-3">
          <span
            className={`inline-flex items-center gap-1 px-4 py-2 text-base font-semibold rounded-full ${typeInfo.color}`}
          >
            <BuildingLibraryIcon className="w-5 h-5" />
            {typeInfo.label}
          </span>
        </div>

        {/* Institution Name */}
        <h3 className="text-2xl font-bold text-chime-text mb-3 hover:text-chime-teal transition-colors line-clamp-2">
          {institution.display_name}
        </h3>

        {/* Location */}
        {locationString && (
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPinIcon className="w-6 h-6 text-chime-mint" />
            <span className="text-base font-medium">{locationString}</span>
          </div>
        )}

        {/* Website */}
        {institution.homepage_url && (
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <GlobeAltIcon className="w-6 h-6 text-chime-mint" />
            <span className="text-base font-medium">
              <a
                href={institution.homepage_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-chime-teal transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website
              </a>
            </span>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-gray-100">
          {hIndex > 0 && (
            <div className="text-center min-w-0">
              <div className="text-2xl font-bold text-chime-teal break-words">{hIndex}</div>
              <div className="text-base text-gray-500 font-medium">h-index</div>
            </div>
          )}
          <div className="text-center min-w-0">
            <div className="text-2xl font-bold text-chime-teal break-words">
              {formatNumber(worksCount)}
            </div>
            <div className="text-base text-gray-500 font-medium flex items-center justify-center gap-1">
              <DocumentTextIcon className="w-4 h-4" />
              Works
            </div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-2xl font-bold text-chime-teal break-words">
              {formatNumber(citations)}
            </div>
            <div className="text-base text-gray-500 font-medium flex items-center justify-center gap-1">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              Citations
            </div>
          </div>
        </div>

        {/* Top Research Areas */}
        {topConcepts.length > 0 && (
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <BeakerIcon className="w-5 h-5 text-chime-mint" />
              <span className="text-base text-gray-500 font-semibold">
                Top Research Areas
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

        {/* ROR Badge */}
        {institution.ror && (
          <div className="mt-3 text-center">
            <span className="text-base text-gray-400">
              ROR: {institution.ror.replace("https://ror.org/", "")}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

