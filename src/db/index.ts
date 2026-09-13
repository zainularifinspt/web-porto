import { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { ProjectRow, ProjectInsert } from "./schema";

/**
 * Project repository layer providing database abstraction.
 * Falls back to mock data when database connection is not configured.
 */
export async function getProjects(): Promise<Project[]> {
  // If database connection is configured, fetch from database:
  if (process.env.DATABASE_URL) {
    try {
      // Future: connect via InsForge / PostgreSQL client
    } catch (err) {
      console.warn("Database query failed, falling back to mock projects:", err);
    }
  }

  // Return sorted projects by featured first, then sortOrder
  return [...MOCK_PROJECTS].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured ? 1 : -1;
    }
    return a.sortOrder - b.sortOrder;
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.isFeatured);
}

export * from "./about";
export * from "./schema";
