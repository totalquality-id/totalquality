import * as careerService from "@/services/careerService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";

export const getCareers = async () => {
  try {
    const careers = await careerService.getAllCareers();
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

    const created = await careerService.createCareer({
      title: body.title.trim(),
      description: body.description.trim(),
      requirements: body.requirements.trim(),
      location: body.location.trim(),
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

    const updateData: Partial<{
      title: string;
      description: string;
      requirements: string;
      location: string;
    }> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined)
      updateData.description = body.description.trim();
    if (body.requirements !== undefined)
      updateData.requirements = body.requirements.trim();
    if (body.location !== undefined) updateData.location = body.location.trim();

    const updated = await careerService.updateCareer(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeCareer = async (id: number) => {
  try {
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
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid career ID");
    }

    const body = await req.json();

    if (!body.userId || isNaN(body.userId)) {
      throw new ApiError(400, "Valid userId is required");
    }

    // ⭐ EXTRACT APPLICATION DATA
    const applicationData = {
      coverLetter: body.coverLetter,
      expectedSalary: body.expectedSalary,
      availableDate: body.availableDate ? new Date(body.availableDate) : null,
    };

    const result = await careerService.applyToCareer(
      id,
      body.userId,
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
