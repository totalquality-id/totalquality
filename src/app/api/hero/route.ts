// src/app/api/hero/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prismaConfig";
import { uploadImage } from "@/services/uploadService";
import { requireAdmin } from "@/middleware/authMiddleware";
import { ApiError, handleError } from "@/utils/apiResponse";

export async function GET(request: NextRequest) {
  try {
    // Website publik hanya butuh slide aktif. Panel admin perlu melihat yang
    // nonaktif juga — tanpa ini, slide yang baru dinonaktifkan langsung hilang
    // dari panel dan tidak bisa diaktifkan kembali.
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";

    if (includeInactive) {
      requireAdmin(request);
    }

    const heroes = await prisma.hero.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(heroes);
  } catch (error) {
    return handleError(error);
  }
}

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

export async function POST(request: NextRequest) {
  try {
    requireAdmin(request);

    // formData hanya bisa dibaca sekali. Sebelumnya helper upload memakan
    // stream-nya lebih dulu sehingga title/description/order tidak pernah
    // terbaca dan kolomnya selamanya kosong. Sekarang dibaca sekali di sini.
    const formData = await request.formData();

    const file = formData.get("file") ?? formData.get("image");
    if (!(file instanceof File)) {
      throw new ApiError(400, "Field 'file' berisi gambar wajib diisi");
    }

    if (!file.type.startsWith("image/")) {
      throw new ApiError(400, "Hanya berkas gambar yang diperbolehkan");
    }

    if (file.size > MAX_SIZE) {
      throw new ApiError(400, "Ukuran berkas maksimal 5MB");
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      throw new ApiError(
        400,
        `Ekstensi tidak didukung. Gunakan: ${ALLOWED_EXTENSIONS.join(", ")}`
      );
    }

    const text = (key: string) => {
      const value = formData.get(key);
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    };

    const orderRaw = text("order");
    const order = orderRaw === undefined ? 0 : Number(orderRaw);
    if (!Number.isInteger(order)) {
      throw new ApiError(400, "order harus berupa bilangan bulat");
    }

    const isActiveRaw = text("isActive");

    const imageUrl = await uploadImage(file, "hero-images");

    const newHero = await prisma.hero.create({
      data: {
        image: imageUrl,
        title: text("title") ?? null,
        description: text("description") ?? null,
        order,
        isActive: isActiveRaw === undefined ? true : isActiveRaw !== "false",
      },
    });

    return NextResponse.json(newHero, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
