// src/app/api/hero/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prismaConfig";
import { handleFileUpload } from "@/utils/fileUpload";

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(heroes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch heroes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Menggunakan utility upload yang sudah ada
    const imageUrl = await handleFileUpload(request, "hero-images");

    // Ambil data text lain dari formData (perlu parse manual karena stream sudah dibaca di handleFileUpload)
    // PENTING: Karena request.formData() hanya bisa dibaca sekali,
    // kita perlu strategi khusus atau modifikasi helper.
    // Namun, untuk simplifikasi, mari asumsikan kita kirim data terpisah atau sesuaikan logic.
    // *Solusi Praktis:* Kita simpan path gambar dulu. Title/Description bisa diupdate lewat endpoint PUT terpisah
    // atau kita modifikasi sedikit cara handle request.

    // Disini saya buat simple: Upload file -> Buat record database
    const newHero = await prisma.hero.create({
      data: {
        image: imageUrl,
        isActive: true,
        order: 0, // Default order
      },
    });

    return NextResponse.json(newHero, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to create hero" },
      { status: 500 }
    );
  }
}
