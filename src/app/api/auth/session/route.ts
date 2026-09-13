import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/db";

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookie or Authorization header
    const cookieToken = request.cookies.get("portfolio_session")?.value;
    const authHeader = request.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : null;

    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          error: "Tidak ada token sesi yang aktif.",
        },
        { status: 401 }
      );
    }

    const verified = await verifyAdminSession(token);

    if (!verified) {
      const response = NextResponse.json(
        {
          success: false,
          authenticated: false,
          error: "Sesi tidak valid atau telah kedaluwarsa.",
        },
        { status: 401 }
      );

      // Clean up invalid cookie
      response.cookies.delete("portfolio_session");
      return response;
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: verified.user.id,
        email: verified.user.email,
        name: verified.user.name,
        role: verified.user.role,
        lastLoginAt: verified.user.last_login_at,
      },
      session: {
        expiresAt: verified.session.expires_at,
        createdAt: verified.session.created_at,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/auth/session:", error);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error: "Gagal memverifikasi status sesi.",
      },
      { status: 500 }
    );
  }
}
