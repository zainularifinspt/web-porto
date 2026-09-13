import fs from "fs";
import path from "path";
import { getPool } from "./client";

/**
 * Migration runner script that executes SQL migrations against PostgreSQL (Neon).
 */
export async function runMigrations() {
  console.log("⚡ [Migration] Starting database migration runner...");

  const migrationsDir = path.join(process.cwd(), "src", "db", "migrations");
  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found at: ${migrationsDir}`);
    return;
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  console.log(`📁 Found ${files.length} migration file(s) in src/db/migrations:`);
  files.forEach((file, index) => {
    console.log(`  [${index + 1}] ${file}`);
  });

  const pool = getPool();
  if (!pool) {
    console.warn("⚠️  DATABASE_URL is not set. Skipped remote execution.");
    return;
  }

  const client = await pool.connect();
  try {
    // 1. Create migration tracker table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Fetch already applied migrations
    const appliedResult = await client.query<{ name: string }>(
      "SELECT name FROM _migrations"
    );
    const applied = new Set(appliedResult.rows.map((r) => r.name));

    // 3. Execute unapplied migrations
    for (const file of files) {
      if (applied.has(file)) {
        console.log(`  ⏩ [Already applied] ${file}`);
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const sqlContent = fs.readFileSync(filePath, "utf-8");
      console.log(`\n⏳ Executing migration: ${file}...`);

      try {
        await client.query("BEGIN");
        await client.query(sqlContent);
        await client.query(
          "INSERT INTO _migrations (name) VALUES ($1)",
          [file]
        );
        await client.query("COMMIT");
        console.log(`   ✓ Migration executed successfully: ${file}`);
      } catch (migrationErr) {
        await client.query("ROLLBACK");
        console.error(`❌ Failed migration ${file}:`, migrationErr);
        throw migrationErr;
      }
    }

    console.log("\n✅ [Migration] All database migrations verified and applied successfully.");
  } finally {
    client.release();
    if (require.main === module) {
      await pool.end();
    }
  }
}

if (require.main === module) {
  runMigrations().catch((err) => {
    console.error("❌ Migration error:", err);
    process.exit(1);
  });
}
