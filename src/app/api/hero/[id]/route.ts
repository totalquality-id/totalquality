/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/hero/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prismaConfig";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 params is async
) {
  const { id } = await params;
  try {
    await prisma.hero.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete hero" },
      { status: 500 }
    );
  }
}
