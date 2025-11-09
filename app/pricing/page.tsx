"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-chime-background">
      <Navigation />

      <main className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-chime-text mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Pay only for what you use. Connect with the right researchers efficiently.
          </p>
        </motion.div>

        {/* Pricing Table Card */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Title with checkmark */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-chime-text">
                  Refined Credit Usage (Realistic Breakdown)
                </h2>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 text-xl md:text-2xl font-bold text-chime-text">
                        Action
                      </th>
                      <th className="text-left py-4 px-4 text-xl md:text-2xl font-bold text-chime-text">
                        Credit Cost
                      </th>
                      <th className="text-left py-4 px-4 text-xl md:text-2xl font-bold text-chime-text">
                        Expected Usage (Monthly)
                      </th>
                      <th className="text-left py-4 px-4 text-xl md:text-2xl font-bold text-chime-text">
                        Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-4 text-lg md:text-xl font-medium text-chime-text">
                        Smart Search
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        2 credits
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        10–30
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-600">
                        Frequent, exploratory
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-4 text-lg md:text-xl font-medium text-chime-text">
                        AI Recommendations
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        2 credits
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        5–10
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-600">
                        Follows from searches
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-4 text-lg md:text-xl font-medium text-chime-text">
                        Proposal Posting
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        10 credits
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        1–3
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-600">
                        High-intent, occasional
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-4 text-lg md:text-xl font-medium text-chime-text">
                        Contact / Unlock
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        1 credit
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-700">
                        5–10
                      </td>
                      <td className="py-5 px-4 text-lg md:text-xl text-gray-600">
                        For vetted connections
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Additional Info */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-chime-light-mint rounded-xl">
                    <div className="text-4xl font-bold text-chime-teal mb-2">
                      20-60
                    </div>
                    <div className="text-lg text-gray-700">
                      Typical Monthly Credits
                    </div>
                  </div>
                  <div className="text-center p-6 bg-chime-light-mint rounded-xl">
                    <div className="text-4xl font-bold text-chime-teal mb-2">
                      Pay as You Go
                    </div>
                    <div className="text-lg text-gray-700">
                      No Monthly Subscriptions
                    </div>
                  </div>
                  <div className="text-center p-6 bg-chime-light-mint rounded-xl">
                    <div className="text-4xl font-bold text-chime-teal mb-2">
                      No Expiry
                    </div>
                    <div className="text-lg text-gray-700">
                      Credits Never Expire
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/search?q=artificial%20intelligence&category=authors"
            className="inline-block px-10 py-5 bg-gradient-chime text-white font-bold text-xl rounded-full hover:opacity-90 active:shadow-[0_0_0_4px_rgba(0,212,170,0.3),0_4px_12px_rgba(0,0,0,0.15)] transition-all"
          >
            Start Searching
          </a>
          <p className="mt-4 text-lg text-gray-600">
            Get started for free • No credit card required
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p className="mb-2 text-base">
            Powered by{" "}
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chime-teal font-semibold hover:underline"
            >
              OpenAlex
            </a>
          </p>
          <p className="text-base">
            Convergent - Connecting tech companies with research excellence
          </p>
        </div>
      </footer>
    </div>
  );
}

