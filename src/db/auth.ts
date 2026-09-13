import crypto from "crypto";
import { AdminUserRow, AdminSessionRow } from "./schema";
import { dbQuery, dbQueryOne } from "./client";

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

// In-memory persistent stores for local fallback
let memoryAdminUsers: AdminUserRow[] = [DEFAULT_OWNER];
let memoryAdminSessions: AdminSessionRow[] = [];

function mapAdminUserRow(row: any): AdminUserRow {
  return {
    id: row.id,
    email: row.email,
    password_hash: row.password_hash,
    salt: row.salt,
    name: row.name,
    role: row.role,
    avatar_url: row.avatar_url,
    last_login_at: row.last_login_at ? new Date(row.last_login_at).toISOString() : null,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

function mapSessionRow(row: any): AdminSessionRow {
  return {
    id: row.id,
    user_id: row.user_id,
    token: row.token,
    ip_address: row.ip_address || null,
    user_agent: row.user_agent || null,
    expires_at: row.expires_at ? new Date(row.expires_at).toISOString() : new Date().toISOString(),
    created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
  };
}

/**
 * Find admin user by email address
 */
export async function getAdminUserByEmail(
  email: string
): Promise<AdminUserRow | null> {
  const normalized = email.toLowerCase().trim();

  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `SELECT * FROM admin_users WHERE LOWER(email) = LOWER($1) LIMIT 1`,
        [normalized]
      );
      if (row) return mapAdminUserRow(row);
    } catch (err) {
      console.warn("Database getAdminUserByEmail failed, using memory:", err);
    }
  }

  return memoryAdminUsers.find((u) => u.email.toLowerCase() === normalized) || null;
}

/**
 * Find admin user by ID
 */
export async function getAdminUserById(
  id: string
): Promise<AdminUserRow | null> {
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `SELECT * FROM admin_users WHERE id::text = $1 LIMIT 1`,
        [id]
      );
      if (row) return mapAdminUserRow(row);
    } catch (err) {
      console.warn("Database getAdminUserById failed, using memory:", err);
    }
  }

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
  // Session duration: 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `INSERT INTO admin_sessions (
          user_id, token, ip_address, user_agent, expires_at
        ) VALUES (
          $1, $2, $3, $4, $5
        ) RETURNING *`,
        [userId, token, meta?.ip || null, meta?.userAgent || null, expiresAt]
      );

      // Update user's last_login_at
      await dbQuery(
        `UPDATE admin_users SET last_login_at = NOW() WHERE id::text = $1`,
        [userId]
      );

      if (row) {
        const session = mapSessionRow(row);
        memoryAdminSessions = [session, ...memoryAdminSessions];
        return session;
      }
    } catch (err) {
      console.warn("Database createAdminSession failed, storing in memory:", err);
    }
  }

  const sessionId = `sess-${Date.now()}`;
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

  // Update user last_login_at in memory
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

  if (process.env.DATABASE_URL) {
    try {
      const sessionRow = await dbQueryOne(
        `SELECT * FROM admin_sessions WHERE token = $1 AND expires_at > NOW() LIMIT 1`,
        [token]
      );

      if (sessionRow) {
        const session = mapSessionRow(sessionRow);
        const user = await getAdminUserById(session.user_id);
        if (user) {
          return { user, session };
        }
      }
    } catch (err) {
      console.warn("Database verifyAdminSession failed, falling back to memory:", err);
    }
  }

  const session = memoryAdminSessions.find((s) => s.token === token);
  if (!session) return null;

  // Check expiration
  if (new Date(session.expires_at).getTime() < Date.now()) {
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
  if (process.env.DATABASE_URL) {
    try {
      const res = await dbQuery(
        `DELETE FROM admin_sessions WHERE token = $1 RETURNING id`,
        [token]
      );
      if (res && res.length > 0) {
        memoryAdminSessions = memoryAdminSessions.filter((s) => s.token !== token);
        return true;
      }
    } catch (err) {
      console.warn("Database revokeAdminSession failed:", err);
    }
  }

  const initialLength = memoryAdminSessions.length;
  memoryAdminSessions = memoryAdminSessions.filter((s) => s.token !== token);
  return memoryAdminSessions.length < initialLength;
}

/**
 * Clean up expired sessions periodically
 */
export function purgeExpiredSessions(): number {
  if (process.env.DATABASE_URL) {
    dbQuery(`DELETE FROM admin_sessions WHERE expires_at <= NOW()`).catch((err) =>
      console.warn("Database purgeExpiredSessions notice:", err)
    );
  }

  const now = Date.now();
  const initial = memoryAdminSessions.length;
  memoryAdminSessions = memoryAdminSessions.filter(
    (s) => new Date(s.expires_at).getTime() > now
  );
  return initial - memoryAdminSessions.length;
}
