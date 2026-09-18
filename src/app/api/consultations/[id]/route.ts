import { NextResponse } from "next/server";
import prisma from "@/config/prismaConfig";
import { withAdmin } from "@/utils/authorizedRoute";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  return withAdmin(request, () => getConsultation(request, context));
}

export async function DELETE(request: Request, context: RouteContext) {
  return withAdmin(request, () => deleteConsultation(request, context));
}

// GET: Mengambil satu data konsultasi berdasarkan ID
async function getConsultation(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Data konsultasi tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(consultation, { status: 200 });
  } catch (error) {
    console.error("Error fetching consultation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

// DELETE: Menghapus data konsultasi berdasarkan ID
async function deleteConsultation(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    // Periksa apakah data ada sebelum dihapus
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id },
    });

    if (!existingConsultation) {
      return NextResponse.json(
        { error: "Data konsultasi tidak ditemukan" },
        { status: 404 },
      );
    }

    // Hapus data dari database
    await prisma.consultation.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Data konsultasi berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data" },
      { status: 500 },
    );
  }
}
