import { NextRequest, NextResponse } from "next/server";
import { getAboutContent, updateAboutContent } from "@/db";

/**
 * GET /api/about
 * Returns About Me content (profile, stats, skills, experiences, education).
 * Supports optional ?section= query param (skills | experiences | education | profile).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section")?.toLowerCase();

    const aboutData = await getAboutContent();

    if (section) {
      if (section === "skills") {
        return NextResponse.json({
          success: true,
          section: "skills",
          data: aboutData.skills,
        });
      }

      if (section === "experiences" || section === "experience") {
        return NextResponse.json({
          success: true,
          section: "experiences",
          data: aboutData.experiences,
        });
      }

      if (section === "education") {
        return NextResponse.json({
          success: true,
          section: "education",
          data: aboutData.education,
        });
      }

      if (section === "profile" || section === "bio") {
        const { skills, experiences, education, ...profileOnly } = aboutData;
        return NextResponse.json({
          success: true,
          section: "profile",
          data: profileOnly,
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: `Bagian '${section}' tidak valid. Pilihan yang tersedia: skills, experiences, education, profile`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: aboutData,
    });
  } catch (error) {
    console.error("Error in GET /api/about:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server saat mengambil konten Tentang Saya",
      },
      { status: 500 }
    );
  }
}

/**
 * Shared logic for updating About Me content via PUT or PATCH.
 */
async function handleUpdate(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Payload request bukan JSON yang valid",
        },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Request body harus berupa objek JSON",
        },
        { status: 400 }
      );
    }

    // Validation checks
    if (body.email && typeof body.email === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          {
            success: false,
            error: "Format email tidak valid",
          },
          { status: 400 }
        );
      }
    }

    if (body.bio !== undefined && !Array.isArray(body.bio)) {
      return NextResponse.json(
        {
          success: false,
          error: "Field 'bio' harus berupa array string paragraf",
        },
        { status: 400 }
      );
    }

    if (body.stats !== undefined && (typeof body.stats !== "object" || Array.isArray(body.stats))) {
      return NextResponse.json(
        {
          success: false,
          error: "Field 'stats' harus berupa objek",
        },
        { status: 400 }
      );
    }

    const updated = await updateAboutContent(body);

    return NextResponse.json({
      success: true,
      message: "Konten Tentang Saya berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server saat memperbarui konten Tentang Saya",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/about
 * Replace/update about profile content.
 */
export async function PUT(request: NextRequest) {
  return handleUpdate(request);
}

/**
 * PATCH /api/about
 * Partially update about profile content.
 */
export async function PATCH(request: NextRequest) {
  return handleUpdate(request);
}
