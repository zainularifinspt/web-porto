"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Terminal,
  FolderGit2,
  FileCode2,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string>("admin@developer.dev");

  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Skip layout shell on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      const stored = localStorage.getItem("portfolio_admin_user");
      if (stored) {
        setAdminUser(stored);
      }

      // Fetch unread messages count
      fetch("/api/contact/messages?stats=true")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.stats && typeof data.stats.unread === "number") {
            setUnreadCount(data.stats.unread);
          }
        })
        .catch(() => {});
    }
  }, [isLoginPage, pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio_admin_auth");
      localStorage.removeItem("portfolio_admin_user");
      localStorage.removeItem("portfolio_admin_token");
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: "Kelola Project",
      href: "/admin",
      icon: FolderGit2,
      active: pathname === "/admin" || pathname.startsWith("/admin/projects"),
    },
    {
      label: "Urutan & Unggulan",
      href: "/admin/reorder",
      icon: ArrowUpDown,
      active: pathname === "/admin/reorder",
    },
    {
      label: "Profil & Keahlian",
      href: "/admin/profile",
      icon: FileCode2,
      active: pathname === "/admin/profile",
    },
    {
      label: "Pesan & Kontak",
      href: "/admin/messages",
      icon: MessageSquare,
      active: pathname === "/admin/messages",
      badge: unreadCount > 0 ? `${unreadCount} Baru` : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand and Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="font-mono text-xs hidden sm:block">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                  ~/portfolio/admin-console
                </div>
                <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>mode: mock-manager</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 font-mono text-xs">
            {/* View live site button */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-[11px]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Lihat Web Publik</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <div className="hidden lg:block text-right text-[11px]">
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {adminUser.split("@")[0]}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Pemilik Sah</div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Keluar dari portal pemilik"
                aria-label="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (Sidebar + Content) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-6 hidden md:block">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 shadow-sm backdrop-blur-md space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Navigasi Admin
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-all ${
                    item.active
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Console System Info Box */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-4 font-mono text-[11px] text-zinc-400 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-zinc-500 pb-1 border-b border-zinc-800">
              <span>STATUS SISTEM</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            <div className="space-y-1 text-zinc-300">
              <div>Framework: Next.js App Router</div>
              <div>Database: Schema Ready (Postgres)</div>
              <div>State: In-Memory / Seed Sync</div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-lg space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs ${
                    item.active
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
              >
                <Globe className="w-4 h-4" />
                <span>Lihat Web Publik</span>
              </Link>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
