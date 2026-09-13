import { NextRequest, NextResponse } from "next/server";
import {
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
  ContactMessageStatus,
} from "@/db";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const VALID_STATUSES: ContactMessageStatus[] = [
  "unread",
  "read",
  "replied",
  "archived",
];

/**
 * GET /api/contact/messages/[id]
 * Read a single message by ID (for portfolio owner)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const message = await getContactMessageById(id);

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: `Pesan dengan ID '${id}' tidak ditemukan.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/contact/messages/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil rincian pesan kontak.",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact/messages/[id]
 * Update message status (e.g. mark as read/replied/archived) or add internal notes
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    const { status, notes } = body || {};

    if (status && !VALID_STATUSES.includes(status as ContactMessageStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Status '${status}' tidak valid. Pilihan status: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 422 }
      );
    }

    const updatedMessage = await updateContactMessage(id, {
      status: status as ContactMessageStatus | undefined,
      notes: typeof notes === "string" ? notes : undefined,
    });

    if (!updatedMessage) {
      return NextResponse.json(
        {
          success: false,
          error: `Pesan dengan ID '${id}' tidak ditemukan untuk diperbarui.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Pesan '${id}' berhasil diperbarui.`,
      data: updatedMessage,
    });
  } catch (error: any) {
    console.error("❌ Error in PATCH /api/contact/messages/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui status pesan.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact/messages/[id]
 * Delete a contact message
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isDeleted = await deleteContactMessage(id);

    if (!isDeleted) {
      return NextResponse.json(
        {
          success: false,
          error: `Pesan dengan ID '${id}' tidak ditemukan untuk dihapus.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Pesan '${id}' berhasil dihapus.`,
    });
  } catch (error: any) {
    console.error("❌ Error in DELETE /api/contact/messages/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menghapus pesan.",
      },
      { status: 500 }
    );
  }
}
