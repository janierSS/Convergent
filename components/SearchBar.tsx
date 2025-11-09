"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, UserGroupIcon, BuildingLibraryIcon, DocumentTextIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { SearchCategory } from "@/types";
import { Tab, TabGroup, TabList } from "@/components/Tabs";
import { useDemoRole } from "@/contexts/DemoRoleContext";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, category?: SearchCategory) => void;
  initialValue?: string;
  initialCategory?: SearchCategory;
  size?: "small" | "large";
  showCategorySelector?: boolean;
  tabVariant?: "default" | "hero";
}

export default function SearchBar({
  placeholder = "Search by expertise, research area, or keywords...",
  onSearch,
  initialValue = "",
  initialCategory = "proposals",
  size = "large",
  showCategorySelector = true,
  tabVariant = "default",
}: SearchBarProps) {
  const { role } = useDemoRole();
  const [query, setQuery] = useState(initialValue);
  const [category, setCategory] = useState<SearchCategory>(initialCategory);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define categories based on role
  const categories: SearchCategory[] = 
    role === "company" 
      ? ["authors", "institutions", "proposals"] 
      : role === "faculty"
      ? ["proposals"]
      : ["authors", "institutions", "proposals"]; // admin sees all

  // Sync selected index with category and handle role changes
  useEffect(() => {
    const index = categories.indexOf(category);
    if (index !== -1) {
      setSelectedIndex(index);
    } else {
      // If current category is not available in new role, switch to first category
      const newCategory = categories[0];
      setCategory(newCategory);
      setSelectedIndex(0);
      if (query.trim()) {
        onSearch(query.trim(), newCategory);
      }
    }
  }, [category, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For proposals, allow search even with empty query
    // For other categories, require non-empty query
    if (query.trim() || category === "proposals") {
      onSearch(query.trim(), category);
    }
  };

  const handleCategoryChange = (index: number) => {
    const newCategory = categories[index];
    setCategory(newCategory);
    setSelectedIndex(index);
    // For proposals, trigger search even with empty query
    // For other categories, only search if query exists
    if (query.trim() || newCategory === "proposals") {
      onSearch(query.trim(), newCategory);
    }
  };

  return (
    <motion.div
      className={`w-full ${size === "large" ? "max-w-3xl" : "max-w-xl"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Selector */}
      {showCategorySelector && (
        <div className="mb-3 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto scrollbar-hide">
          <TabGroup selectedIndex={selectedIndex} onChange={handleCategoryChange}>
            <TabList className="flex gap-2 justify-center sm:justify-center min-w-max sm:min-w-0">
              {role === "faculty" ? (
                <Tab index={0} variant={tabVariant}>
                  <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden xs:inline">All Proposals</span>
                  <span className="xs:hidden">Proposals</span>
                </Tab>
              ) : (
                <>
                  <Tab index={0} variant={tabVariant}>
                    <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    Authors
                  </Tab>
                  <Tab index={1} variant={tabVariant}>
                    <BuildingLibraryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="hidden xs:inline">Institutions</span>
                    <span className="xs:hidden">Orgs</span>
                  </Tab>
                  <Tab index={2} variant={tabVariant}>
                    <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="hidden xs:inline">{role === "company" ? "My Proposals" : "All Proposals"}</span>
                    <span className="xs:hidden">Proposals</span>
                  </Tab>
                </>
              )}
            </TabList>
          </TabGroup>
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              category === "authors"
                ? "Search by name, expertise, or research area..."
                : category === "institutions"
                ? "Search by name, location, or industry..."
                : role === "company"
                ? "Search my proposals..."
                : "Search by title, company, or keywords..."
            }
            className={`
              w-full bg-white border-2 border-gray-200 rounded-full
              ${
                size === "large"
                  ? "px-4 py-2 text-base sm:text-lg md:text-xl"
                  : "px-3 py-2 text-base sm:text-lg"
              }
              pl-12 sm:pl-14 md:pl-16 pr-24 sm:pr-32 md:pr-36
              focus:outline-none focus:border-chime-mint focus:ring-4 focus:ring-chime-light-mint
              transition-all duration-300 shadow-lg hover:shadow-xl font-normal
            `}
          />
          <MagnifyingGlassIcon className={`absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 ${size === "large" ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" : "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"} text-gray-400`} />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-chime-mint-light text-white hover:bg-chime-teal active:shadow-button-active ${size === "large" ? "px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg" : "px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base"} rounded-full font-semibold transition-all`}
            >
              Search
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

