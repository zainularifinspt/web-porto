import fs from "fs";
import path from "path";
import { getPool } from "./client";
import { MOCK_ABOUT } from "../data/mockAbout";
import { MOCK_CONTACT } from "../data/mockContact";
import { hashPassword } from "./auth";

/**
 * Seed runner script to initialize sample projects, about profile, contact channels, and admin credentials in PostgreSQL.
 */
export async function runSeed() {
  console.log("🌱 [Seed] Starting database seed runner...");

  const pool = getPool();
  if (!pool) {
    console.warn("⚠️  DATABASE_URL is not configured. Skipping database seeding.");
    return;
  }

  const client = await pool.connect();

  try {
    // 1. Run SQL seeds (Projects, Project Images, Technologies, Features)
    const seedsDir = path.join(process.cwd(), "src", "db", "seeds");
    if (fs.existsSync(seedsDir)) {
      const seedFiles = fs
        .readdirSync(seedsDir)
        .filter((file) => file.endsWith(".sql"))
        .sort();

      for (const file of seedFiles) {
        const filePath = path.join(seedsDir, file);
        const sql = fs.readFileSync(filePath, "utf-8");
        console.log(`⏳ Applying seed file: ${file}...`);
        try {
          await client.query("BEGIN");
          await client.query(sql);
          await client.query("COMMIT");
          console.log(`   ✓ Applied: ${file}`);
        } catch (err: any) {
          await client.query("ROLLBACK");
          console.warn(`   ⚠️  Seed ${file} notice:`, err.message);
        }
      }
    }

    // 2. Seed About Profile
    console.log("⏳ Seeding About Profile & Skills...");
    const existingAbout = await client.query("SELECT id FROM about_profiles LIMIT 1");
    if (existingAbout.rowCount === 0) {
      await client.query(
        `INSERT INTO about_profiles (
          id, name, headline, bio, photo_url, avatar_fallback, status, location, email, github_url, linkedin_url, stats
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        )`,
        [
          MOCK_ABOUT.name,
          MOCK_ABOUT.headline,
          JSON.stringify(MOCK_ABOUT.bio),
          MOCK_ABOUT.photoUrl,
          MOCK_ABOUT.avatarFallback,
          MOCK_ABOUT.status,
          MOCK_ABOUT.location,
          MOCK_ABOUT.email,
          MOCK_ABOUT.githubUrl,
          MOCK_ABOUT.linkedinUrl,
          JSON.stringify(MOCK_ABOUT.stats),
        ]
      );

      // Seed Skill Categories & Skills
      for (let i = 0; i < MOCK_ABOUT.skills.length; i++) {
        const cat = MOCK_ABOUT.skills[i];
        await client.query(
          `INSERT INTO skill_categories (id, name, icon_name, sort_order)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon_name = EXCLUDED.icon_name`,
          [cat.id, cat.name, cat.iconName, i + 1]
        );

        for (let j = 0; j < cat.skills.length; j++) {
          const s = cat.skills[j];
          await client.query(
            `INSERT INTO skills (category_id, name, level, years_of_exp, description, is_key, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [cat.id, s.name, s.level, s.yearsOfExp, s.description || null, !!s.isKey, j + 1]
          );
        }
      }

      // Seed Experiences
      for (let i = 0; i < MOCK_ABOUT.experiences.length; i++) {
        const exp = MOCK_ABOUT.experiences[i];
        await client.query(
          `INSERT INTO experiences (id, role, company, location, period, is_current, summary, contributions, technologies, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (id) DO NOTHING`,
          [
            exp.id,
            exp.role,
            exp.company,
            exp.location || null,
            exp.period,
            exp.isCurrent,
            exp.summary,
            JSON.stringify(exp.contributions),
            JSON.stringify(exp.technologies),
            i + 1,
          ]
        );
      }

      // Seed Education
      for (let i = 0; i < MOCK_ABOUT.education.length; i++) {
        const edu = MOCK_ABOUT.education[i];
        await client.query(
          `INSERT INTO education (degree, institution, year, focus, sort_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [edu.degree, edu.institution, edu.year, edu.focus, i + 1]
        );
      }
      console.log("   ✓ About Profile, Skills, Experiences & Education seeded.");
    } else {
      console.log("   ⏩ About Profile already populated.");
    }

    // 3. Seed Social Links & Contact Channels
    console.log("⏳ Seeding Social Links & Channels...");
    for (let i = 0; i < MOCK_CONTACT.socialLinks.length; i++) {
      const sl = MOCK_CONTACT.socialLinks[i];
      await client.query(
        `INSERT INTO social_links (id, platform, url, handle, icon_name, description, is_primary, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [sl.id, sl.platform, sl.url, sl.handle, sl.iconName, sl.description || null, Boolean(sl.isPrimary), i + 1]
      );
    }

    for (let i = 0; i < MOCK_CONTACT.channels.length; i++) {
      const ch = MOCK_CONTACT.channels[i];
      await client.query(
        `INSERT INTO contact_channels (id, title, description, value, action_label, action_url, icon_name, badge, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [ch.id, ch.title, ch.description || null, ch.value, ch.actionLabel, ch.actionUrl, ch.iconName, ch.badge || null, i + 1]
      );
    }
    console.log("   ✓ Social links and contact channels verified.");

    // 4. Seed Default Admin User
    console.log("⏳ Checking default admin account...");
    const existingAdmin = await client.query(
      "SELECT id FROM admin_users WHERE email = $1",
      ["admin@developer.dev"]
    );
    if (existingAdmin.rowCount === 0) {
      const { hash, salt } = hashPassword("admin123");
      await client.query(
        `INSERT INTO admin_users (email, password_hash, salt, name, role, avatar_url)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          "admin@developer.dev",
          hash,
          salt,
          MOCK_ABOUT.name,
          "owner",
          MOCK_ABOUT.photoUrl,
        ]
      );
      console.log("   ✓ Default admin account created: admin@developer.dev / admin123");
    } else {
      console.log("   ⏩ Default admin user already exists.");
    }

    console.log("\n✅ [Seed] Database seeding completed successfully.");
  } finally {
    client.release();
    if (require.main === module) {
      await pool.end();
    }
  }
}

if (require.main === module) {
  runSeed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
}
