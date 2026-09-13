import { NextRequest, NextResponse } from "next/server";
import { revokeAdminSession } from "@/db";

export async function POST(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get("portfolio_session")?.value;
    const authHeader = request.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : null;

    const token = cookieToken || headerToken;

    if (token) {
      await revokeAdminSession(token);
    }

    const response = NextResponse.json({
      success: true,
      message: "Sesi berhasil ditutup (logout).",
    });

    response.cookies.delete("portfolio_session");
    return response;
  } catch (error: any) {
    console.error("❌ Error in POST /api/auth/logout:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses logout." },
      { status: 500 }
    );
  }
}
