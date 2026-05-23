"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StrengthBar } from "./strength-bar";
import { cn, formalityColor, emotionColor } from "@/lib/utils";

// -- Inline type matching the new mock data schema ----------------------------
interface SynonymWord {
  word: string;
  pos: string;
  definition: string;
  semantic_difference: string;
  intensity: number;
  formality: string;
  emotion: string;
  collocations: string[];
  exam_sentence: string;
  memory_tip: string;
  chinese_confusion: string;
}

interface Props {
  word: SynonymWord;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

export function WordComparisonCard({
  word,
  index,
  isActive,
  onActivate,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      onClick={onActivate}
      className={cn(
        "group relative cursor-pointer rounded-2xl border transition-all duration-500",
        isActive
          ? "border-zinc-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
      )}
    >
      {/* Active glow */}
      {isActive && (
        <motion.div
          layoutId="active-card-glow"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.04), transparent 60%)",
          }}
          transition={{ type: "spring", bounce: 0.0, duration: 0.6 }}
        />
      )}

      <div className="relative p-6">
        {/* ── Word Header ────────────────────────────────────────── */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2.5">
              <h3 className="text-[26px] font-bold tracking-tight text-zinc-900">
                {word.word}
              </h3>
              <span className="text-[13px] font-medium text-zinc-300">
                {word.pos}
              </span>
            </div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-400">
              {word.definition}
            </p>
          </div>

          {isActive && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            </motion.div>
          )}
        </div>

        {/* ── Semantic Difference ────────────────────────────────── */}
        <p
          className={cn(
            "mb-5 text-[13px] leading-relaxed transition-colors duration-300",
            isActive ? "text-zinc-600" : "text-zinc-400 line-clamp-2",
          )}
        >
          {word.semantic_difference}
        </p>

        {/* ── Intensity + Badges ──────────────────────────────────── */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="min-w-[140px] flex-1">
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
              语义强度
            </div>
            <StrengthBar level={word.intensity} />
          </div>

          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-[3px] text-[11px] font-medium",
              formalityColor(word.formality),
            )}
          >
            {word.formality}
          </span>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-[3px] text-[11px] font-medium",
              emotionColor(word.emotion),
            )}
          >
            {word.emotion}
          </span>
        </div>

        {/* ── Expanded Content ───────────────────────────────────── */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="space-y-5 border-t border-zinc-100 pt-5"
          >
            {/* Collocations */}
            <div>
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                高频搭配
              </div>
              <div className="flex flex-wrap gap-1.5">
                {word.collocations.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg bg-zinc-50 px-2.5 py-1.5 text-[12px] leading-none text-zinc-500 border border-zinc-100"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Exam Sentence */}
            <div>
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                考研真题语境
              </div>
              <blockquote className="rounded-xl border-l-2 border-zinc-200 bg-zinc-50/70 py-3 pl-4 pr-4">
                <p className="text-[13px] leading-relaxed italic text-zinc-500">
                  &ldquo;{word.exam_sentence}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Common Mistake */}
            <div>
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                中国学生常见误用
              </div>
              <p className="text-[12px] leading-relaxed text-rose-500/70">
                {word.chinese_confusion}
              </p>
            </div>

            {/* Memory Tip */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-purple-50/40 p-4">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-blue-400/70">
                  AI 记忆法
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-blue-600/70">
                {word.memory_tip}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
