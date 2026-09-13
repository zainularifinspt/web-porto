import {
  ContactMessageRow,
  ContactMessageInsert,
  ContactMessageUpdate,
  ContactMessageStatus,
} from "./schema";

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
let memoryMessages: ContactMessageRow[] = [...MOCK_MESSAGES];

/**
 * Fetch all contact messages with optional filtering
 */
export async function getContactMessages(filters?: {
  status?: string;
  category?: string;
}): Promise<ContactMessageRow[]> {
  if (process.env.DATABASE_URL) {
    try {
      // Future: Query from PostgreSQL pool
      // SELECT * FROM contact_messages ORDER BY created_at DESC
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

  // Sort latest first
  return result.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Fetch a single contact message by ID
 */
export async function getContactMessageById(
  id: string
): Promise<ContactMessageRow | null> {
  const messages = await getContactMessages();
  return messages.find((m) => m.id === id) || null;
}

/**
 * Insert a new contact message
 */
export async function createContactMessage(
  data: ContactMessageInsert
): Promise<ContactMessageRow> {
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (process.env.DATABASE_URL) {
    try {
      // Future: INSERT INTO contact_messages (...) VALUES (...)
    } catch (err) {
      console.warn("Database insert failed, persisting to memory:", err);
    }
  }

  memoryMessages = [newMessage, ...memoryMessages];
  return newMessage;
}

/**
 * Update contact message status or administrative notes
 */
export async function updateContactMessage(
  id: string,
  update: ContactMessageUpdate
): Promise<ContactMessageRow | null> {
  const index = memoryMessages.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const current = memoryMessages[index];
  const updated: ContactMessageRow = {
    ...current,
    status: update.status ?? current.status,
    notes: update.notes !== undefined ? update.notes : current.notes,
    updated_at: new Date().toISOString(),
  };

  memoryMessages[index] = updated;
  return updated;
}

/**
 * Delete a contact message
 */
export async function deleteContactMessage(id: string): Promise<boolean> {
  const initialLength = memoryMessages.length;
  memoryMessages = memoryMessages.filter((m) => m.id !== id);
  return memoryMessages.length < initialLength;
}
