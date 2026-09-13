"use client";

import React from "react";
import { Terminal, Code2, ChevronDown } from "lucide-react";

interface SectionDividerProps {
  label: string;
  icon?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionDivider({
  label,
  icon,
  align = "center",
  className = "",
}: SectionDividerProps) {
  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div className={`relative flex items-center ${justifyClass} my-8 select-none ${className}`}>
      {/* Decorative Horizontal Line */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800/90" />
      </div>

      {/* Center Developer Badge */}
      <div className="relative flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 shadow-xs text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
        {icon || <Terminal className="w-3 h-3 text-emerald-500" />}
        <span className="font-semibold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      </div>
    </div>
  );
}
