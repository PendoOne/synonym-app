import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Intensity 1-10 → 极简亮色调色板 */
export function intensityColor(level: number): string {
  if (level >= 9) return "bg-zinc-800";
  if (level >= 7) return "bg-zinc-600";
  if (level >= 5) return "bg-zinc-400";
  return "bg-zinc-300";
}

export function formalityColor(f: string): string {
  if (f.includes("高度")) return "bg-violet-50 text-violet-600 border-violet-200";
  if (f.includes("正式")) return "bg-blue-50 text-blue-600 border-blue-200";
  if (f.includes("中等")) return "bg-amber-50 text-amber-600 border-amber-200";
  return "bg-zinc-50 text-zinc-500 border-zinc-200";
}

export function emotionColor(e: string): string {
  const t = e.toLowerCase();
  if (t.includes("负面") || t.includes("对抗") || t.includes("冲突"))
    return "bg-rose-50 text-rose-600";
  if (t.includes("正面") || t.includes("安抚") || t.includes("温暖") || t.includes("自信"))
    return "bg-emerald-50 text-emerald-600";
  if (t.includes("中性") || t.includes("客观"))
    return "bg-zinc-50 text-zinc-500";
  if (t.includes("戏剧") || t.includes("揭秘"))
    return "bg-amber-50 text-amber-600";
  return "bg-zinc-50 text-zinc-500";
}

export function confusionLabel(level: number): string {
  if (level === 10) return "终极Boss";
  if (level >= 9) return "极易混淆";
  if (level >= 7) return "高频易混";
  if (level >= 5) return "常见混淆";
  return "轻度相似";
}

export function strengthColor(level: number): string {
  if (level >= 9) return "bg-zinc-800";
  if (level >= 7) return "bg-zinc-600";
  if (level >= 5) return "bg-zinc-400";
  return "bg-zinc-300";
}

export function strengthHex(_level: number): string {
  return "#a1a1aa";
}
