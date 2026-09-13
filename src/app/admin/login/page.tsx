"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Lock,
  Mail,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Fingerprint,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock demo credentials for owner
  const DEMO_EMAIL = "admin@developer.dev";
  const DEMO_PASSWORD = "developer123";

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Alamat email wajib diisi");
      return;
    }

    if (!password) {
      setError("Kata sandi akun wajib diisi");
      return;
    }

    setIsLoading(true);
    setAuthStep("Menghubungkan ke secure auth gateway...");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setAuthStep("Memvalidasi hash signature kredensial...");
      await new Promise((resolve) => setTimeout(resolve, 250));

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsLoading(false);
        setAuthStep("");
        setError(data.error || "Autentikasi gagal. Silakan periksa kredensial.");
        return;
      }

      setAuthStep("Membuat token sesi pemilik terverifikasi...");
      await new Promise((resolve) => setTimeout(resolve, 250));

      // Save auth session info in browser storage
      try {
        localStorage.setItem("portfolio_admin_auth", "true");
        localStorage.setItem("portfolio_admin_user", data.user?.email || email);
        if (data.token) {
          localStorage.setItem("portfolio_admin_token", data.token);
        }
      } catch {
        // Storage fallback
      }

      setIsSuccess(true);
      setAuthStep("Otorisasi berhasil! Mengalihkan ke dashboard...");

      setTimeout(() => {
        router.push("/admin");
      }, 700);
    } catch {
      // Offline fallback
      setIsLoading(false);
      setAuthStep("");
      setError("Gagal terhubung ke gateway autentikasi.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      {/* Top Bar Navigation */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between font-mono text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>cd ~ / Beranda</span>
        </Link>

        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>portal: owner-restricted</span>
          </span>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Terminal Window Card */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-xl backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            {/* Terminal Top Window Dots */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-xs text-zinc-400 pl-2">
                  auth --role=owner
                </span>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Header branding */}
            <div className="space-y-2 text-center sm:text-left mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 mx-auto sm:mx-0">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                Masuk Portal Pemilik
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Akses panel kontrol untuk mengelola galeri project, urutan unggulan, dan konten portofolio.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-mono text-rose-700 dark:text-rose-400 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {isSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authStep}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Surel Pemilik <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@developer.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Kata Sandi <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-zinc-400">
                    min. 6 karakter
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isSuccess}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Helper */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    Ingat sesi ini
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Isi Demo</span>
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{authStep || "Mengotentikasi..."}</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Otorisasi Berhasil</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-4 h-4" />
                      <span>Masuk ke Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Demo Credentials Box */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>KREDENSIAL DEMO:</span>
                <span className="text-emerald-500 font-semibold">Siap Digunakan</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Email:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 select-all font-semibold">
                    {DEMO_EMAIL}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Sandi:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 select-all font-semibold">
                    {DEMO_PASSWORD}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal footer note */}
          <div className="text-center font-mono text-xs text-zinc-400 space-y-1">
            <p>~/security/session-guard v2.4 (HMAC-SHA256)</p>
            <p className="text-[11px] text-zinc-500">
              Hanya diperuntukkan bagi pemilik resmi portofolio.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-4 text-center font-mono text-xs text-zinc-400">
        <span>© {new Date().getFullYear()} Portofolio Dev Kece. All rights reserved.</span>
      </footer>
    </div>
  );
}
