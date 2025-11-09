"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { SearchFilters, SearchCategory } from "@/types";

interface FilterPanelProps {
  onFilterChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
  category?: SearchCategory;
}

export default function FilterPanel({
  onFilterChange,
  initialFilters = {},
  category = "authors",
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const countries = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "AU", name: "Australia" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "IN", name: "India" },
    { code: "NL", name: "Netherlands" },
  ];

  const institutionTypes = [
    { value: "education", label: "University/Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "company", label: "Company" },
    { value: "archive", label: "Archive/Repository" },
    { value: "nonprofit", label: "Nonprofit" },
    { value: "government", label: "Government" },
    { value: "facility", label: "Facility" },
    { value: "other", label: "Other" },
  ];

  const handleFilterUpdate = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-chime-mint transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FunnelIcon className="w-6 h-6 text-gray-600" />
        <span className="font-semibold text-gray-700 text-lg">Filters</span>
        {activeFilterCount > 0 && (
          <span className="bg-chime-mint text-white text-base font-bold px-3 py-1 rounded-full">
            {activeFilterCount}
          </span>
        )}
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-chime-text">
                  Filter {category === "authors" ? "Authors" : "Institutions"}
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-base text-chime-mint-light hover:text-chime-teal active:underline font-semibold transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Country Filter */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={filters.country || ""}
                    onChange={(e) => handleFilterUpdate("country", e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-chime-mint transition-all"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Institution Filter - Only for authors */}
                {category === "authors" && (
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={filters.institution || ""}
                      onChange={(e) =>
                        handleFilterUpdate("institution", e.target.value)
                      }
                      placeholder="e.g., MIT, Stanford"
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-chime-mint transition-all"
                    />
                  </div>
                )}

                {/* Institution Type Filter - Only for institutions */}
                {category === "institutions" && (
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={filters.institutionType || ""}
                      onChange={(e) =>
                        handleFilterUpdate("institutionType", e.target.value)
                      }
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-chime-mint transition-all"
                    >
                      <option value="">All Types</option>
                      {institutionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Min H-Index Filter */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Min H-Index
                  </label>
                  <input
                    type="number"
                    value={filters.minHIndex || ""}
                    onChange={(e) =>
                      handleFilterUpdate(
                        "minHIndex",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    placeholder="e.g., 20"
                    min="0"
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-chime-mint transition-all"
                  />
                </div>

                {/* Min Citations Filter */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Min Citations
                  </label>
                  <input
                    type="number"
                    value={filters.minCitations || ""}
                    onChange={(e) =>
                      handleFilterUpdate(
                        "minCitations",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    placeholder="e.g., 1000"
                    min="0"
                    step="100"
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-chime-mint transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

