import { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { ProjectInsert } from "./schema";

// In-memory persistent state for local development & runtime fallback
let memoryProjects: Project[] = [...MOCK_PROJECTS];

/**
 * Fetch all projects, optionally filtered by featured status or search query
 */
export async function getProjects(options?: {
  featuredOnly?: boolean;
  search?: string;
}): Promise<Project[]> {
  if (process.env.DATABASE_URL) {
    try {
      // Future: Query from PostgreSQL connection pool
      // SELECT * FROM projects ...
    } catch (err) {
      console.warn("Database query failed, falling back to memory:", err);
    }
  }

  let list = [...memoryProjects];

  if (options?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
  }

  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort by featured first, then sortOrder
  return list.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured ? 1 : -1;
    }
    return a.sortOrder - b.sortOrder;
  });
}

/**
 * Fetch project by ID or Slug
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return (
    projects.find((p) => p.id === id || p.slug.toLowerCase() === id.toLowerCase()) ||
    null
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return (
    projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return getProjects({ featuredOnly: true });
}

/**
 * Create a new project in the catalog
 */
export async function createProject(
  data: ProjectInsert & {
    technologies?: string[];
    images?: (string | { id?: string; imageUrl: string; caption?: string; sortOrder?: number })[];
  }
): Promise<Project> {
  const newId = `proj-${Date.now()}`;
  const now = new Date().toISOString();

  const formattedImages = data.images
    ? data.images.map((img, i) => ({
        id: typeof img === "string" ? `img-${newId}-${i}` : img.id || `img-${newId}-${i}`,
        projectId: newId,
        imageUrl: typeof img === "string" ? img : img.imageUrl,
        caption: typeof img === "string" ? undefined : img.caption,
        sortOrder: typeof img === "string" ? i + 1 : img.sortOrder ?? i + 1,
      }))
    : undefined;

  const newProject: Project = {
    id: newId,
    title: data.title.trim(),
    slug: data.slug.trim().toLowerCase(),
    summary: data.summary.trim(),
    story: data.story.trim(),
    role: data.role.trim(),
    demoUrl: data.demo_url || undefined,
    repoUrl: data.repo_url || undefined,
    thumbnailUrl: data.thumbnail_url.trim(),
    isFeatured: Boolean(data.is_featured),
    sortOrder: data.sort_order ?? memoryProjects.length + 1,
    createdAt: now,
    technologies: data.technologies || ["Next.js", "TypeScript"],
    images: formattedImages,
    stats: {
      status: (data.status as any) || "Live",
      stars: data.stars ?? 0,
      views: data.views || "1.0k",
    },
    challenges: data.challenges || undefined,
    architectureNotes: data.architecture_notes || undefined,
  };

  if (process.env.DATABASE_URL) {
    try {
      // Future: INSERT INTO projects (...) VALUES (...)
    } catch (err) {
      console.warn("Database insert failed, using memory:", err);
    }
  }

  memoryProjects = [newProject, ...memoryProjects];
  return newProject;
}

/**
 * Update an existing project
 */
export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  const index = memoryProjects.findIndex(
    (p) => p.id === id || p.slug.toLowerCase() === id.toLowerCase()
  );

  if (index === -1) return null;

  const current = memoryProjects[index];
  const updated: Project = {
    ...current,
    ...updates,
    id: current.id, // preserve immutable ID
    stats: {
      ...current.stats,
      ...updates.stats,
    },
  };

  memoryProjects[index] = updated;
  return updated;
}

/**
 * Delete a project by ID
 */
export async function deleteProject(id: string): Promise<boolean> {
  const initialLength = memoryProjects.length;
  memoryProjects = memoryProjects.filter(
    (p) => p.id !== id && p.slug.toLowerCase() !== id.toLowerCase()
  );
  return memoryProjects.length < initialLength;
}

/**
 * Reorder projects and update featured status
 */
export async function reorderProjects(
  items: { id: string; sortOrder: number; isFeatured?: boolean }[]
): Promise<Project[]> {
  const itemMap = new Map(items.map((it) => [it.id, it]));

  memoryProjects = memoryProjects.map((p) => {
    const update = itemMap.get(p.id);
    if (!update) return p;
    return {
      ...p,
      sortOrder: update.sortOrder,
      isFeatured: update.isFeatured !== undefined ? update.isFeatured : p.isFeatured,
    };
  });

  return getProjects();
}

/**
 * Toggle featured flag of a project
 */
export async function toggleProjectFeatured(id: string): Promise<Project | null> {
  const project = await getProjectById(id);
  if (!project) return null;

  return updateProject(project.id, {
    isFeatured: !project.isFeatured,
  });
}
