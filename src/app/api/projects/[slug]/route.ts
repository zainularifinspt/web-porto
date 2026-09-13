import { NextRequest, NextResponse } from "next/server";
import { getProjects, getProjectBySlug } from "@/db";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Parameter slug tidak valid",
        },
        { status: 400 }
      );
    }

    const projects = await getProjects();
    const projectIndex = projects.findIndex((p) => p.slug === slug);

    if (projectIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: `Project dengan slug '${slug}' tidak ditemukan`,
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
  } catch (error) {
    console.error("Error fetching project detail API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal server saat mengambil detail project",
      },
      { status: 500 }
    );
  }
}
