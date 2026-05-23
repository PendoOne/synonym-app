"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Sparkles,
  X,
  Filter,
  BookOpen,
  Languages,
  FileText,
  Check,
} from "lucide-react";
import { groups } from "@/data/mock-words";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type StudyMode = "en-zh" | "zh-en" | "cloze";

interface FlashCard {
  id: string;
  word: string;
  definition: string;
  semanticDifference: string;
  intensity: number;
  formality: string;
  groupName: string;
  groupSlug: string;
  examSentence: string;
}

interface ProgressState {
  mode: StudyMode;
  currentIndex: number;
  shuffledIds: string[];
  selectedGroupSlugs: string[];
}

const STORAGE_KEY = "flashcard_progress_v2";

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildAllCards(): FlashCard[] {
  const cards: FlashCard[] = [];
  groups.forEach((g) => {
    g.words.forEach((w) => {
      cards.push({
        id: `${g.slug}-${w.word}`,
        word: w.word,
        definition: w.definition,
        semanticDifference: w.semantic_difference,
        intensity: w.intensity,
        formality: w.formality,
        groupName: g.group_name,
        groupSlug: g.slug,
        examSentence: w.exam_sentence,
      });
    });
  });
  return cards;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCloze(sentence: string, word: string): string {
  if (!sentence) return `______ (${word})`;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "gi");
  if (re.test(sentence)) {
    return sentence.replace(re, "__________");
  }
  // If word not found literally, prepend blank
  return `__________ ${sentence}`;
}

function loadProgress(): ProgressState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProgressState;
    if (
      typeof parsed.currentIndex === "number" &&
      Array.isArray(parsed.shuffledIds) &&
      Array.isArray(parsed.selectedGroupSlugs)
    ) {
      return parsed;
    }
  } catch {}
  return null;
}

function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ModeSwitcher({
  mode,
  onChange,
}: {
  mode: StudyMode;
  onChange: (m: StudyMode) => void;
}) {
  const modes: { key: StudyMode; label: string; icon: React.ReactNode }[] = [
    { key: "en-zh", label: "英→中", icon: <Languages className="h-3.5 w-3.5" /> },
    { key: "zh-en", label: "中→英", icon: <BookOpen className="h-3.5 w-3.5" /> },
    { key: "cloze", label: "真题挖空", icon: <FileText className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={cn(
            "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-300",
            mode === m.key
              ? "bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              : "text-zinc-400 hover:text-zinc-600",
          )}
        >
          {m.icon}
          {m.label}
        </button>
      ))}
    </div>
  );
}

function FilterPanel({
  selectedSlugs,
  onToggleGroup,
  onSelectAll,
  onDeselectAll,
  onClose,
}: {
  selectedSlugs: Set<string>;
  onToggleGroup: (slug: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-white/80 backdrop-blur-sm pt-24"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 max-h-[70vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-800">选择词组</h3>
            <p className="mt-0.5 text-[13px] text-zinc-400">
              已选 {selectedSlugs.size}/{groups.length} 组
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Bulk actions */}
        <div className="flex gap-2 border-b border-zinc-50 px-6 py-3">
          <button
            onClick={onSelectAll}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700"
          >
            全选
          </button>
          <button
            onClick={onDeselectAll}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-600"
          >
            取消全选
          </button>
        </div>

        {/* Group list */}
        <div className="overflow-y-auto px-6 py-3" style={{ maxHeight: "calc(70vh - 140px)" }}>
          <div className="grid gap-1 sm:grid-cols-2">
            {groups.map((g) => {
              const checked = selectedSlugs.has(g.slug);
              return (
                <label
                  key={g.slug}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                    checked
                      ? "bg-zinc-50"
                      : "hover:bg-zinc-50/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
                      checked
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white",
                    )}
                  >
                    {checked && <Check className="h-3 w-3" />}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-zinc-700">
                      {g.group_name}
                    </div>
                    <div className="truncate text-[11px] text-zinc-400">
                      {g.words.map((w) => w.word).join(" · ")}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            确认
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RatingButtons({
  onRate,
}: {
  onRate: (rating: "again" | "hard" | "good") => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className="mt-8 flex items-center justify-center gap-3"
    >
      <button
        onClick={() => onRate("again")}
        className="group relative flex flex-col items-center gap-1"
        title="不认识 / 重新学习"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 transition-all hover:border-rose-300 hover:bg-rose-100 hover:scale-105">
          <RotateCcw className="h-5 w-5" />
        </span>
        <span className="text-[10px] font-medium text-zinc-400">重来</span>
      </button>

      <button
        onClick={() => onRate("hard")}
        className="group relative flex flex-col items-center gap-1"
        title="模糊 / 犹豫了一下"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-500 transition-all hover:border-amber-300 hover:bg-amber-100 hover:scale-105">
          <span className="text-lg font-bold">?</span>
        </span>
        <span className="text-[10px] font-medium text-zinc-400">犹豫</span>
      </button>

      <button
        onClick={() => onRate("good")}
        className="group relative flex flex-col items-center gap-1"
        title="熟练 / 斩掉这个词"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-500 transition-all hover:border-emerald-300 hover:bg-emerald-100 hover:scale-105">
          <Check className="h-5 w-5" />
        </span>
        <span className="text-[10px] font-medium text-zinc-400">熟练</span>
      </button>
    </motion.div>
  );
}

function TooltipButton({
  onClick,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-zinc-300 hover:text-zinc-600 disabled:opacity-20"
      >
        {children}
      </button>
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
        {title}
      </span>
    </div>
  );
}

// ── Flashcard Component with 3D flip ─────────────────────────────────────────

function CardFaceFront({
  mode,
  card,
}: {
  mode: StudyMode;
  card: FlashCard;
}) {
  if (mode === "en-zh") {
    return (
      <>
        <div className="mb-4 rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
          {card.groupName}
        </div>
        <p className="text-center text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl">
          {card.word}
        </p>
        <p className="mt-6 text-xs text-zinc-300">点击翻转查看释义</p>
      </>
    );
  }

  if (mode === "zh-en") {
    return (
      <>
        <div className="mb-4 rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
          {card.groupName}
        </div>
        <p className="max-w-md text-center text-xl font-semibold leading-relaxed text-zinc-700 sm:text-2xl">
          {card.definition}
        </p>
        <p className="mt-6 text-xs text-zinc-300">点击翻转查看英文单词</p>
      </>
    );
  }

  // Cloze mode
  const clozeText = makeCloze(card.examSentence, card.word);
  return (
    <>
      <div className="mb-4 rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
        真题挖空
      </div>
      <p className="max-w-lg text-center text-lg font-medium leading-relaxed text-zinc-700 sm:text-xl">
        {clozeText}
      </p>
      <p className="mt-6 text-xs text-zinc-300">点击翻转查看答案</p>
    </>
  );
}

function CardFaceBack({
  mode,
  card,
}: {
  mode: StudyMode;
  card: FlashCard;
}) {
  if (mode === "en-zh") {
    return (
      <>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-blue-400/60">
            {card.groupName}
          </span>
        </div>
        <p className="mb-3 text-2xl font-bold text-blue-700">{card.word}</p>
        <p className="max-w-md text-center text-lg font-semibold leading-relaxed text-blue-600/80">
          {card.definition}
        </p>
        <p className="mt-4 max-w-lg text-center text-[13px] leading-relaxed text-blue-500/60">
          {card.semanticDifference.slice(0, 160)}
        </p>
      </>
    );
  }

  if (mode === "zh-en") {
    return (
      <>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-blue-400/60">
            答案
          </span>
        </div>
        <p className="text-center text-3xl font-bold tracking-tight text-blue-700 sm:text-4xl">
          {card.word}
        </p>
        <p className="mt-4 max-w-md text-center text-[13px] leading-relaxed text-blue-500/60">
          {card.groupName} · 强度 {card.intensity}/10 · {card.formality}
        </p>
      </>
    );
  }

  // Cloze mode
  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-400/60">
          答案
        </span>
      </div>
      <p className="text-center text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl">
        {card.word}
      </p>
      <p className="mt-3 text-center text-lg font-medium text-emerald-600/80">
        {card.definition}
      </p>
      <p className="mt-4 max-w-lg text-center text-[13px] leading-relaxed text-emerald-600/50">
        {card.examSentence}
      </p>
    </>
  );
}

function FlashCardView({
  card,
  flipped,
  onFlip,
  mode,
}: {
  card: FlashCard;
  flipped: boolean;
  onFlip: () => void;
  mode: StudyMode;
}) {
  return (
    <div
      onClick={onFlip}
      className="relative h-80 w-full cursor-pointer [perspective:1200px] sm:h-[22rem]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Front face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-zinc-100 bg-white p-8 [backface-visibility:hidden] shadow-[0_2px_24px_rgba(0,0,0,0.03)]">
          <CardFaceFront mode={mode} card={card} />
        </div>

        {/* Back face */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center rounded-3xl border p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]",
            mode === "cloze"
              ? "border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/30"
              : "border-blue-100 bg-gradient-to-br from-blue-50/60 to-purple-50/30",
          )}
        >
          <CardFaceBack mode={mode} card={card} />
        </div>
      </motion.div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FlashcardPage() {
  const allCards = useMemo(() => buildAllCards(), []);

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<StudyMode>("en-zh");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(
    () => new Set(groups.map((g) => g.slug)),
  );
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const prevModeRef = useRef(mode);

  // ── Hydrate from localStorage on client mount (avoid SSR mismatch) ──────
  useEffect(() => {
    const saved = loadProgress();
    if (saved?.mode) setMode(saved.mode);
    const slugs = saved?.selectedGroupSlugs?.length
      ? new Set(saved.selectedGroupSlugs)
      : new Set(groups.map((g) => g.slug));
    setSelectedSlugs(slugs);

    const filtered = allCards.filter((c) => slugs.has(c.groupSlug));
    if (saved?.shuffledIds?.length) {
      const idMap = new Map(filtered.map((c) => [c.id, c]));
      const restored: FlashCard[] = [];
      for (const id of saved.shuffledIds) {
        const card = idMap.get(id);
        if (card) { restored.push(card); idMap.delete(id); }
      }
      for (const card of idMap.values()) restored.push(card);
      if (restored.length > 0) {
        setShuffledCards(restored);
        setCurrentIndex(saved.currentIndex ?? 0);
        setMounted(true);
        return;
      }
    }
    setShuffledCards(shuffleArray(filtered));
    setCurrentIndex(0);
    setMounted(true);
  }, [allCards]);

  // ── Persist progress ───────────────────────────────────────────────────
  useEffect(() => {
    saveProgress({
      mode,
      currentIndex,
      shuffledIds: shuffledCards.map((c) => c.id),
      selectedGroupSlugs: [...selectedSlugs],
    });
  }, [mode, currentIndex, shuffledCards, selectedSlugs]);

  // ── Derived ────────────────────────────────────────────────────────────
  const currentCard = shuffledCards[currentIndex] ?? null;
  const total = shuffledCards.length;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  // ── Actions ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (currentIndex >= total - 1) return;
    setDirection(1);
    setFlipped(false);
    setCurrentIndex((i) => i + 1);
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex <= 0) return;
    setDirection(-1);
    setFlipped(false);
    setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const jumpToRandom = useCallback(() => {
    if (total <= 1) return;
    let next: number;
    do {
      next = Math.floor(Math.random() * total);
    } while (next === currentIndex);
    setDirection(next > currentIndex ? 1 : -1);
    setFlipped(false);
    setCurrentIndex(next);
  }, [currentIndex, total]);

  const handleRestart = useCallback(() => {
    const filtered = allCards.filter((c) => selectedSlugs.has(c.groupSlug));
    setShuffledCards(shuffleArray(filtered));
    setCurrentIndex(0);
    setFlipped(false);
    setDirection(0);
  }, [allCards, selectedSlugs]);

  const handleModeChange = useCallback(
    (m: StudyMode) => {
      setMode(m);
      setFlipped(false);
      // Re-shuffle when switching mode (keep current word if possible)
      if (m !== prevModeRef.current) {
        prevModeRef.current = m;
        const filtered = allCards.filter((c) => selectedSlugs.has(c.groupSlug));
        setShuffledCards(shuffleArray(filtered));
        setCurrentIndex(0);
        setDirection(0);
      }
    },
    [allCards, selectedSlugs],
  );

  const handleRate = useCallback(
    (_rating: "again" | "hard" | "good") => {
      goNext();
    },
    [goNext],
  );

  const handleToggleGroup = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        if (next.size <= 1) return prev; // keep at least 1
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedSlugs(new Set(groups.map((g) => g.slug)));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelectedSlugs(new Set([groups[0].slug]));
  }, []);

  // ── Loading state (SSR or not yet hydrated) ─────────────────────────
  if (!mounted) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="h-80 animate-pulse rounded-3xl bg-zinc-50" />
      </div>
    );
  }

  // ── Edge case: no cards after filtering ──────────────────────────────
  if (total === 0 || !currentCard) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="text-2xl font-light text-zinc-300">暂无闪卡</p>
        <p className="mt-2 text-zinc-400">请至少选择一个词组</p>
        <button
          onClick={() => setShowFilter(true)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800"
        >
          <Filter className="h-3.5 w-3.5" />
          选择词组
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-xl">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800">
          闪卡学习
        </h1>
        <p className="mt-2 text-zinc-400">翻转卡片，强化词语辨析记忆</p>
      </motion.div>

      {/* ── Mode Switcher + Filter Button ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8 flex items-center justify-between"
      >
        <ModeSwitcher mode={mode} onChange={handleModeChange} />
        <button
          onClick={() => setShowFilter(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-zinc-300 hover:text-zinc-600"
          title="选择词组"
        >
          <Filter className="h-4 w-4" />
        </button>
      </motion.div>

      {/* ── Progress Bar ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
          <span>
            {currentIndex + 1} / {total}
          </span>
          <span>{currentCard.groupName}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </div>
      </motion.div>

      {/* ── Flashcard (slide transition) ─────────────────────────────────── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${currentCard.id}-${currentIndex}`}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <FlashCardView
            card={currentCard}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
            mode={mode}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Anki Rating Buttons (shown when flipped) ──────────────────────── */}
      <AnimatePresence>
        {flipped && <RatingButtons onRate={handleRate} />}
      </AnimatePresence>

      {/* ── Navigation Controls ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn("flex items-center justify-center gap-3", flipped ? "mt-6" : "mt-8")}
      >
        <TooltipButton
          onClick={goPrev}
          disabled={currentIndex === 0}
          title="上一张"
        >
          <ChevronLeft className="h-4 w-4" />
        </TooltipButton>

        <TooltipButton onClick={jumpToRandom} title="随机跳转">
          <Shuffle className="h-4 w-4" />
        </TooltipButton>

        <TooltipButton onClick={handleRestart} title="重新开始">
          <RotateCcw className="h-3.5 w-3.5" />
        </TooltipButton>

        <TooltipButton
          onClick={goNext}
          disabled={currentIndex >= total - 1}
          title="下一张"
        >
          <ChevronRight className="h-4 w-4" />
        </TooltipButton>
      </motion.div>

      {/* ── Filter Panel Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showFilter && (
          <FilterPanel
            selectedSlugs={selectedSlugs}
            onToggleGroup={handleToggleGroup}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onClose={() => setShowFilter(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
