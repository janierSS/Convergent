"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import { SearchCategory } from "@/types";

export default function Hero() {
  const router = useRouter();

  const handleSearch = (query: string, category?: SearchCategory) => {
    const cat = category || "proposals";
    router.push(`/search?q=${encodeURIComponent(query)}&category=${cat}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-chime py-20 md:py-32">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
              Convergent
            </h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find Your Research Partner
            <br />
            <span className="text-chime-light-mint">in Minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-normal">
            Connect your tech company with leading researchers and top institutions for
            high-impact R&D collaborations
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SearchBar onSearch={handleSearch} size="large" tabVariant="hero" />
        </motion.div>

        {/* Quick Search Suggestions */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-white/80 text-sm sm:text-base font-medium w-full sm:w-auto text-center sm:text-left mb-1 sm:mb-0">Try:</span>
          {["AI & Machine Learning", "Biotech", "Quantum Computing", "Robotics"].map(
            (term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 active:shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)] text-white text-sm sm:text-base font-medium rounded-full transition-all backdrop-blur-sm"
              >
                {term}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

