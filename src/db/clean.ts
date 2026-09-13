import { getPool } from "./client";

/**
 * Clean runner script to wipe dummy projects and messages from Neon database.
 * Retains admin credentials and base tables.
 */
export async function cleanDatabase() {
  console.log("🧹 [DB Clean] Starting database cleanup...");

  const pool = getPool();
  if (!pool) {
    console.error("❌ DATABASE_URL is not set.");
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    console.log("⏳ Deleting dummy projects (cascading to features, images, project_technologies)...");
    const pRes = await client.query("DELETE FROM projects");
    console.log(`   ✓ Deleted ${pRes.rowCount} project(s).`);

    console.log("⏳ Deleting dummy contact messages...");
    const mRes = await client.query("DELETE FROM contact_messages");
    console.log(`   ✓ Deleted ${mRes.rowCount} contact message(s).`);

    await client.query("COMMIT");
    console.log("\n✅ [DB Clean] Database successfully cleaned! Ready for your real data.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Failed to clean database:", err);
    throw err;
  } finally {
    client.release();
    if (require.main === module) {
      await pool.end();
    }
  }
}

if (require.main === module) {
  cleanDatabase().catch(() => process.exit(1));
}
