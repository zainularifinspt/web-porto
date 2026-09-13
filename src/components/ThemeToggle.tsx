"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-900/50" />
    );
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={toggleTheme}
        title={`Tema saat ini: ${resolvedTheme === "dark" ? "Mode Gelap" : "Mode Terang"} (Klik untuk beralih)`}
        aria-label="Ganti mode tema gelap atau terang"
        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-800 dark:border-zinc-700/60 transition-colors flex items-center justify-center group"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-500 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
