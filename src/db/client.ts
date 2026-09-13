import fs from "fs";
import path from "path";
import { Pool, QueryResultRow } from "pg";

// Ensure .env.local is loaded if running via CLI scripts outside next dev/build
if (!process.env.DATABASE_URL) {
  try {
    const envLocalPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...rest] = trimmed.split("=");
          const val = rest.join("=").replace(/^["']|["']$/g, "").trim();
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {
    // Ignore if running in environment where fs is restricted
  }
}

declare global {
  // Prevent multiple pool instances during Next.js hot-reloads in development
  var _pgPool: Pool | undefined;
}

/**
 * Clean connection string if needed (removes unsupported channel_binding if present in URL query)
 */
function getConnectionString(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  return raw.replace(/&?channel_binding=[^&]+/g, "").replace(/\?$/, "");
}

/**
 * Get or initialize the PostgreSQL connection pool
 */
export function getPool(): Pool | null {
  const connectionString = getConnectionString();
  if (!connectionString) {
    return null;
  }

  if (process.env.NODE_ENV === "production") {
    return new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return global._pgPool;
}

/**
 * Execute a parameterized query against PostgreSQL.
 * Returns an array of typed rows or null if no DATABASE_URL is configured.
 */
export async function dbQuery<T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<T[]> {
  const pool = getPool();
  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const res = await pool.query<T>(text, params);
  return res.rows;
}

/**
 * Execute a single query and return the first row (or null)
 */
export async function dbQueryOne<T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<T | null> {
  const rows = await dbQuery<T>(text, params);
  return rows[0] || null;
}
