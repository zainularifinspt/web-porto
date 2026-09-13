import { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { ProjectInsert } from "./schema";
import { dbQuery, dbQueryOne } from "./client";

// In-memory persistent state for local development & runtime fallback
let memoryProjects: Project[] = [...MOCK_PROJECTS];

function mapProjectRow(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    story: row.story,
    role: row.role,
    demoUrl: row.demo_url || undefined,
    repoUrl: row.repo_url || undefined,
    thumbnailUrl: row.thumbnail_url,
    isFeatured: Boolean(row.is_featured),
    sortOrder: Number(row.sort_order || 0),
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : undefined,
    stats: {
      status: row.status || "Live",
      stars: Number(row.stars ?? 0),
      views: row.views || "1.0k",
    },
    challenges: row.challenges || undefined,
    architectureNotes: row.architecture_notes || undefined,
  };
}

const PROJECT_SELECT_SQL = `
  SELECT 
    p.id, p.title, p.slug, p.summary, p.story, p.role, 
    p.demo_url, p.repo_url, p.thumbnail_url, p.is_featured, p.sort_order,
    p.stars, p.status, p.views, p.architecture_notes, p.challenges, p.created_at, p.updated_at,
    COALESCE(
      (SELECT json_agg(json_build_object(
        'id', pi.id,
        'projectId', pi.project_id,
        'imageUrl', pi.image_url,
        'caption', pi.caption,
        'sortOrder', pi.sort_order
      ) ORDER BY pi.sort_order ASC)
      FROM project_images pi WHERE pi.project_id = p.id),
      '[]'::json
    ) as images,
    COALESCE(
      (SELECT json_agg(t.name ORDER BY t.name ASC)
       FROM project_technologies pt
       JOIN technologies t ON pt.technology_id = t.id
       WHERE pt.project_id = p.id),
      '[]'::json
    ) as technologies,
    COALESCE(
      (SELECT json_agg(json_build_object(
        'id', pf.id,
        'title', pf.title,
        'description', pf.description,
        'sortOrder', pf.sort_order
      ) ORDER BY pf.sort_order ASC)
      FROM project_features pf WHERE pf.project_id = p.id),
      '[]'::json
    ) as features
  FROM projects p
`;

/**
 * Fetch all projects, optionally filtered by featured status or search query
 */
export async function getProjects(options?: {
  featuredOnly?: boolean;
  search?: string;
}): Promise<Project[]> {
  if (process.env.DATABASE_URL) {
    try {
      let sql = `${PROJECT_SELECT_SQL} ORDER BY p.is_featured DESC, p.sort_order ASC, p.created_at DESC`;
      const rows = await dbQuery(sql);
      let list = rows.map(mapProjectRow);

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

      return list;
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
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `${PROJECT_SELECT_SQL} WHERE p.id::text = $1 OR LOWER(p.slug) = LOWER($1) LIMIT 1`,
        [id]
      );
      return row ? mapProjectRow(row) : null;
    } catch (err) {
      console.warn("Database getProjectById failed, falling back to memory:", err);
    }
  }

  const projects = await getProjects();
  return (
    projects.find((p) => p.id === id || p.slug.toLowerCase() === id.toLowerCase()) ||
    null
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProjectById(slug);
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
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `INSERT INTO projects (
          title, slug, summary, story, role, demo_url, repo_url, thumbnail_url,
          is_featured, sort_order, stars, status, views, architecture_notes, challenges
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        ) RETURNING id`,
        [
          data.title.trim(),
          data.slug.trim().toLowerCase(),
          data.summary.trim(),
          data.story.trim(),
          data.role.trim(),
          data.demo_url || null,
          data.repo_url || null,
          data.thumbnail_url.trim(),
          Boolean(data.is_featured),
          data.sort_order ?? 999,
          data.stars ?? 0,
          data.status || "Live",
          data.views || "1.0k",
          data.architecture_notes || null,
          data.challenges || null,
        ]
      );

      if (row && row.id) {
        const projectId = row.id;

        // Insert technologies
        if (data.technologies && data.technologies.length > 0) {
          for (const techName of data.technologies) {
            const techRow = await dbQueryOne(
              `INSERT INTO technologies (name) VALUES ($1)
               ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id`,
              [techName.trim()]
            );
            if (techRow?.id) {
              await dbQuery(
                `INSERT INTO project_technologies (project_id, technology_id)
                 VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                [projectId, techRow.id]
              );
            }
          }
        }

        // Insert images
        if (data.images && data.images.length > 0) {
          for (let i = 0; i < data.images.length; i++) {
            const img = data.images[i];
            const url = typeof img === "string" ? img : img.imageUrl;
            const caption = typeof img === "string" ? null : img.caption || null;
            const sortOrder = typeof img === "string" ? i + 1 : img.sortOrder ?? i + 1;
            await dbQuery(
              `INSERT INTO project_images (project_id, image_url, caption, sort_order)
               VALUES ($1, $2, $3, $4)`,
              [projectId, url, caption, sortOrder]
            );
          }
        }

        const fresh = await getProjectById(projectId);
        if (fresh) {
          memoryProjects = [fresh, ...memoryProjects];
          return fresh;
        }
      }
    } catch (err) {
      console.warn("Database insert failed, falling back to memory:", err);
    }
  }

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
  if (process.env.DATABASE_URL) {
    try {
      await dbQuery(
        `UPDATE projects SET
          title = COALESCE($1, title),
          slug = COALESCE($2, slug),
          summary = COALESCE($3, summary),
          story = COALESCE($4, story),
          role = COALESCE($5, role),
          demo_url = COALESCE($6, demo_url),
          repo_url = COALESCE($7, repo_url),
          thumbnail_url = COALESCE($8, thumbnail_url),
          is_featured = COALESCE($9, is_featured),
          sort_order = COALESCE($10, sort_order),
          stars = COALESCE($11, stars),
          status = COALESCE($12, status),
          views = COALESCE($13, views),
          architecture_notes = COALESCE($14, architecture_notes),
          challenges = COALESCE($15, challenges),
          updated_at = NOW()
        WHERE id::text = $16 OR LOWER(slug) = LOWER($16)`,
        [
          updates.title ?? null,
          updates.slug ? updates.slug.toLowerCase().trim() : null,
          updates.summary ?? null,
          updates.story ?? null,
          updates.role ?? null,
          updates.demoUrl ?? null,
          updates.repoUrl ?? null,
          updates.thumbnailUrl ?? null,
          updates.isFeatured !== undefined ? updates.isFeatured : null,
          updates.sortOrder ?? null,
          updates.stats?.stars ?? null,
          updates.stats?.status ?? null,
          updates.stats?.views ?? null,
          updates.architectureNotes ?? null,
          updates.challenges ?? null,
          id,
        ]
      );

      const fresh = await getProjectById(id);
      if (fresh) {
        const idx = memoryProjects.findIndex((p) => p.id === fresh.id);
        if (idx !== -1) memoryProjects[idx] = fresh;
        return fresh;
      }
    } catch (err) {
      console.warn("Database update failed, updating memory:", err);
    }
  }

  const index = memoryProjects.findIndex(
    (p) => p.id === id || p.slug.toLowerCase() === id.toLowerCase()
  );
  if (index === -1) return null;

  const current = memoryProjects[index];
  const updated: Project = {
    ...current,
    ...updates,
    id: current.id,
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
  if (process.env.DATABASE_URL) {
    try {
      const res = await dbQuery(
        `DELETE FROM projects WHERE id::text = $1 OR LOWER(slug) = LOWER($1) RETURNING id`,
        [id]
      );
      if (res && res.length > 0) {
        memoryProjects = memoryProjects.filter(
          (p) => p.id !== id && p.slug.toLowerCase() !== id.toLowerCase()
        );
        return true;
      }
    } catch (err) {
      console.warn("Database delete failed, deleting from memory:", err);
    }
  }

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
  if (process.env.DATABASE_URL) {
    try {
      for (const item of items) {
        await dbQuery(
          `UPDATE projects SET 
            sort_order = $1,
            is_featured = COALESCE($2, is_featured),
            updated_at = NOW()
          WHERE id::text = $3 OR LOWER(slug) = LOWER($3)`,
          [item.sortOrder, item.isFeatured !== undefined ? item.isFeatured : null, item.id]
        );
      }
    } catch (err) {
      console.warn("Database reorder failed, falling back to memory:", err);
    }
  }

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
