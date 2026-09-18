// src/controllers/assessmentController.ts
import * as assessmentService from "@/services/assessmentService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { requireAuth } from "@/middleware/authMiddleware";

export const createAssessment = async (req: Request) => {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.job || !body.city || !body.age || !body.gender) {
      throw new ApiError(400, "All user information fields are required");
    }

    if (!body.type || !["personality", "company"].includes(body.type)) {
      throw new ApiError(400, "Valid assessment type is required");
    }

    if (!body.answers || typeof body.answers !== "object") {
      throw new ApiError(400, "Answers are required");
    }

    if (!body.results || typeof body.results !== "object") {
      throw new ApiError(400, "Results are required");
    }

    // Always create a new record without linking to an existing user
    // No token checking; treat every submission as independent
    const assessment = await assessmentService.createAssessmentResult({
      userId: undefined, // Explicitly set to undefined to avoid any association
      name: body.name.trim(),
      job: body.job.trim(),
      city: body.city.trim(),
      age: parseInt(body.age),
      gender: body.gender,
      type: body.type,
      answers: body.answers,
      results: body.results,
    });

    return successResponse(assessment, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const getUserAssessments = async (req: Request) => {
  try {
    const user = requireAuth(req);

    const assessments = await assessmentService.getUserAssessments(user.userId);
    return successResponse(assessments);
  } catch (error) {
    return handleError(error);
  }
};

export const getAssessment = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid assessment ID");
    }

    const assessment = await assessmentService.getAssessmentById(id);
    if (!assessment) {
      throw new ApiError(404, "Assessment not found");
    }

    return successResponse(assessment);
  } catch (error) {
    return handleError(error);
  }
};

// DELETE: Hapus satu hasil assessment. Dipanggil panel admin, tapi
// endpoint-nya belum pernah ada.
export const removeAssessment = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid assessment ID");
    }

    await assessmentService.deleteAssessment(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};

export const getAllAssessments = async () => {
  try {
    const assessments = await assessmentService.getAllAssessments();
    return successResponse(assessments);
  } catch (error) {
    return handleError(error);
  }
};

export const getStats = async () => {
  try {
    const stats = await assessmentService.getAssessmentStats();
    return successResponse(stats);
  } catch (error) {
    return handleError(error);
  }
};
