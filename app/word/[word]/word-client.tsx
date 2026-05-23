"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Target,
  AlertTriangle,
  Zap,
  Hash,
  GraduationCap,
} from "lucide-react";
import { getGroupBySlug, getGroupByWord, groups } from "@/data/mock-words";
import { StrengthBar } from "@/components/comparison/strength-bar";
import { cn, confusionLabel, formalityColor, emotionColor } from "@/lib/utils";

// ── Animation Variants ──────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const dashboardVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const childFadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ── Background ───────────────────────────────────────────────────────────────

function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -right-32 -top-32 h-[700px] w-[700px] rounded-full bg-violet-50/40 blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-50/30 blur-[140px]" />
    </div>
  );
}

// ── Word Trigger Card (Compact, no expansion) ─────────────────────────────────

function WordTriggerCard({
  word,
  index,
  isActive,
  onActivate,
}: {
  word: {
    word: string;
    pos: string;
    definition: string;
    intensity: number;
    formality: string;
    emotion: string;
  };
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      custom={index}
      onClick={onActivate}
      className={cn(
        "group relative w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-500",
        isActive
          ? "border-zinc-900/20 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
          : "border-zinc-100 bg-white/80 opacity-60 hover:opacity-90 hover:border-zinc-200",
      )}
    >
      {/* Active indicator line */}
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-zinc-900"
          transition={{ type: "spring", bounce: 0.0, duration: 0.5 }}
        />
      )}

      {/* Header: word + pos */}
      <div className="mb-2 flex items-baseline gap-2">
        <span
          className={cn(
            "text-2xl font-bold tracking-tight transition-colors duration-300",
            isActive ? "text-zinc-900" : "text-zinc-400",
          )}
        >
          {word.word}
        </span>
        <span className="text-xs font-medium text-zinc-300">{word.pos}</span>
      </div>

      {/* Definition — 1 line clamp */}
      <p className="mb-3 line-clamp-1 text-[13px] leading-relaxed text-zinc-400">
        {word.definition}
      </p>

      {/* Compact intensity + badges */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <StrengthBar level={word.intensity} />
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-[2px] text-[10px] font-medium",
            formalityColor(word.formality),
          )}
        >
          {word.formality}
        </span>
      </div>
    </motion.button>
  );
}

// ── Dashboard Panel (Active word detail) ──────────────────────────────────────

function DashboardPanel({
  word,
  groupName,
}: {
  word: {
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
  };
  groupName: string;
}) {
  return (
    <motion.div
      key={word.word}
      variants={dashboardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_2px_24px_rgba(0,0,0,0.03)]"
    >
      {/* ── Hero Strip ──────────────────────────────────────────── */}
      <div className="border-b border-zinc-50 bg-gradient-to-b from-zinc-50/50 to-white px-8 py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Word + POS */}
          <motion.div variants={childFadeUp} custom={0} className="flex items-baseline gap-4">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {word.word}
            </h2>
            <span className="text-lg font-medium text-zinc-300">{word.pos}</span>
          </motion.div>

          {/* Core Definition — large */}
          <motion.p
            variants={childFadeUp}
            custom={1}
            className="max-w-2xl text-xl font-medium leading-relaxed text-zinc-700"
          >
            {word.definition}
          </motion.p>

          {/* Badges Row */}
          <motion.div variants={childFadeUp} custom={2} className="flex flex-wrap items-center gap-4">
            {/* Intensity Bar (wide) */}
            <div className="min-w-[200px]">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                语义强度
              </div>
              <StrengthBar level={word.intensity} />
            </div>

            {/* Formality Badge */}
            <div>
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                正式度
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  formalityColor(word.formality),
                )}
              >
                {word.formality}
              </span>
            </div>

            {/* Emotion Badge */}
            <div>
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
                情感色彩
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  emotionColor(word.emotion),
                )}
              >
                {word.emotion}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Two-Column Content ────────────────────────────────────── */}
      <div className="grid gap-0 lg:grid-cols-2">
        {/* Left: Semantic Difference + Common Mistake */}
        <div className="space-y-6 p-8">
          {/* Semantic Difference */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                核心辨析
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-zinc-600">
              {word.semantic_difference}
            </p>
          </div>

          {/* Chinese Common Mistake — Alert Block */}
          <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-5">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-600">
                中国学生常见误用
              </span>
            </div>
            <p className="text-[14px] leading-relaxed font-medium text-amber-800">
              {word.chinese_confusion}
            </p>
          </div>
        </div>

        {/* Right: Collocations + Exam Context + Memory Tip */}
        <div className="space-y-6 border-l border-zinc-50 p-8">
          {/* Collocations */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                高频搭配
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {word.collocations.map((c) => (
                <span
                  key={c}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium leading-none text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Exam Sentence */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                考研真题语境
              </span>
            </div>
            <blockquote className="rounded-2xl border-l-2 border-zinc-300 bg-zinc-50/70 py-4 pl-5 pr-5">
              <p className="text-[14px] leading-relaxed italic text-zinc-500">
                &ldquo;{word.exam_sentence}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* AI Memory Tip */}
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/50 to-purple-50/30 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-violet-500">
                AI 记忆法
              </span>
            </div>
            <p className="text-[14px] leading-relaxed font-medium text-violet-700">
              {word.memory_tip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WordPage() {
  const params = useParams();
  const rawWord = Array.isArray(params.word) ? params.word[0] : params.word;
  const word = decodeURIComponent(rawWord ?? "");

  const group =
    getGroupBySlug(word) ?? getGroupByWord(word);

  // Default to first word; ensure it's always a valid word from the group
  const [activeWord, setActiveWord] = useState<string>("");

  // Once group resolves, init activeWord
  const resolvedActive = useMemo(() => {
    if (!group) return "";
    if (activeWord && group.words.some((w) => w.word.toLowerCase() === activeWord.toLowerCase())) {
      return activeWord;
    }
    return group.words[0]?.word.toLowerCase() ?? "";
  }, [group, activeWord]);

  const activeWordData = useMemo(
    () => group?.words.find((w) => w.word.toLowerCase() === resolvedActive.toLowerCase()),
    [group, resolvedActive],
  );

  // ── 404 ───────────────────────────────────────────────────────────────────
  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <p className="text-7xl font-light text-zinc-200">404</p>
        <h2 className="mt-6 text-xl font-semibold text-zinc-800">
          未找到该词组
        </h2>
        <p className="mt-2 text-zinc-400">
          找不到 &quot;{word}&quot; 的同义词组数据
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回首页
        </Link>
      </div>
    );
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentIndex = groups.indexOf(group);
  const prevGroup = currentIndex > 0 ? groups[currentIndex - 1] : null;
  const nextGroup =
    currentIndex < groups.length - 1 ? groups[currentIndex + 1] : null;

  const confusionBadge = (() => {
    const lv = group.confusion_level;
    if (lv === 10) return "bg-rose-50 text-rose-600 border-rose-200";
    if (lv >= 9) return "bg-amber-50 text-amber-600 border-amber-200";
    return "bg-blue-50 text-blue-500 border-blue-200";
  })();

  return (
    <>
      <PageBackground />

      {/* ── Back Link ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回词组列表
        </Link>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1: HERO HEADER
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mb-12"
      >
        {/* Badges Row */}
        <motion.div
          variants={fadeUp}
          className="mb-5 flex flex-wrap items-center gap-2.5"
        >
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-500">
            {group.group_name}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold",
              confusionBadge,
            )}
          >
            {confusionLabel(group.confusion_level)}
          </span>
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-400">
            {group.words.length} 词对比
          </span>
        </motion.div>

        {/* Word Trigger Cards — horizontal grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {group.words.map((w, i) => (
            <WordTriggerCard
              key={w.word}
              word={w}
              index={i}
              isActive={resolvedActive === w.word.toLowerCase()}
              onActivate={() => setActiveWord(w.word.toLowerCase())}
            />
          ))}
        </motion.div>

        {/* Semantic Core */}
        <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2">
          <Target className="h-3.5 w-3.5 text-zinc-300" />
          <p className="text-sm text-zinc-400">
            语义核心：
            <span className="font-medium text-zinc-600">
              {group.semantic_core}
            </span>
          </p>
        </motion.div>

        {/* One-sentence highlight card */}
        <motion.div
          variants={fadeUp}
          className="mt-5 rounded-2xl border border-zinc-100 bg-gradient-to-r from-zinc-50 to-white p-5"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300">
              一句话辨析
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-zinc-600">
            {group.one_sentence_diff}
          </p>
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3: DYNAMIC DASHBOARD (AnimatePresence)
          ════════════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <AnimatePresence mode="wait">
          {activeWordData && (
            <DashboardPanel
              key={activeWordData.word}
              word={activeWordData}
              groupName={group.group_name}
            />
          )}
        </AnimatePresence>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4: FLASHCARD CTA
          ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-12"
      >
        <Link
          href="/flashcard"
          className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 transition-all duration-500 hover:border-zinc-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/0 to-blue-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 transition-colors group-hover:bg-blue-50">
              <BookOpen className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-800">
                用闪卡巩固这组词
              </h3>
              <p className="mt-0.5 text-[13px] text-zinc-400">
                翻转卡片模式，反复强化语义边界记忆
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-600">
            <Layers className="h-4 w-4" />
            开始闪卡
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5: PREV / NEXT NAVIGATION
          ════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between border-t border-zinc-100 pt-8"
      >
        {prevGroup ? (
          <Link
            href={`/word/${prevGroup.slug}`}
            className="group flex items-center gap-3 text-left transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-100 bg-white text-zinc-300 transition-all group-hover:border-zinc-200 group-hover:text-zinc-500">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-300">
                上一组
              </div>
              <div className="text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-700">
                {prevGroup.group_name}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextGroup ? (
          <Link
            href={`/word/${nextGroup.slug}`}
            className="group flex items-center gap-3 text-right transition-colors"
          >
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-300">
                下一组
              </div>
              <div className="text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-700">
                {nextGroup.group_name}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-100 bg-white text-zinc-300 transition-all group-hover:border-zinc-200 group-hover:text-zinc-500">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </motion.nav>
    </>
  );
}
