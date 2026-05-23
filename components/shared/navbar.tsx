"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "首页", icon: Sparkles },
  { href: "/search", label: "搜索", icon: Search },
  { href: "/flashcard", label: "闪卡", icon: Layers },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-sm">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-800">
            <span className="text-gradient">AI</span>
            <span> 同义词辨析</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-600",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-lg bg-zinc-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
