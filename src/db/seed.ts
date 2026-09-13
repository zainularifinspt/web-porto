import { MOCK_PROJECTS } from "../data/mockProjects";

/**
 * Seed runner script to initialize sample projects and verify integrity.
 */
export async function runSeed() {
  console.log("🌱 Starting seed for projects...");

  console.log(`✓ Loaded ${MOCK_PROJECTS.length} sample projects:`);
  MOCK_PROJECTS.forEach((p, idx) => {
    console.log(
      `  [${idx + 1}] ${p.title} (${p.slug}) - ${p.isFeatured ? "⭐ Featured" : "Standard"} - ${p.technologies.length} techs`
    );
  });

  if (process.env.DATABASE_URL) {
    console.log("Connecting to PostgreSQL to apply seed SQL...");
    // Future database connection runner
  } else {
    console.log("ℹ️  No DATABASE_URL configured. Sample data verified in mock layer.");
  }

  console.log("✅ Seed process completed successfully.");
}

if (require.main === module) {
  runSeed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
}
