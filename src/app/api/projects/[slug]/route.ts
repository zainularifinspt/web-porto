import { NextRequest, NextResponse } from "next/server";
import {
  getProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "@/db";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/projects/[slug]
 * Get project details by slug or ID with previous & next navigation
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Parameter slug tidak valid.",
        },
        { status: 400 }
      );
    }

    const projects = await getProjects();
    const projectIndex = projects.findIndex(
      (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
    );

    if (projectIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: `Project '${slug}' tidak ditemukan.`,
        },
        { status: 404 }
      );
    }

    const project = projects[projectIndex];
    const prevProject =
      projectIndex > 0
        ? {
            slug: projects[projectIndex - 1].slug,
            title: projects[projectIndex - 1].title,
          }
        : null;

    const nextProject =
      projectIndex < projects.length - 1
        ? {
            slug: projects[projectIndex + 1].slug,
            title: projects[projectIndex + 1].title,
          }
        : null;

    return NextResponse.json({
      success: true,
      data: project,
      navigation: {
        prev: prevProject,
        next: nextProject,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/projects/[slug]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil data detail project.",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/[slug]
 * Update an existing project
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Payload request tidak valid (harus JSON)." },
        { status: 400 }
      );
    }

    const existing =
      (await getProjectBySlug(slug)) || (await getProjectById(slug));

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: `Project '${slug}' tidak ditemukan untuk diperbarui.`,
        },
        { status: 404 }
      );
    }

    const updated = await updateProject(existing.id, body);

    return NextResponse.json({
      success: true,
      message: `Project "${updated?.title || existing.title}" berhasil diperbarui.`,
      data: updated,
    });
  } catch (error: any) {
    console.error("❌ Error in PATCH /api/projects/[slug]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui data project.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[slug]
 * Delete project from database
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const existing =
      (await getProjectBySlug(slug)) || (await getProjectById(slug));

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: `Project '${slug}' tidak ditemukan untuk dihapus.`,
        },
        { status: 404 }
      );
    }

    const isDeleted = await deleteProject(existing.id);

    if (!isDeleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Gagal menghapus project dari database.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Project "${existing.title}" berhasil dihapus.`,
    });
  } catch (error: any) {
    console.error("❌ Error in DELETE /api/projects/[slug]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memproses penghapusan project.",
      },
      { status: 500 }
    );
  }
}
