import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/db";

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
      data: projects,
      total: projects.length,
    });
  } catch (error) {
    console.error("Error fetching projects API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil daftar project",
      },
      { status: 500 }
    );
  }
}
