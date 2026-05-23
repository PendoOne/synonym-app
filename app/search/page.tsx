"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Hash } from "lucide-react";
import { groups, getAllWords } from "@/data/mock-words";
import { confusionLabel, cn } from "@/lib/utils";

const allWords = getAllWords();

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return groups.map((g) => ({ type: "group" as const, group: g }));

    const wordMatches = groups
      .flatMap((g) =>
        g.words
          .filter((w) => w.word.toLowerCase().includes(q))
          .map((w) => ({ type: "word" as const, word: w.word, group: g })),
      )
      .slice(0, 20);

    const groupMatches = groups.filter(
      (g) =>
        g.group_name.includes(q) ||
        g.semantic_core.includes(q) ||
        g.words.some((w) => w.definition.includes(q)),
    );

    return [...wordMatches, ...groupMatches.map((g) => ({ type: "group" as const, group: g }))];
  }, [query]);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800">搜索单词</h1>
        <p className="mt-2 text-zinc-400">
          输入单词或词组名称，快速定位同义词辨析
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="relative mb-10"
      >
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="h-4 w-4 text-zinc-300" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索单词或词组，如 affect, influence, acquire..."
          autoFocus
          className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-11 pr-4 text-base text-zinc-800 placeholder:text-zinc-300 focus:border-zinc-300 focus:outline-none transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <kbd className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>
      </motion.div>

      {!query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="mb-8"
        >
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
            <Hash className="h-3 w-3" />
            全部单词速览
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allWords.map((w) => (
              <Link
                key={w.word}
                href={`/word/${w.slug}`}
                className="rounded-lg border border-zinc-100 bg-white px-3 py-1.5 text-sm text-zinc-500 transition-all hover:border-zinc-200 hover:text-zinc-700"
              >
                {w.word}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {results.map((item, i) => {
            if (item.type === "word") {
              const g = item.group;
              return (
                <motion.div
                  key={`word-${item.word}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/word/${g.slug}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-zinc-800">
                        {item.word}
                      </span>
                      <span className="rounded-full bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-400">
                        {g.group_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          g.confusion_level >= 9
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-500",
                        )}
                      >
                        {confusionLabel(g.confusion_level)}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            }

            const g = item.group;
            return (
              <motion.div
                key={`group-${g.slug}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/word/${g.slug}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-200"
                >
                  <div>
                    <div className="font-semibold text-zinc-800">
                      {g.group_name}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      {g.semantic_core}
                    </div>
                    <div className="mt-1.5 flex gap-1">
                      {g.words.map((w) => (
                        <span
                          key={w.word}
                          className="rounded-lg bg-zinc-50 px-1.5 py-0.5 text-[11px] text-zinc-500"
                        >
                          {w.word}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {query && results.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center text-zinc-300"
          >
            未找到匹配结果，试试其他关键词
          </motion.p>
        )}
      </div>
    </div>
  );
}
