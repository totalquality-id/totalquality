import { NextResponse } from "next/server";
import prisma from "@/config/prismaConfig";

// GET: Mengambil semua data konsultasi
export async function GET() {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: {
        createdAt: "desc", // Menampilkan data terbaru di atas
      },
    });

    return NextResponse.json(consultations, { status: 200 });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 },
    );
  }
}

// POST: Membuat data konsultasi baru (dari kode sebelumnya)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nama, Email, dan Nomor Telepon wajib diisi" },
        { status: 400 },
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(
      { message: "Konsultasi berhasil diajukan", data: consultation },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
