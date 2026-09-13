"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  RefreshCw,
  AlertCircle,
  X,
  Send,
  Check,
  Archive,
  User,
  Tag,
  Mail,
  Terminal,
  Loader2,
  Sparkles,
  Inbox,
  ArrowUpDown,
} from "lucide-react";
import ToastNotification, { ToastType } from "@/components/ToastNotification";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: "project" | "consultation" | "hire" | "general";
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  ip_address?: string | null;
  user_agent?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

interface MessageStats {
  total: number;
  unread: number;
  replied: number;
  archived: number;
  byCategory: {
    project: number;
    consultation: number;
    hire: number;
    general: number;
  };
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<MessageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Selected message for detail view
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{
    isOpen: boolean;
    type: ToastType;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  // Fetch messages from API
  const fetchMessages = useCallback(async (showRefreshingSpinner = false) => {
    if (showRefreshingSpinner) setIsRefreshing(true);
    try {
      const res = await fetch("/api/contact/messages?stats=true");
      const json = await res.json();

      if (json && json.success && Array.isArray(json.data)) {
        setMessages(json.data);
        if (json.stats) {
          setStats(json.stats);
        }
      }
    } catch (err) {
      console.error("Gagal memuat pesan:", err);
      setToast({
        isOpen: true,
        type: "error",
        title: "Gagal Memuat Pesan",
        message: "Tidak dapat terhubung ke server database pesan.",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Filter logic
  const filteredMessages = messages.filter((msg) => {
    // Search query
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matches =
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Status filter
    if (statusFilter !== "all" && msg.status !== statusFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== "all" && msg.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  // Open detail modal and mark as read if unread
  const handleOpenDetail = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setAdminNote(msg.notes || "");

    if (msg.status === "unread") {
      try {
        await fetch(`/api/contact/messages/${msg.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        });

        // Update local state
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
        );
        setSelectedMessage((prev) => (prev ? { ...prev, status: "read" } : null));

        if (stats) {
          setStats({
            ...stats,
            unread: Math.max(0, stats.unread - 1),
          });
        }
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  // Change status of a message
  const handleUpdateStatus = async (
    id: string,
    nextStatus: "unread" | "read" | "replied" | "archived"
  ) => {
    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: nextStatus } : null));
        }

        setToast({
          isOpen: true,
          type: "success",
          title: "Status Pesan Diperbarui",
          message: `Status pesan telah diubah menjadi "${nextStatus}".`,
        });

        // Refresh stats
        fetchMessages(false);
      }
    } catch (err) {
      console.error("Gagal update status:", err);
      setToast({
        isOpen: true,
        type: "error",
        title: "Gagal Memperbarui",
        message: "Terjadi kesalahan saat mengubah status pesan.",
      });
    }
  };

  // Save admin notes
  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    setIsSavingNote(true);

    try {
      const res = await fetch(`/api/contact/messages/${selectedMessage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: adminNote }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedMessage.id ? { ...m, notes: adminNote } : m
          )
        );
        setSelectedMessage((prev) => (prev ? { ...prev, notes: adminNote } : null));

        setToast({
          isOpen: true,
          type: "success",
          title: "Catatan Disimpan",
          message: "Catatan internal admin berhasil disimpan.",
        });
      }
    } catch (err) {
      console.error("Gagal menyimpan catatan:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Delete message
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pesan dari "${name}"?`)) {
      try {
        const res = await fetch(`/api/contact/messages/${id}`, {
          method: "DELETE",
        });
        const json = await res.json();

        if (json.success) {
          setMessages((prev) => prev.filter((m) => m.id !== id));
          if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage(null);
          }

          setToast({
            isOpen: true,
            type: "success",
            title: "Pesan Dihapus",
            message: `Pesan dari "${name}" berhasil dihapus.`,
          });

          fetchMessages(false);
        }
      } catch (err) {
        console.error("Gagal menghapus pesan:", err);
      }
    }
  };

  // Category badge helper
  const renderCategoryBadge = (category: string) => {
    switch (category) {
      case "project":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            🚀 Proyek Baru
          </span>
        );
      case "consultation":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            💡 Konsultasi
          </span>
        );
      case "hire":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            💼 Tawaran Tim
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            💬 Tanya / Santai
          </span>
        );
    }
  };

  // Status badge helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Belum Dibaca
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <Eye className="w-3 h-3 text-zinc-400" />
            Dibaca
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 font-medium">
            <Check className="w-3 h-3 text-blue-500" />
            Sudah Dibalas
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800">
            <Archive className="w-3 h-3 text-zinc-400" />
            Diarsipkan
          </span>
        );
      default:
        return null;
    }
  };

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const unreadCount = stats?.unread ?? messages.filter((m) => m.status === "unread").length;
  const projectCount = stats?.byCategory?.project ?? messages.filter((m) => m.category === "project").length;
  const totalCount = stats?.total ?? messages.length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          Memuat kotak masuk pesan dari database...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Toast Notification */}
      <ToastNotification
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>~ / admin / contact-inbox</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">Neon PostgreSQL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            Kotak Masuk Pesan & Kontak
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Pesan yang dikirim oleh pengunjung melalui formulir kontak (`/contact`) otomatis tersimpan di sini.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => fetchMessages(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-500" : ""}`} />
            <span>{isRefreshing ? "Menyegarkan..." : "Segarkan"}</span>
          </button>

          <Link
            href="/contact"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Form /contact</span>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pesan */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-2">
            <span>TOTAL PESAN</span>
            <Inbox className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
            {totalCount}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">
            Dari semua waktu
          </div>
        </div>

        {/* Belum Dibaca */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-2">
            <span>BELUM DIBACA</span>
            <div className="relative">
              <Mail className="w-4 h-4 text-amber-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {unreadCount}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">
            Memerlukan tanggapan Anda
          </div>
        </div>

        {/* Tawaran Proyek */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-2">
            <span>TAWARAN PROYEK</span>
            <Tag className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {projectCount}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">
            Kategori proyek baru
          </div>
        </div>

        {/* Sudah Dibalas */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-2">
            <span>SUDAH DIBALAS</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {stats?.replied ?? messages.filter((m) => m.status === "replied").length}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">
            Tindak lanjut selesai
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim, email, subjek, atau isi pesan..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {[
            { id: "all", label: "Semua" },
            { id: "unread", label: "Belum Dibaca" },
            { id: "read", label: "Dibaca" },
            { id: "replied", label: "Dibalas" },
            { id: "archived", label: "Arsip" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === tab.id
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="all">Semua Kategori</option>
            <option value="project">🚀 Proyek Baru</option>
            <option value="consultation">💡 Konsultasi</option>
            <option value="hire">💼 Tawaran Tim</option>
            <option value="general">💬 Pertanyaan Umum</option>
          </select>
        </div>
      </div>

      {/* Messages List Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto border border-zinc-200 dark:border-zinc-700">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {messages.length === 0
                  ? "Belum Ada Pesan Masuk"
                  : "Tidak Ada Pesan yang Sesuai Filter"}
              </h3>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                {messages.length === 0
                  ? "Saat pengunjung mengisi formulir 'Kirim Pesan Langsung' di halaman /contact, pesan mereka akan otomatis muncul di sini secara real-time."
                  : "Coba ubah kata kunci pencarian atau sesuaikan filter status dan kategori."}
              </p>
            </div>
            {messages.length === 0 && (
              <Link
                href="/contact"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Uji Coba Kirim Pesan di /contact</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenDetail(msg)}
                className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  msg.status === "unread"
                    ? "bg-emerald-500/5 hover:bg-emerald-500/10 dark:bg-emerald-950/15 dark:hover:bg-emerald-950/25"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                }`}
              >
                {/* Left content: Avatar, sender, subject, preview */}
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border ${
                      msg.status === "unread"
                        ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {msg.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                        {msg.name}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        &lt;{msg.email}&gt;
                      </span>
                      {renderCategoryBadge(msg.category)}
                      {renderStatusBadge(msg.status)}
                    </div>

                    <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                      {msg.subject}
                    </h4>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                </div>

                {/* Right content: Date, actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{formatDate(msg.created_at)}</span>
                  </div>

                  <div
                    className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      title="Balas via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg.id, msg.name)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {renderCategoryBadge(selectedMessage.category)}
                  {renderStatusBadge(selectedMessage.status)}
                  <span className="text-xs font-mono text-zinc-400">
                    {formatDate(selectedMessage.created_at)}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  {selectedMessage.subject}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Sender Details Card */}
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                    INFORMASI PENGIRIM
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Kirim Balasan Email</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-zinc-400">Nama: </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {selectedMessage.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Email: </span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.ip_address && (
                    <div>
                      <span className="text-zinc-400">IP Pengirim: </span>
                      <span className="text-zinc-600 dark:text-zinc-300">
                        {selectedMessage.ip_address}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  ISI PESAN LENGKAP:
                </label>
                <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  UBAH STATUS PESAN:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "unread", label: "Tandai Belum Dibaca" },
                    { id: "read", label: "Tandai Dibaca" },
                    { id: "replied", label: "Tandai Sudah Dibalas" },
                    { id: "archived", label: "Arsipkan" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(
                          selectedMessage.id,
                          st.id as "unread" | "read" | "replied" | "archived"
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                        selectedMessage.status === st.id
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                    CATATAN INTERNAL ADMIN (Hanya Anda yang dapat melihat):
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={isSavingNote}
                    className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    {isSavingNote ? "Menyimpan..." : "Simpan Catatan"}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Tambahkan catatan khusus untuk pesan ini (misal: penawaran disepakati Rp X, jadwal meeting tanggal Y)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-mono font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Pesan</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
