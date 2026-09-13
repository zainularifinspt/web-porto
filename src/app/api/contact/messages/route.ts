import { NextRequest, NextResponse } from "next/server";
import {
  getContactMessages,
  getContactMessageStats,
  createContactMessage,
  ContactMessageCategory,
} from "@/db";

/**
 * GET /api/contact/messages
 * Endpoint for portfolio owner to read, filter, and search incoming contact messages
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;
    const searchQuery = searchParams.get("q") || searchParams.get("search") || undefined;
    const includeStats = searchParams.get("stats") === "true";

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));

    // Retrieve filtered messages
    const allMatching = await getContactMessages({
      status,
      category,
      searchQuery,
    });

    const total = allMatching.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = allMatching.slice(startIndex, startIndex + limit);

    // Optional stats calculation
    const stats = includeStats ? await getContactMessageStats() : undefined;

    return NextResponse.json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      stats,
      data: paginated,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/contact/messages:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil daftar pesan masuk.",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact/messages
 * Public submission of visitor contact messages
 */
export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Format request body tidak valid (harus berupa JSON).",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, category, message } = body || {};

    // Validate
    const validationErrors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      validationErrors.name = "Nama pengirim wajib diisi.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      validationErrors.email = "Alamat email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      validationErrors.email = "Format alamat email tidak valid.";
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      validationErrors.subject = "Subjek pesan wajib diisi.";
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      validationErrors.message = "Isi pesan wajib diisi.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi formulir pesan gagal.",
          validationErrors,
        },
        { status: 422 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;

    const savedMessage = await createContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      category: (category as ContactMessageCategory) || "general",
      message: message.trim(),
      ip_address: ip,
      user_agent: userAgent,
    });

    const ticketId = `MSG-${savedMessage.id.replace(/^msg-/, "").slice(-6).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Pesan kontak Anda berhasil dikirim.",
        ticketId,
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in POST /api/contact/messages:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal saat menyimpan pesan.",
      },
      { status: 500 }
    );
  }
}
