"use client";

import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  UsersIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
  const steps = [
    {
      icon: MagnifyingGlassIcon,
      title: "Search for Expertise",
      description:
        "Enter your research needs, technology area, or specific expertise you're looking for",
    },
    {
      icon: UsersIcon,
      title: "Browse Matched Authors",
      description:
        "Our AI-powered algorithm matches you with the most relevant authors and institutions",
    },
    {
      icon: RocketLaunchIcon,
      title: "Connect & Collaborate",
      description:
        "Reach out directly to start your R&D partnership and accelerate innovation",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-chime-text mb-4">
            How It Works
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-normal">
            Three simple steps to find your perfect research partner
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Icon Circle */}
                <motion.div
                  className="relative inline-flex items-center justify-center w-24 h-24 mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-chime rounded-full opacity-20" />
                  <div className="relative bg-gradient-chime rounded-full p-6">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                {/* Step Number */}
                <div className="text-chime-mint font-bold text-2xl mb-3">
                  Step {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-chime-text mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

