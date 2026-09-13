import {
  ContactMessageRow,
  ContactMessageInsert,
  ContactMessageUpdate,
  ContactMessageStatus,
} from "./schema";
import { dbQuery, dbQueryOne } from "./client";

/**
 * Initial sample mock messages for local preview & testing
 */
const MOCK_MESSAGES: ContactMessageRow[] = [
  {
    id: "msg-101",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@techstartup.co.id",
    subject: "Penawaran Proyek Pengembangan Dashboard Monitoring Real-Time",
    category: "project",
    message:
      "Halo! Kami sedang membangun MVP sistem analitik operasional berbasis Next.js dan Tailwind CSS. Tertarik untuk mendiskusikan peluang kerja sama freelance selama 2 bulan ke depan.",
    status: "unread",
    ip_address: "182.253.120.44",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    notes: null,
    created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: "msg-102",
    name: "Sarah Jenkins",
    email: "s.jenkins@innovate-dev.org",
    subject: "Invitation to Tech Talk & Code Architecture Sharing",
    category: "consultation",
    message:
      "Hi! We really loved your DevPulse Server Monitor open source project. Would you be open for a 45-minute virtual technical discussion with our developer circle next month?",
    status: "read",
    ip_address: "203.190.241.12",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    notes: "Sudah dibaca, perlu dibalas via email untuk konfirmasi jadwal.",
    created_at: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600 * 1000 * 20).toISOString(),
  },
  {
    id: "msg-103",
    name: "Budi Santoso",
    email: "budi@corporate-solutions.id",
    subject: "Peluang Posisi Senior Frontend Engineer",
    category: "hire",
    message:
      "Halo Mas Zainul, kami melihat portofolio Anda dan sangat terkesan dengan clean code architecture serta perhatian pada UX. Apakah Anda saat ini terbuka untuk kontrak full-time remote?",
    status: "replied",
    ip_address: "36.88.92.105",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    notes: "Sudah dibalas dengan CV dan portofolio terkini.",
    created_at: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
  },
];

// In-memory runtime cache for development
let memoryMessages: ContactMessageRow[] = [];

function mapMessageRow(row: any): ContactMessageRow {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    category: row.category,
    message: row.message,
    status: row.status,
    ip_address: row.ip_address || null,
    user_agent: row.user_agent || null,
    notes: row.notes || null,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

/**
 * Fetch all contact messages with optional filtering & search
 */
export async function getContactMessages(filters?: {
  status?: string;
  category?: string;
  searchQuery?: string;
}): Promise<ContactMessageRow[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await dbQuery(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
      if (rows) {
        let result = rows.map(mapMessageRow);

        if (filters?.status && filters.status !== "all") {
          result = result.filter((m) => m.status === filters.status);
        }

        if (filters?.category && filters.category !== "all") {
          result = result.filter((m) => m.category === filters.category);
        }

        if (filters?.searchQuery && filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          result = result.filter(
            (m) =>
              m.name.toLowerCase().includes(q) ||
              m.email.toLowerCase().includes(q) ||
              m.subject.toLowerCase().includes(q) ||
              m.message.toLowerCase().includes(q)
          );
        }

        return result;
      }
    } catch (err) {
      console.warn("Database query failed, using in-memory messages:", err);
    }
  }

  let result = [...memoryMessages];

  if (filters?.status && filters.status !== "all") {
    result = result.filter((m) => m.status === filters.status);
  }

  if (filters?.category && filters.category !== "all") {
    result = result.filter((m) => m.category === filters.category);
  }

  if (filters?.searchQuery && filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }

  return result.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Fetch single message by ID
 */
export async function getContactMessageById(
  id: string
): Promise<ContactMessageRow | null> {
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `SELECT * FROM contact_messages WHERE id::text = $1 LIMIT 1`,
        [id]
      );
      if (row) return mapMessageRow(row);
    } catch (err) {
      console.warn("Database getContactMessageById failed, checking memory:", err);
    }
  }

  const messages = await getContactMessages();
  return messages.find((m) => m.id === id) || null;
}

/**
 * Save new contact message sent by site visitor
 */
export async function createContactMessage(
  data: ContactMessageInsert
): Promise<ContactMessageRow> {
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `INSERT INTO contact_messages (
          name, email, subject, category, message, status, ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *`,
        [
          data.name.trim(),
          data.email.trim(),
          data.subject.trim(),
          data.category || "general",
          data.message.trim(),
          "unread",
          data.ip_address || null,
          data.user_agent || null,
        ]
      );
      if (row) {
        const saved = mapMessageRow(row);
        memoryMessages = [saved, ...memoryMessages];
        return saved;
      }
    } catch (err) {
      console.warn("Database createContactMessage failed, saving to memory:", err);
    }
  }

  const now = new Date().toISOString();
  const newMessage: ContactMessageRow = {
    id: `msg-${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    category: data.category || "general",
    message: data.message.trim(),
    status: "unread",
    ip_address: data.ip_address || null,
    user_agent: data.user_agent || null,
    notes: null,
    created_at: now,
    updated_at: now,
  };

  memoryMessages = [newMessage, ...memoryMessages];
  return newMessage;
}

/**
 * Update message status (e.g. read, replied, archived) or admin notes
 */
export async function updateContactMessageStatus(
  id: string,
  updates: ContactMessageUpdate
): Promise<ContactMessageRow | null> {
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `UPDATE contact_messages SET
          status = COALESCE($1, status),
          notes = COALESCE($2, notes),
          updated_at = NOW()
        WHERE id::text = $3
        RETURNING *`,
        [updates.status ?? null, updates.notes ?? null, id]
      );
      if (row) {
        const updated = mapMessageRow(row);
        const idx = memoryMessages.findIndex((m) => m.id === id);
        if (idx !== -1) memoryMessages[idx] = updated;
        return updated;
      }
    } catch (err) {
      console.warn("Database updateContactMessageStatus failed:", err);
    }
  }

  const index = memoryMessages.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const current = memoryMessages[index];
  const updated: ContactMessageRow = {
    ...current,
    status: updates.status || current.status,
    notes: updates.notes !== undefined ? updates.notes : current.notes,
    updated_at: new Date().toISOString(),
  };

  memoryMessages[index] = updated;
  return updated;
}

export const updateContactMessage = updateContactMessageStatus;

/**
 * Delete a contact message
 */
export async function deleteContactMessage(id: string): Promise<boolean> {
  if (process.env.DATABASE_URL) {
    try {
      const res = await dbQuery(
        `DELETE FROM contact_messages WHERE id::text = $1 RETURNING id`,
        [id]
      );
      if (res && res.length > 0) {
        memoryMessages = memoryMessages.filter((m) => m.id !== id);
        return true;
      }
    } catch (err) {
      console.warn("Database deleteContactMessage failed:", err);
    }
  }

  const initialLength = memoryMessages.length;
  memoryMessages = memoryMessages.filter((m) => m.id !== id);
  return memoryMessages.length < initialLength;
}

/**
 * Get summary counters for dashboard cards
 */
export async function getContactMessageStats(): Promise<{
  total: number;
  unread: number;
  read: number;
  replied: number;
  archived: number;
}> {
  const messages = await getContactMessages();
  return {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
  };
}
