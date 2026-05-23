"use client";

import { motion } from "framer-motion";

interface Props {
  level: number; // 1-10
}

export function StrengthBar({ level }: Props) {
  const pct = level * 10;

  // Subtle grey-scale ramp for light mode
  const segments = Array.from({ length: 10 }, (_, i) => i < level);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex flex-1 gap-[3px]">
        {segments.map((filled, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`h-1.5 flex-1 rounded-full ${
              filled ? "bg-zinc-800" : "bg-zinc-100"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-medium tabular-nums text-zinc-300 w-8 text-right">
        {level}/10
      </span>
    </div>
  );
}
