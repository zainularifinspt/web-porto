"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Code, User, Send, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-all duration-200">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              ~/portfolio <span className="text-emerald-500 animate-pulse">_</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 font-mono text-xs">
            <Link
              href="/#projects"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
                isHome
                  ? "text-zinc-900 dark:text-zinc-100 font-semibold bg-zinc-100/80 dark:bg-zinc-900/80"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <Code className="w-3.5 h-3.5 text-emerald-500" />
              Galeri Project
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
                isAbout
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-500" />
              Tentang Saya
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
                isContact
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <Send className="w-3.5 h-3.5 text-emerald-500" />
              Kontak &amp; Sosial
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 font-mono text-xs shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/#projects"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
              isHome
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-bold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <Code className="w-4 h-4 text-emerald-500" />
            <span>./galeri-project</span>
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
              isAbout
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-bold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <User className="w-4 h-4 text-emerald-500" />
            <span>./tentang-saya</span>
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
              isContact
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-bold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <Send className="w-4 h-4 text-emerald-500" />
            <span>./kontak-sosial</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
