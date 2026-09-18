// src\app\api\consultations\route.ts

import { NextResponse } from "next/server";
import prisma from "@/config/prismaConfig";
import { withAdmin } from "@/utils/authorizedRoute";
import { enforceRateLimit, getClientIp } from "@/utils/rateLimit";
import { ApiError } from "@/utils/apiResponse";

export async function GET(request: Request) {
  return withAdmin(request, getConsultations);
}

// GET: Mengambil semua data konsultasi
async function getConsultations() {
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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Nomor Indonesia: boleh diawali +62 / 62 / 0, lalu 8-13 digit.
const PHONE_PATTERN = /^(?:\+?62|0)8[1-9][0-9]{6,11}$/;

export async function POST(req: Request) {
  try {
    // Form konsultasi terbuka untuk publik, jadi batasi agar tidak jadi
    // saluran spam ke inbox tim sales.
    enforceRateLimit(`consultation:${getClientIp(req)}`, {
      limit: 3,
      windowMs: 60 * 60 * 1000,
      message:
        "Permintaan konsultasi sudah dikirim. Silakan coba lagi dalam satu jam.",
    });

    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nama, Email, dan Nomor Telepon wajib diisi" },
        { status: 400 },
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string"
    ) {
      return NextResponse.json(
        { error: "Nama, Email, dan Nomor Telepon harus berupa teks" },
        { status: 400 },
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s()-]/g, "");

    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: "Nama harus antara 2 sampai 100 karakter" },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 },
      );
    }

    if (!PHONE_PATTERN.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Format nomor telepon tidak valid" },
        { status: 400 },
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
      },
    });

    return NextResponse.json(
      { message: "Konsultasi berhasil diajukan", data: consultation },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
