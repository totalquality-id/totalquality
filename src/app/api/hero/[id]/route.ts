// src/app/api/hero/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prismaConfig";
import { deleteImage } from "@/services/uploadService";
import { withAdmin } from "@/utils/authorizedRoute";
import { ApiError, handleError, successResponse } from "@/utils/apiResponse";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withAdmin(request, () => patchHero(request, context));
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withAdmin(request, () => deleteHero(context));
}

/**
 * Ubah metadata slide hero: judul, deskripsi, urutan, dan status aktif.
 * Sebelumnya kolom-kolom ini ada di schema tapi tidak punya endpoint sama
 * sekali, jadi tidak pernah bisa diisi lewat panel admin.
 */
async function patchHero(request: NextRequest, { params }: RouteContext) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (!id || isNaN(id)) throw new ApiError(400, "Invalid hero ID");

    const body = await request.json();

    if (Object.keys(body).length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    const updateData: {
      title?: string | null;
      description?: string | null;
      order?: number;
      isActive?: boolean;
    } = {};

    for (const field of ["title", "description"] as const) {
      if (body[field] === undefined) continue;
      if (body[field] !== null && typeof body[field] !== "string") {
        throw new ApiError(400, `${field} must be a string or null`);
      }
      const value = typeof body[field] === "string" ? body[field].trim() : "";
      updateData[field] = value.length > 0 ? value : null;
    }

    if (body.order !== undefined) {
      if (!Number.isInteger(body.order)) {
        throw new ApiError(400, "order must be an integer");
      }
      updateData.order = body.order;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        throw new ApiError(400, "isActive must be a boolean");
      }
      updateData.isActive = body.isActive;
    }

    const updated = await prisma.hero.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
}

async function deleteHero({ params }: RouteContext) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (!id || isNaN(id)) throw new ApiError(400, "Invalid hero ID");

    const hero = await prisma.hero.findUnique({ where: { id } });
    if (!hero) throw new ApiError(404, "Hero not found");

    await prisma.hero.delete({ where: { id } });

    // Bersihkan gambarnya di Cloudinary supaya tidak jadi berkas yatim.
    // Kegagalan pembersihan tidak boleh menggagalkan penghapusan record.
    try {
      await deleteImage(hero.image);
    } catch (cleanupError) {
      console.error("Gagal menghapus gambar hero di Cloudinary:", cleanupError);
    }

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
