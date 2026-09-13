"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Code, User, Send, Menu, X, ShieldAlert } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              className="px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-emerald-500" />
              Galeri Project
            </Link>
            <Link
              href="/#about"
              className="px-3 py-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Tentang Saya
            </Link>
            <Link
              href="/#contact"
              className="px-3 py-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Kontak
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-500 transition-all shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Masuk Pemilik
            </Link>
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
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-2 font-mono text-xs shadow-lg">
          <Link
            href="/#projects"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-emerald-600 dark:text-emerald-400 bg-zinc-100 dark:bg-zinc-900/80 font-medium"
          >
            ./galeri-project
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            ./tentang-saya
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            ./kontak
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-center font-semibold"
          >
            Masuk Sebagai Pemilik
          </Link>
        </div>
      )}
    </nav>
  );
}
