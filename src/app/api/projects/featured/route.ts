import { NextRequest, NextResponse } from "next/server";
import { toggleProjectFeatured, updateProject, getProjectById } from "@/db";

/**
 * PATCH /api/projects/featured
 * Toggle or set featured flag for a specific project
 */
export async function PATCH(request: NextRequest) {
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

    const { id, isFeatured } = body || {};

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "ID project wajib disertakan." },
        { status: 422 }
      );
    }

    let updated;
    if (typeof isFeatured === "boolean") {
      updated = await updateProject(id, { isFeatured });
    } else {
      updated = await toggleProjectFeatured(id);
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Project dengan ID '${id}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status unggulan project "${updated.title}" berhasil diubah menjadi ${
        updated.isFeatured ? "Aktif" : "Non-Aktif"
      }.`,
      data: updated,
    });
  } catch (error: any) {
    console.error("❌ Error in PATCH /api/projects/featured:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status unggulan project." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return PATCH(request);
}
