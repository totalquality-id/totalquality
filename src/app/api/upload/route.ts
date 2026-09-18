// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/authMiddleware";
import { uploadImage, deleteImage } from "@/services/uploadService";
import { ApiError } from "@/utils/apiResponse";

/**
 * POST /api/upload
 * Upload gambar ke server. Digunakan oleh events, articles, dan services.
 *
 * Request: multipart/form-data
 *   - file: File (required) — gambar yang akan diupload
 *   - folder: string (optional) — subfolder tujuan, e.g. "events" | "articles" | "services"
 *             Default: "general"
 *
 * Response: { url: string }
 */
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 },
      );
    }

    // Validasi ukuran (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "File size must not exceed 5MB" },
        { status: 400 },
      );
    }

    // Validasi ekstensi
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      return NextResponse.json(
        {
          message: `Invalid file extension. Allowed: ${allowedExtensions.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const url = await uploadImage(file, folder);

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode });
    }
    console.error("Upload error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/upload
 * Hapus gambar dari server berdasarkan URL-nya.
 *
 * Request body: { url: string }
 */
export async function DELETE(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json(
        { message: "url is required and must be a string" },
        { status: 400 },
      );
    }

    await deleteImage(body.url);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode });
    }
    console.error("Delete image error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 },
    );
  }
}
