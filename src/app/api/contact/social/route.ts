import { NextRequest, NextResponse } from "next/server";
import {
  getSocialLinks,
  getContactChannels,
  getContactConfig,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "@/db";

/**
 * GET /api/contact/social
 * Retrieve configured social media links and contact channels
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode"); // "links" | "channels" | "full"

    if (mode === "channels") {
      const channels = await getContactChannels();
      return NextResponse.json({ success: true, data: channels });
    }

    if (mode === "full") {
      const fullConfig = await getContactConfig();
      return NextResponse.json({ success: true, data: fullConfig });
    }

    const socialLinks = await getSocialLinks();
    return NextResponse.json({
      success: true,
      total: socialLinks.length,
      data: socialLinks,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/contact/social:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil konfigurasi tautan sosial media.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact/social
 * Add or register a new social media link
 */
export async function POST(request: NextRequest) {
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

    const { platform, url, handle, iconName, description, isPrimary } = body || {};

    if (!platform || !url || !handle) {
      return NextResponse.json(
        {
          success: false,
          error: "Kolom platform, url, dan handle wajib diisi.",
        },
        { status: 422 }
      );
    }

    const newLink = await createSocialLink({
      platform,
      url,
      handle,
      iconName: iconName || "Globe",
      description: description || "",
      isPrimary: Boolean(isPrimary),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Tautan sosial media '${platform}' berhasil ditambahkan.`,
        data: newLink,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in POST /api/contact/social:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menyimpan tautan sosial media baru.",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact/social
 * Update an existing social media link configuration
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

    const { id, ...updates } = body || {};

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID tautan sosial media wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await updateSocialLink(id, updates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Tautan sosial media '${id}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Tautan sosial media '${id}' berhasil diperbarui.`,
      data: updated,
    });
  } catch (error: any) {
    console.error("❌ Error in PATCH /api/contact/social:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui tautan sosial media.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact/social
 * Delete social media link by query parameter ?id=
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Parameter ID wajib disertakan (?id=...)." },
        { status: 400 }
      );
    }

    const deleted = await deleteSocialLink(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Tautan sosial media '${id}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Tautan sosial media '${id}' berhasil dihapus.`,
    });
  } catch (error: any) {
    console.error("❌ Error in DELETE /api/contact/social:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menghapus tautan sosial media.",
      },
      { status: 500 }
    );
  }
}
