import * as careerService from "@/services/careerService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { requireAdmin, requireAuth } from "@/middleware/authMiddleware";

const CAREER_STATUSES = ["open", "closed"] as const;

export const getCareers = async (req?: Request) => {
  try {
    // Website publik hanya boleh melihat lowongan yang masih dibuka. Panel
    // admin perlu melihat yang closed juga agar bisa dibuka kembali.
    let includeClosed = false;

    if (req) {
      const url = new URL(req.url);
      if (url.searchParams.get("includeClosed") === "true") {
        requireAdmin(req);
        includeClosed = true;
      }
    }

    const careers = await careerService.getAllCareers({ includeClosed });
    return successResponse(careers);
  } catch (error) {
    return handleError(error);
  }
};

export const getCareer = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid career ID");
    }

    const career = await careerService.getCareerById(id);
    if (!career) {
      throw new ApiError(404, "Career not found");
    }
    return successResponse(career);
  } catch (error) {
    return handleError(error);
  }
};

export const createCareer = async (req: Request) => {
  try {
    requireAdmin(req);

    const body = await req.json();

    if (
      !body.title ||
      !body.description ||
      !body.requirements ||
      !body.location
    ) {
      throw new ApiError(
        400,
        "title, description, requirements, and location are required"
      );
    }

    if (
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      typeof body.requirements !== "string" ||
      typeof body.location !== "string"
    ) {
      throw new ApiError(400, "All fields must be strings");
    }

    if (
      body.title.trim().length === 0 ||
      body.description.trim().length === 0 ||
      body.requirements.trim().length === 0 ||
      body.location.trim().length === 0
    ) {
      throw new ApiError(400, "Fields cannot be empty");
    }

    // Field opsional: ada di schema Career dan dipakai tampilan publik,
    // tapi sebelumnya tidak pernah ikut tersimpan.
    for (const field of ["salary", "jobType", "experience"] as const) {
      if (body[field] !== undefined && typeof body[field] !== "string") {
        throw new ApiError(400, `${field} must be a string`);
      }
    }

    if (
      body.status !== undefined &&
      !CAREER_STATUSES.includes(body.status)
    ) {
      throw new ApiError(400, 'status must be "open" or "closed"');
    }

    const optionalText = (value: unknown) => {
      if (typeof value !== "string") return null;
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    };

    const created = await careerService.createCareer({
      title: body.title.trim(),
      description: body.description.trim(),
      requirements: body.requirements.trim(),
      location: body.location.trim(),
      salary: optionalText(body.salary),
      jobType: optionalText(body.jobType),
      experience: optionalText(body.experience),
      status: body.status ?? "open",
    });
    return successResponse(created, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const patchCareer = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid career ID");
    }

    const body = await req.json();

    if (Object.keys(body).length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    if (body.title !== undefined && typeof body.title !== "string") {
      throw new ApiError(400, "title must be a string");
    }

    if (
      body.description !== undefined &&
      typeof body.description !== "string"
    ) {
      throw new ApiError(400, "description must be a string");
    }

    if (
      body.requirements !== undefined &&
      typeof body.requirements !== "string"
    ) {
      throw new ApiError(400, "requirements must be a string");
    }

    if (body.location !== undefined && typeof body.location !== "string") {
      throw new ApiError(400, "location must be a string");
    }

    for (const field of ["salary", "jobType", "experience"] as const) {
      if (
        body[field] !== undefined &&
        body[field] !== null &&
        typeof body[field] !== "string"
      ) {
        throw new ApiError(400, `${field} must be a string`);
      }
    }

    if (
      body.status !== undefined &&
      !CAREER_STATUSES.includes(body.status)
    ) {
      throw new ApiError(400, 'status must be "open" or "closed"');
    }

    const updateData: Partial<{
      title: string;
      description: string;
      requirements: string;
      location: string;
      salary: string | null;
      jobType: string | null;
      experience: string | null;
      status: string;
    }> = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined)
      updateData.description = body.description.trim();
    if (body.requirements !== undefined)
      updateData.requirements = body.requirements.trim();
    if (body.location !== undefined) updateData.location = body.location.trim();

    // String kosong diperlakukan sebagai "kosongkan field" agar admin bisa
    // menghapus nilai yang sudah pernah diisi.
    for (const field of ["salary", "jobType", "experience"] as const) {
      if (body[field] === undefined) continue;
      const value = typeof body[field] === "string" ? body[field].trim() : "";
      updateData[field] = value.length > 0 ? value : null;
    }

    const updated = await careerService.updateCareer(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeCareer = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid career ID");
    }

    await careerService.deleteCareer(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};

export const applyCareer = async (id: number, req: Request) => {
  try {
    // Identitas pelamar diambil dari token, bukan dari body. Sebelumnya
    // body.userId dipercaya apa adanya sehingga siapa pun bisa melamar
    // atas nama user lain.
    const { userId } = requireAuth(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid career ID");
    }

    const body = await req.json();

    // ⭐ EXTRACT APPLICATION DATA
    const applicationData = {
      coverLetter: body.coverLetter,
      expectedSalary: body.expectedSalary,
      availableDate: body.availableDate ? new Date(body.availableDate) : null,
    };

    const result = await careerService.applyToCareer(
      id,
      userId,
      applicationData
    );

    return Response.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Already applied to this position"
    ) {
      return handleError(new ApiError(400, error.message));
    }
    if (error instanceof Error && error.message === "Career not found") {
      return handleError(new ApiError(404, error.message));
    }
    return handleError(error);
  }
};
