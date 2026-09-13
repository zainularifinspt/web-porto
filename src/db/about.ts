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
  updates: Record<string, any>
): Promise<AboutProfile> {
  if (process.env.DATABASE_URL) {
    try {
      // Future: execute update query on about_profiles table
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
 * Helper to reset about content to initial mock state (useful for testing or resets).
 */
export function resetAboutContent(): void {
  currentAboutState = JSON.parse(JSON.stringify(MOCK_ABOUT));
}
