import prisma from "@/config/prismaConfig";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { requireAdmin } from "@/middleware/authMiddleware";

// GET: Ambil semua aplikasi pelamar (untuk Admin)
export const getAllApplications = async (req: Request) => {
  try {
    requireAdmin(req); // Proteksi: Hanya admin yang boleh lihat

    const applications = await prisma.application.findMany({
      include: {
        career: {
          select: { title: true, location: true }, // Sertakan info lowongan
        },
        user: {
          select: { name: true, email: true, phone: true }, // Sertakan info pelamar
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    return successResponse(applications);
  } catch (error) {
    return handleError(error);
  }
};

// GET: Ambil detail satu aplikasi by ID
export const getApplicationById = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) throw new ApiError(400, "Invalid Application ID");

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        career: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            // Tambahkan field profile lain jika ada di schema UserProfile
          },
        },
      },
    });

    if (!application) throw new ApiError(404, "Application not found");

    return successResponse(application);
  } catch (error) {
    return handleError(error);
  }
};

// GET: Ambil aplikasi berdasarkan ID Lowongan (Career)
export const getApplicationsByCareer = async (
  careerId: number,
  req: Request
) => {
  try {
    requireAdmin(req);

    const applications = await prisma.application.findMany({
      where: { careerId },
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { appliedAt: "desc" },
    });

    return successResponse(applications);
  } catch (error) {
    return handleError(error);
  }
};

// PATCH: Update status (Pending -> Interview/Rejected)
export const updateApplicationStatus = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    const body = await req.json();
    const { status, notes } = body;

    // Validasi status yang diperbolehkan
    const validStatuses = [
      "pending",
      "reviewed",
      "interview",
      "accepted",
      "rejected",
    ];
    if (status && !validStatuses.includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status,
        notes,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return handleError(error);
  }
};
