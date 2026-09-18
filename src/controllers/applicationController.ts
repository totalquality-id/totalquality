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
          // Profil selengkapnya untuk layar review HR. Password sengaja
          // tidak pernah masuk select agar tidak bocor lewat API.
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            dateOfBirth: true,
            age: true,
            gender: true,
            lastEducation: true,
            institution: true,
            major: true,
            graduationYear: true,
            gpa: true,
            lastCompany: true,
            lastPosition: true,
            workStartDate: true,
            workEndDate: true,
            jobDescription: true,
            reasonLeaving: true,
            skills: true,
            certifications: true,
            portfolioUrl: true,
            linkedinUrl: true,
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

    // Pipeline rekrutmen yang dipakai panel admin. "reviewed" dipertahankan
    // untuk baris lama; sebelumnya "reviewing" dan "shortlisted" ditolak 400
    // padahal keduanya sudah jadi pilihan di dropdown admin.
    const validStatuses = [
      "pending",
      "reviewing",
      "reviewed",
      "shortlisted",
      "interview",
      "accepted",
      "rejected",
    ];
    if (status && !validStatuses.includes(status)) {
      throw new ApiError(
        400,
        `Invalid status. Allowed: ${validStatuses.join(", ")}`
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status,
        notes,
        // Catat kapan lamaran ditinjau agar admin tahu umur antrean.
        ...(status && status !== "pending" ? { reviewedAt: new Date() } : {}),
      },
    });

    return successResponse(updated);
  } catch (error) {
    return handleError(error);
  }
};

// DELETE: Hapus lamaran. Dipanggil panel admin, tapi endpoint-nya belum ada.
export const removeApplication = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) throw new ApiError(400, "Invalid Application ID");

    await prisma.application.delete({ where: { id } });

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};
