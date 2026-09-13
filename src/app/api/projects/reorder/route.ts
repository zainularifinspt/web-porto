import { NextRequest, NextResponse } from "next/server";
import { reorderProjects, getProjects } from "@/db";

/**
 * GET /api/projects/reorder
 * Fetch all projects lightweight preview for reorder manager
 */
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({
      success: true,
      total: projects.length,
      data: projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        sortOrder: p.sortOrder,
        isFeatured: p.isFeatured,
        thumbnailUrl: p.thumbnailUrl,
        technologies: p.technologies,
      })),
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/projects/reorder:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil susunan project." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/reorder
 * Update sortOrder and featured flags for multiple projects in batch
 */
export async function PUT(request: NextRequest) {
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

    const items = Array.isArray(body) ? body : body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Daftar item susunan urutan project (items) wajib berupa array.",
        },
        { status: 422 }
      );
    }

    // Validate item structure
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.id || typeof it.id !== "string") {
        return NextResponse.json(
          {
            success: false,
            error: `Item ke-${i + 1} tidak memiliki ID yang valid.`,
          },
          { status: 422 }
        );
      }
      if (typeof it.sortOrder !== "number" || isNaN(it.sortOrder)) {
        return NextResponse.json(
          {
            success: false,
            error: `Item ke-${i + 1} (${it.id}) tidak memiliki sortOrder angka yang valid.`,
          },
          { status: 422 }
        );
      }
    }

    const updatedProjects = await reorderProjects(items);

    return NextResponse.json({
      success: true,
      message: "Urutan prioritas dan status unggulan project berhasil disimpan.",
      total: updatedProjects.length,
      data: updatedProjects,
    });
  } catch (error: any) {
    console.error("❌ Error in PUT /api/projects/reorder:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat memperbarui urutan project.",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects/reorder
 * Alias to PUT for clients that do not support PUT
 */
export async function POST(request: NextRequest) {
  return PUT(request);
}
