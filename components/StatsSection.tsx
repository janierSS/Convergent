"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "100M+", label: "Research Papers" },
  { value: "250M+", label: "Authors" },
  { value: "100K+", label: "Institutions" },
  { value: "200+", label: "Countries" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20 bg-chime-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chime-text mb-3 sm:mb-4">
            Powered by OpenAlex
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-normal px-4">
            Access the world&apos;s largest open database of scholarly research
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-chime bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-base sm:text-lg md:text-xl text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

