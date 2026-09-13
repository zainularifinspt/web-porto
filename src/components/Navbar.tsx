"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Code, User, Send, Moon, Sun, Menu, X, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-200">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-sm tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
              ~/portfolio <span className="text-emerald-400 animate-pulse">_</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 font-mono text-xs">
            <Link
              href="#projects"
              className="px-3 py-2 rounded-md text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              Galeri Project
            </Link>
            <Link
              href="#about"
              className="px-3 py-2 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Tentang Saya
            </Link>
            <Link
              href="#contact"
              className="px-3 py-2 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Kontak
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Ganti tema gelap/terang"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900/40 hover:border-emerald-500 transition-all shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Masuk Pemilik
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 border border-zinc-800"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 border border-zinc-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-2 font-mono text-xs">
          <Link
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-emerald-400 bg-zinc-900/80 font-medium"
          >
            ./galeri-project
          </Link>
          <Link
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
          >
            ./tentang-saya
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-900"
          >
            ./kontak
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-emerald-400 border border-emerald-800/60 bg-emerald-950/40 text-center font-semibold"
          >
            Masuk Sebagai Pemilik
          </Link>
        </div>
      )}
    </nav>
  );
}
