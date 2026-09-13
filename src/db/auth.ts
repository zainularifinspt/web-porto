import crypto from "crypto";
import { AdminUserRow, AdminSessionRow } from "./schema";

/**
 * Hash password using SHA-256 with cryptographic salt
 */
export function hashPassword(
  password: string,
  salt?: string
): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, generatedSalt, 1000, 64, "sha256")
    .toString("hex");
  return { hash, salt: generatedSalt };
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const computed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(computed));
}

// Seed default owner account credentials
const DEFAULT_SALT = "a4c28f9d0e123456789abcdef0123456";
const DEFAULT_HASH = crypto
  .pbkdf2Sync("admin123", DEFAULT_SALT, 1000, 64, "sha256")
  .toString("hex");

const DEFAULT_OWNER: AdminUserRow = {
  id: "user-owner-001",
  email: "admin@developer.dev",
  password_hash: DEFAULT_HASH,
  salt: DEFAULT_SALT,
  name: "M. Zainul Arifin",
  role: "owner",
  avatar_url: "/avatar.png",
  last_login_at: null,
  created_at: new Date(Date.now() - 3600 * 1000 * 24 * 30).toISOString(),
  updated_at: new Date().toISOString(),
};

// In-memory persistent stores for local development
let memoryAdminUsers: AdminUserRow[] = [DEFAULT_OWNER];
let memoryAdminSessions: AdminSessionRow[] = [];

/**
 * Find admin user by email address
 */
export async function getAdminUserByEmail(
  email: string
): Promise<AdminUserRow | null> {
  const normalized = email.toLowerCase().trim();
  return memoryAdminUsers.find((u) => u.email.toLowerCase() === normalized) || null;
}

/**
 * Find admin user by ID
 */
export async function getAdminUserById(
  id: string
): Promise<AdminUserRow | null> {
  return memoryAdminUsers.find((u) => u.id === id) || null;
}

/**
 * Create a new authenticated session token for an owner/admin user
 */
export async function createAdminSession(
  userId: string,
  meta?: { ip?: string; userAgent?: string }
): Promise<AdminSessionRow> {
  const token = `dev_sess_${crypto.randomBytes(32).toString("hex")}`;
  const sessionId = `sess-${Date.now()}`;
  // Session duration: 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  const session: AdminSessionRow = {
    id: sessionId,
    user_id: userId,
    token,
    ip_address: meta?.ip || null,
    user_agent: meta?.userAgent || null,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  };

  memoryAdminSessions = [session, ...memoryAdminSessions];

  // Update user last_login_at
  const user = memoryAdminUsers.find((u) => u.id === userId);
  if (user) {
    user.last_login_at = new Date().toISOString();
  }

  return session;
}

/**
 * Validate session token and return authenticated user
 */
export async function verifyAdminSession(
  token: string
): Promise<{ user: AdminUserRow; session: AdminSessionRow } | null> {
  if (!token) return null;

  const session = memoryAdminSessions.find((s) => s.token === token);
  if (!session) return null;

  // Check expiration
  if (new Date(session.expires_at).getTime() < Date.now()) {
    // Session expired, remove it
    memoryAdminSessions = memoryAdminSessions.filter((s) => s.token !== token);
    return null;
  }

  const user = await getAdminUserById(session.user_id);
  if (!user) return null;

  return { user, session };
}

/**
 * Revoke or logout an admin session token
 */
export async function revokeAdminSession(token: string): Promise<boolean> {
  const initialLength = memoryAdminSessions.length;
  memoryAdminSessions = memoryAdminSessions.filter((s) => s.token !== token);
  return memoryAdminSessions.length < initialLength;
}

/**
 * Clean up expired sessions periodically
 */
export function purgeExpiredSessions(): number {
  const now = Date.now();
  const initial = memoryAdminSessions.length;
  memoryAdminSessions = memoryAdminSessions.filter(
    (s) => new Date(s.expires_at).getTime() > now
  );
  return initial - memoryAdminSessions.length;
}
