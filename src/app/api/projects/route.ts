import { NextRequest, NextResponse } from "next/server";
import { getProjects, createProject, getProjectBySlug } from "@/db";

/**
 * GET /api/projects
 * List all projects with filtering by featured, tech tag, or search keyword
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredParam = searchParams.get("featured");
    const query = searchParams.get("q") || searchParams.get("search");
    const tech = searchParams.get("tech");

    let projects = await getProjects();

    // Filter by featured
    if (featuredParam !== null) {
      const isFeatured = featuredParam === "true" || featuredParam === "1";
      projects = projects.filter((p) => p.isFeatured === isFeatured);
    }

    // Filter by technology
    if (tech) {
      const lowerTech = tech.toLowerCase();
      projects = projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === lowerTech)
      );
    }

    // Filter by search query
    if (query) {
      const q = query.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      total: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil daftar project",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new portfolio project
 */
export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Payload request tidak valid (harus JSON)." },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      summary,
      story,
      role,
      demoUrl,
      repoUrl,
      thumbnailUrl,
      isFeatured,
      sortOrder,
      technologies,
      stats,
      images,
      challenges,
      architectureNotes,
    } = body || {};

    // Form field validation
    const validationErrors: Record<string, string> = {};

    if (!title || typeof title !== "string" || !title.trim()) {
      validationErrors.title = "Judul project wajib diisi.";
    } else if (title.trim().length < 3) {
      validationErrors.title = "Judul project minimal 3 karakter.";
    }

    if (!slug || typeof slug !== "string" || !slug.trim()) {
      validationErrors.slug = "Slug URL project wajib diisi.";
    } else {
      const existing = await getProjectBySlug(slug.trim().toLowerCase());
      if (existing) {
        validationErrors.slug = `Slug '${slug}' sudah digunakan oleh project lain.`;
      }
    }

    if (!summary || typeof summary !== "string" || !summary.trim()) {
      validationErrors.summary = "Ringkasan project wajib diisi.";
    }

    if (!story || typeof story !== "string" || !story.trim()) {
      validationErrors.story = "Cerita / latar belakang project wajib diisi.";
    }

    if (!role || typeof role !== "string" || !role.trim()) {
      validationErrors.role = "Peran pengembang wajib diisi.";
    }

    if (!thumbnailUrl || typeof thumbnailUrl !== "string" || !thumbnailUrl.trim()) {
      validationErrors.thumbnailUrl = "URL gambar sampul wajib diisi.";
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
      validationErrors.technologies = "Tambahkan minimal 1 teknologi stack.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi formulir project gagal.",
          validationErrors,
        },
        { status: 422 }
      );
    }

    // Persist to database
    const newProject = await createProject({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      story: story.trim(),
      role: role.trim(),
      demo_url: demoUrl ? demoUrl.trim() : null,
      repo_url: repoUrl ? repoUrl.trim() : null,
      thumbnail_url: thumbnailUrl.trim(),
      is_featured: Boolean(isFeatured),
      sort_order: sortOrder !== undefined ? Number(sortOrder) : undefined,
      status: stats?.status || "Live",
      stars: stats?.stars !== undefined ? Number(stats.stars) : 0,
      views: stats?.views || "1.0k",
      technologies,
      images,
      challenges,
      architecture_notes: architectureNotes,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Project "${newProject.title}" berhasil dibuat.`,
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in POST /api/projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal membuat project baru.",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}
