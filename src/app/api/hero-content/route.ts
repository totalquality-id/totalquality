/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/hero-content/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prismaConfig";
import { withAdmin } from "@/utils/authorizedRoute";

export async function POST(request: NextRequest) {
  return withAdmin(request, () => createHeroContent(request));
}

export async function GET() {
  try {
    // Ambil satu konten yang aktif (terbaru)
    const content = await prisma.heroContent.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero content" },
      { status: 500 }
    );
  }
}

async function createHeroContent(request: NextRequest) {
  try {
    const body = await request.json();

    // Opsional: Set konten lain jadi tidak aktif agar hanya ada 1 yang muncul
    if (body.isActive) {
      await prisma.heroContent.updateMany({
        data: { isActive: false },
      });
    }

    const newContent = await prisma.heroContent.create({
      data: {
        heading: body.heading,
        subheading: body.subheading,
        ctaText: body.ctaText,
        ctaLink: body.ctaLink,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}
