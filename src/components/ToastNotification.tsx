"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Sparkles,
} from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  type?: ToastType;
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // duration in ms, defaults to 4000
  actionLabel?: string;
  onAction?: () => void;
}

export default function ToastNotification({
  type = "info",
  title,
  message,
  isOpen,
  onClose,
  duration = 4000,
  actionLabel,
  onAction,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const styleConfig = {
    success: {
      bg: "bg-emerald-950/90 dark:bg-emerald-950/95 border-emerald-500/30 text-emerald-100",
      accent: "bg-emerald-500",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      tag: "SUCCESS // 200",
      tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    error: {
      bg: "bg-rose-950/90 dark:bg-rose-950/95 border-rose-500/30 text-rose-100",
      accent: "bg-rose-500",
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
      tag: "ERROR // 422",
      tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    warning: {
      bg: "bg-amber-950/90 dark:bg-amber-950/95 border-amber-500/30 text-amber-100",
      accent: "bg-amber-500",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      tag: "WARNING // CHECK",
      tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    info: {
      bg: "bg-cyan-950/90 dark:bg-cyan-950/95 border-cyan-500/30 text-cyan-100",
      accent: "bg-cyan-500",
      icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
      tag: "SYSTEM // INFO",
      tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 sm:px-0 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl p-4 sm:p-5 ${styleConfig.bg}`}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className={`h-full transition-all duration-75 ${styleConfig.accent}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-start gap-3.5 pt-1">
          <div className="mt-0.5">{styleConfig.icon}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${styleConfig.tagColor}`}
              >
                {styleConfig.tag}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>

            <h4 className="text-sm font-mono font-bold tracking-tight">
              {title}
            </h4>

            {message && (
              <p className="text-xs font-sans text-zinc-300/90 mt-1 leading-relaxed">
                {message}
              </p>
            )}

            {actionLabel && onAction && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    onAction();
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{actionLabel}</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
