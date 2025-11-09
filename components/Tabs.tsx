"use client";

import { Tab as HeadlessTab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
  index: number;
  variant?: "default" | "hero";
}

export function Tab({ children, index, variant = "default" }: TabProps) {
  return (
    <HeadlessTab className="relative outline-none">
      {({ selected }) => (
        <>
          <div
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-lg
              ${selected && variant === "hero" ? "underline decoration-2 underline-offset-4" : ""}
              ${variant === "hero" 
                ? `text-white ${selected ? "font-bold" : "font-semibold"}`
                : `font-semibold ${selected ? "text-white" : "text-gray-600 hover:text-gray-800"}`
              }
            `}
          >
            {children}
          </div>
          {selected && (
            <motion.div
              layoutId="tab-indicator"
              className={`absolute inset-0 rounded-lg -z-10 ${
                variant === "hero" 
                  ? "bg-chime-teal/80" 
                  : "bg-chime-mint-light"
              }`}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </>
      )}
    </HeadlessTab>
  );
}

interface TabPanelWrapperProps {
  children: ReactNode;
}

export function TabPanelWrapper({ children }: TabPanelWrapperProps) {
  return (
    <HeadlessTab.Panel className="outline-none">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </HeadlessTab.Panel>
  );
}

export { TabGroup, TabList, TabPanels };

