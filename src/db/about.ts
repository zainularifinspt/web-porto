import { AboutProfile, SkillCategory, ExperienceItem, EducationItem } from "@/types/about";
import { MOCK_ABOUT } from "@/data/mockAbout";
import { dbQuery, dbQueryOne } from "./client";

/**
 * In-memory state holding the current about profile if database is not active.
 */
let currentAboutState: AboutProfile = JSON.parse(JSON.stringify(MOCK_ABOUT));

/**
 * Repository layer for About Me content.
 * Retrieves full about profile data including skills, experiences, and education.
 */
export async function getAboutContent(): Promise<AboutProfile> {
  if (process.env.DATABASE_URL) {
    try {
      const profileRow = await dbQueryOne(`SELECT * FROM about_profiles LIMIT 1`);
      if (profileRow) {
        // Fetch categories and skills
        const catRows = await dbQuery(`
          SELECT 
            c.id, c.name, c.icon_name,
            COALESCE((
              SELECT json_agg(json_build_object(
                'name', s.name,
                'level', s.level,
                'yearsOfExp', s.years_of_exp,
                'description', s.description,
                'isKey', s.is_key
              ) ORDER BY s.sort_order ASC)
              FROM skills s WHERE s.category_id = c.id
            ), '[]'::json) as skills
          FROM skill_categories c
          ORDER BY c.sort_order ASC
        `);

        // Fetch experiences
        const expRows = await dbQuery(`
          SELECT id, role, company, location, period, is_current, summary, contributions, technologies
          FROM experiences
          ORDER BY sort_order ASC
        `);

        // Fetch education
        const eduRows = await dbQuery(`
          SELECT id, degree, institution, year, focus
          FROM education
          ORDER BY sort_order ASC
        `);

        const formattedSkills: SkillCategory[] = catRows.map((c) => ({
          id: c.id,
          name: c.name,
          iconName: c.icon_name,
          skills: Array.isArray(c.skills) ? c.skills : [],
        }));

        const formattedExperiences: ExperienceItem[] = expRows.map((e) => ({
          id: e.id,
          role: e.role,
          company: e.company,
          location: e.location || undefined,
          period: e.period,
          isCurrent: Boolean(e.is_current),
          summary: e.summary,
          contributions: Array.isArray(e.contributions) ? e.contributions : typeof e.contributions === "string" ? JSON.parse(e.contributions) : [],
          technologies: Array.isArray(e.technologies) ? e.technologies : typeof e.technologies === "string" ? JSON.parse(e.technologies) : [],
        }));

        const formattedEducation: EducationItem[] = eduRows.map((ed) => ({
          id: ed.id,
          degree: ed.degree,
          institution: ed.institution,
          year: ed.year,
          focus: ed.focus,
        }));

        const bio = Array.isArray(profileRow.bio)
          ? profileRow.bio
          : typeof profileRow.bio === "string"
          ? JSON.parse(profileRow.bio)
          : currentAboutState.bio;

        const stats = typeof profileRow.stats === "object"
          ? profileRow.stats
          : typeof profileRow.stats === "string"
          ? JSON.parse(profileRow.stats)
          : currentAboutState.stats;

        const loadedProfile: AboutProfile = {
          name: profileRow.name,
          headline: profileRow.headline,
          bio,
          photoUrl: profileRow.photo_url,
          avatarFallback: profileRow.avatar_fallback,
          status: profileRow.status,
          location: profileRow.location,
          email: profileRow.email,
          githubUrl: profileRow.github_url,
          linkedinUrl: profileRow.linkedin_url,
          stats,
          skills: formattedSkills.length > 0 ? formattedSkills : currentAboutState.skills,
          experiences: formattedExperiences.length > 0 ? formattedExperiences : currentAboutState.experiences,
          education: formattedEducation.length > 0 ? formattedEducation : currentAboutState.education,
        };

        currentAboutState = loadedProfile;
        return loadedProfile;
      }
    } catch (err) {
      console.warn("Database query failed for about content, falling back to cached/mock data:", err);
    }
  }

  return currentAboutState;
}

/**
 * Updates About Me profile fields.
 */
export async function updateAboutContent(
  updates: Record<string, any>
): Promise<AboutProfile> {
  if (process.env.DATABASE_URL) {
    try {
      const existing = await dbQueryOne(`SELECT id FROM about_profiles LIMIT 1`);
      if (existing) {
        await dbQuery(
          `UPDATE about_profiles SET
            name = COALESCE($1, name),
            headline = COALESCE($2, headline),
            bio = COALESCE($3, bio),
            photo_url = COALESCE($4, photo_url),
            avatar_fallback = COALESCE($5, avatar_fallback),
            status = COALESCE($6, status),
            location = COALESCE($7, location),
            email = COALESCE($8, email),
            github_url = COALESCE($9, github_url),
            linkedin_url = COALESCE($10, linkedin_url),
            stats = COALESCE($11, stats),
            updated_at = NOW()
          WHERE id = $12`,
          [
            updates.name ?? null,
            updates.headline ?? null,
            updates.bio ? JSON.stringify(updates.bio) : null,
            updates.photoUrl ?? updates.photo_url ?? null,
            updates.avatarFallback ?? updates.avatar_fallback ?? null,
            updates.status ?? null,
            updates.location ?? null,
            updates.email ?? null,
            updates.githubUrl ?? updates.github_url ?? null,
            updates.linkedinUrl ?? updates.linkedin_url ?? null,
            updates.stats ? JSON.stringify(updates.stats) : null,
            existing.id,
          ]
        );
      } else {
        await dbQuery(
          `INSERT INTO about_profiles (
            name, headline, bio, photo_url, avatar_fallback, status, location, email, github_url, linkedin_url, stats
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            updates.name || "M. Zainul Arifin",
            updates.headline || "Full-Stack Software Engineer & Web Architect",
            JSON.stringify(updates.bio || []),
            updates.photoUrl || updates.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            updates.avatarFallback || updates.avatar_fallback || "ZA",
            updates.status || "Open for Work",
            updates.location || "Indonesia",
            updates.email || "zainul@developer.dev",
            updates.githubUrl || updates.github_url || "https://github.com",
            updates.linkedinUrl || updates.linkedin_url || "https://linkedin.com",
            JSON.stringify(updates.stats || {}),
          ]
        );
      }
      return await getAboutContent();
    } catch (err) {
      console.warn("Database update failed for about content, updating in-memory:", err);
    }
  }

  // Deep clone and merge updates with support for both snake_case and camelCase
  currentAboutState = {
    ...currentAboutState,
    name: updates.name ?? currentAboutState.name,
    headline: updates.headline ?? currentAboutState.headline,
    bio: Array.isArray(updates.bio) ? updates.bio : currentAboutState.bio,
    photoUrl: updates.photoUrl ?? updates.photo_url ?? currentAboutState.photoUrl,
    avatarFallback: updates.avatarFallback ?? updates.avatar_fallback ?? currentAboutState.avatarFallback,
    status: updates.status ?? currentAboutState.status,
    location: updates.location ?? currentAboutState.location,
    email: updates.email ?? currentAboutState.email,
    githubUrl: updates.githubUrl ?? updates.github_url ?? currentAboutState.githubUrl,
    linkedinUrl: updates.linkedinUrl ?? updates.linkedin_url ?? currentAboutState.linkedinUrl,
    stats: {
      ...currentAboutState.stats,
      ...(updates.stats || {}),
    },
    skills: Array.isArray(updates.skills) ? updates.skills : currentAboutState.skills,
    experiences: Array.isArray(updates.experiences) ? updates.experiences : currentAboutState.experiences,
    education: Array.isArray(updates.education) ? updates.education : currentAboutState.education,
  };

  return currentAboutState;
}

/**
 * Helper to reset about content to initial mock state.
 */
export function resetAboutContent(): void {
  currentAboutState = JSON.parse(JSON.stringify(MOCK_ABOUT));
}
