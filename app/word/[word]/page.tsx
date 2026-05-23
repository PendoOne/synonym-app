import { WordPage } from "./word-client";
import { groups } from "@/data/mock-words";

export function generateStaticParams() {
  const params: { word: string }[] = [];
  const seen = new Set<string>();
  for (const g of groups) {
    if (!seen.has(g.slug)) {
      seen.add(g.slug);
      params.push({ word: g.slug });
    }
    for (const w of g.words) {
      const lower = w.word.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        params.push({ word: lower });
      }
    }
  }
  return params;
}

export default function Page() {
  return <WordPage />;
}
