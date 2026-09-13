import { AboutProfile, SkillCategory, ExperienceItem, EducationItem } from "@/types/about";
import { MOCK_ABOUT } from "@/data/mockAbout";
import { AboutProfileUpdate } from "./schema";

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
      // Future: connect via InsForge / PostgreSQL client
      // e.g. query about_profiles join skills, experiences, education
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
  updates: Partial<AboutProfile> | AboutProfileUpdate
): Promise<AboutProfile> {
  if (process.env.DATABASE_URL) {
    try {
      // Future: execute update query on about_profiles table
    } catch (err) {
      console.warn("Database update failed for about content, updating in-memory:", err);
    }
  }

  // Deep clone and merge updates
  currentAboutState = {
    ...currentAboutState,
    ...updates,
    stats: {
      ...currentAboutState.stats,
      ...(updates.stats || {}),
    },
    bio: updates.bio || currentAboutState.bio,
    skills: (updates as any).skills || currentAboutState.skills,
    experiences: (updates as any).experiences || currentAboutState.experiences,
    education: (updates as any).education || currentAboutState.education,
  };

  return currentAboutState;
}

/**
 * Helper to reset about content to initial mock state (useful for testing or resets).
 */
export function resetAboutContent(): void {
  currentAboutState = JSON.parse(JSON.stringify(MOCK_ABOUT));
}
