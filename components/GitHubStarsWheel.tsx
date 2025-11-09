"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GitHubStarsWheelProps {
  value: number;
  delay?: number;
  direction?: "btt" | "ttb"; // bottom-to-top or top-to-bottom
  step?: number;
  itemsSize?: number;
  sideItemsCount?: number;
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: string;
  className?: string;
}

const GitHubStarsWheel = ({
  value,
  delay = 0,
  direction = "btt",
  step = 100,
  itemsSize = 35,
  sideItemsCount = 2,
  inView = false,
  inViewOnce = true,
  inViewMargin = "0px",
  className = "",
}: GitHubStarsWheelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: inViewOnce,
    margin: inViewMargin as any,
  });

  const [displayValue, setDisplayValue] = useState(0);
  const shouldAnimate = inView ? isInView : true;

  useEffect(() => {
    if (shouldAnimate) {
      const timeout = setTimeout(() => {
        setDisplayValue(value);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [shouldAnimate, value, delay]);

  const digits = displayValue.toString().split("");

  return (
    <div ref={ref} className={`flex items-center ${className}`}>
      {digits.map((digit, index) => (
        <ScrollingDigit
          key={`${digit}-${index}`}
          digit={parseInt(digit)}
          direction={direction}
          step={step}
          itemsSize={itemsSize}
          sideItemsCount={sideItemsCount}
        />
      ))}
    </div>
  );
};

interface ScrollingDigitProps {
  digit: number;
  direction: "btt" | "ttb";
  step: number;
  itemsSize: number;
  sideItemsCount: number;
}

const ScrollingDigit = ({
  digit,
  direction,
  step,
  itemsSize,
  sideItemsCount,
}: ScrollingDigitProps) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const extendedDigits = [
    ...digits.slice(-sideItemsCount),
    ...digits,
    ...digits.slice(0, sideItemsCount),
  ];

  const digitIndex = digits.indexOf(digit);
  const targetIndex = digitIndex + sideItemsCount;

  const yPosition =
    direction === "btt"
      ? -(targetIndex * itemsSize)
      : targetIndex * itemsSize;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: `${itemsSize}px`,
        width: `${itemsSize * 0.5}px`,
      }}
    >
      <motion.div
        initial={{
          y: direction === "btt" ? itemsSize * sideItemsCount : -itemsSize * sideItemsCount,
        }}
        animate={{
          y: yPosition,
        }}
        transition={{
          duration: step / 100,
          ease: "easeOut",
        }}
        className="absolute flex flex-col items-center justify-center"
      >
        {extendedDigits.map((d, index) => (
          <div
            key={`${d}-${index}`}
            className="flex items-center justify-center font-extrabold"
            style={{
              height: `${itemsSize}px`,
              width: `${itemsSize * 0.5}px`,
              fontSize: `${itemsSize * 0.8}px`,
              lineHeight: `${itemsSize}px`,
              fontWeight: 900,
            }}
          >
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GitHubStarsWheel;

