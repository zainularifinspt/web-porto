"use client";

import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Primary Toggle Button */}
      <button
        onClick={toggleTheme}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsMenuOpen(!isMenuOpen);
        }}
        title={`Tema saat ini: ${resolvedTheme === "dark" ? "Mode Gelap" : "Mode Terang"} (Klik untuk toggle, klik kanan untuk opsi)`}
        aria-label="Ganti mode tema gelap atau terang"
        className="w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 flex items-center justify-center group shadow-sm"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-emerald-600 dark:text-cyan-400 group-hover:-rotate-12 transition-transform duration-300" />
        )}
        {theme === "system" && (
          <span
            className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500"
            title="Mengikuti pengaturan sistem"
          />
        )}
      </button>

      {/* Theme Choice Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-1 font-mono text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] text-zinc-400 uppercase font-semibold border-b border-zinc-100 dark:border-zinc-800 mb-1">
            Pilih Tema
          </div>

          <button
            onClick={() => {
              setTheme("light");
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              theme === "light"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Terang
            </span>
            {theme === "light" && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              theme === "dark"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-cyan-400" /> Gelap
            </span>
            {theme === "dark" && <Check className="w-3 h-3" />}
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setIsMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              theme === "system"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5" /> Sistem
            </span>
            {theme === "system" && <Check className="w-3 h-3" />}
          </button>
        </div>
      )}
    </div>
  );
}
