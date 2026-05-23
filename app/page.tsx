"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Layers,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { groups } from "@/data/mock-words";
import { confusionLabel } from "@/lib/utils";

// -- Animation variants -------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

// -- Stat badge ---------------------------------------------------------------
function StatBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-3"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50">
        <Icon className="h-4 w-4 text-zinc-400" />
      </div>
      <div>
        <div className="text-lg font-bold tabular-nums text-zinc-800">{value}</div>
        <div className="text-[11px] text-zinc-400">{label}</div>
      </div>
    </motion.div>
  );
}

// -- Group card ---------------------------------------------------------------
function GroupCard({
  group,
  index,
}: {
  group: (typeof groups)[0];
  index: number;
}) {
  return (
    <motion.div variants={fadeUp} custom={index}>
      <Link href={`/word/${group.slug}`}>
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:border-zinc-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500">
              {group.group_name}
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              {confusionLabel(group.confusion_level)}
            </span>
          </div>

          <div className="mb-2 flex flex-wrap gap-1.5">
            {group.words.map((w) => (
              <span
                key={w.word}
                className="rounded-lg bg-zinc-50 px-2.5 py-1 text-sm font-medium text-zinc-600 transition-colors group-hover:bg-zinc-100"
              >
                {w.word}
              </span>
            ))}
          </div>

          <p className="text-xs text-zinc-400">{group.semantic_core}</p>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4 text-zinc-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// -- Page ---------------------------------------------------------------------
export default function HomePage() {
  return (
    <div className="relative">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mb-20 pt-12"
      >
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-xs font-medium text-zinc-500">
            AI 驱动的同义词深度学习
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
        >
          不再死记硬背，
          <br />
          <span className="text-gradient">理解词语之间的区别</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          覆盖考研英语 TOP 100 高频易混词组。从语义强度、正式程度、情感色彩
          到考研阅读真题场景，AI 帮你真正理解每个词的精确边界。
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:scale-[1.01]"
          >
            <Search className="h-4 w-4" />
            开始搜索单词
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/flashcard"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:border-zinc-300 hover:bg-zinc-50"
          >
            <Layers className="h-4 w-4" />
            闪卡模式
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:gap-4"
        >
          <StatBadge icon={TrendingUp} label="高频易混词组" value="100" />
          <StatBadge icon={Zap} label="核心词汇覆盖" value="400+" />
          <StatBadge icon={Sparkles} label="AI 记忆法" value="每词" />
        </motion.div>
      </motion.section>

      {/* ── Groups Grid ─────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-800">
              高频易混词组
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              从最重要的词组开始学习
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-600"
          >
            查看全部
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <GroupCard key={g.slug} group={g} index={i} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
