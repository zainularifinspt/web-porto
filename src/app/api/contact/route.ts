import { NextRequest, NextResponse } from "next/server";
import {
  createContactMessage,
  getContactMessages,
  ContactMessageCategory,
} from "@/db";

const VALID_CATEGORIES: ContactMessageCategory[] = [
  "project",
  "consultation",
  "hire",
  "general",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/contact
 * Public endpoint for submitting visitor contact messages
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
          error: "Payload request tidak valid (harus berupa JSON).",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, category, message } = body || {};

    // Validate fields
    const validationErrors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      validationErrors.name = "Nama pengirim wajib diisi.";
    } else if (name.trim().length < 2) {
      validationErrors.name = "Nama pengirim minimal 2 karakter.";
    } else if (name.trim().length > 100) {
      validationErrors.name = "Nama pengirim maksimal 100 karakter.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      validationErrors.email = "Alamat email wajib diisi.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      validationErrors.email = "Format alamat email tidak valid.";
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      validationErrors.subject = "Subjek pesan wajib diisi.";
    } else if (subject.trim().length < 3) {
      validationErrors.subject = "Subjek pesan minimal 3 karakter.";
    } else if (subject.trim().length > 200) {
      validationErrors.subject = "Subjek pesan maksimal 200 karakter.";
    }

    let sanitizedCategory: ContactMessageCategory = "general";
    if (category) {
      if (!VALID_CATEGORIES.includes(category as ContactMessageCategory)) {
        validationErrors.category = `Kategori tidak valid. Pilihan: ${VALID_CATEGORIES.join(", ")}`;
      } else {
        sanitizedCategory = category as ContactMessageCategory;
      }
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      validationErrors.message = "Isi pesan wajib diisi.";
    } else if (message.trim().length < 10) {
      validationErrors.message = "Isi pesan minimal 10 karakter.";
    } else if (message.trim().length > 5000) {
      validationErrors.message = "Isi pesan maksimal 5000 karakter.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi formulir pesan kontak gagal.",
          validationErrors,
        },
        { status: 422 }
      );
    }

    // Extract client IP and user agent headers for security & audit logging
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;

    // Persist contact message to database
    const savedMessage = await createContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      category: sanitizedCategory,
      message: message.trim(),
      ip_address: ip,
      user_agent: userAgent,
    });

    // Generate formatted ticket tracking ID
    const ticketId = `MSG-${savedMessage.id.replace(/^msg-/, "").slice(-6).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Pesan kontak Anda berhasil dikirim dan disimpan.",
        ticketId,
        data: {
          id: savedMessage.id,
          ticketId,
          name: savedMessage.name,
          email: savedMessage.email,
          subject: savedMessage.subject,
          category: savedMessage.category,
          status: savedMessage.status,
          createdAt: savedMessage.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in POST /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal server saat memproses pengiriman pesan.",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Retrieve contact messages (supports query filtering)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;

    const messages = await getContactMessages({ status, category });

    return NextResponse.json({
      success: true,
      total: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil daftar pesan kontak.",
      },
      { status: 500 }
    );
  }
}
