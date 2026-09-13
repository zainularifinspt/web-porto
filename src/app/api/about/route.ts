import { NextRequest, NextResponse } from "next/server";
import { getAboutContent } from "@/db";

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
