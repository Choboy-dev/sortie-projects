"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

export function HeroEntrance({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.4, ease, delay: 0.06 }
      }
    >
      {children}
    </motion.div>
  );
}
