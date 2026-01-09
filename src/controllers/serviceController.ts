import * as serviceService from "@/services/serviceService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { handleFileUpload } from "@/utils/fileUpload";
import { requireAdmin } from "@/middleware/authMiddleware";

export const getServices = async () => {
  try {
    const services = await serviceService.getAllServices();
    return successResponse(services);
  } catch (error) {
    return handleError(error);
  }
};

export const getService = async (id: number) => {
  try {
    const service = await serviceService.getServiceById(id);
    if (!service)
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};

export const postService = async (req: Request) => {
  try {
    requireAdmin(req);

    const body = await req.json();

    if (!body.title || !body.description) {
      throw new ApiError(400, "title and description are required");
    }

    if (
      typeof body.title !== "string" ||
      typeof body.description !== "string"
    ) {
      throw new ApiError(400, "title and description must be string");
    }

    if (
      body.title.trim().length === 0 ||
      body.description.trim().length === 0
    ) {
      throw new ApiError(400, "title and description can't be empty");
    }

    const created = await serviceService.createService({
      title: body.title.trim(),
      description: body.description.trim(),
      image: body.image,
    });
    return successResponse(created, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const updateService = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    const body = await req.json();
    const updated = await serviceService.updateService(id, body);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};

export const removeService = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    await serviceService.deleteService(id);
    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};

export const postServiceWithFile = async (req: NextRequest) => {
  try {
    requireAdmin(req);

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!title || !description) {
      throw new ApiError(400, "title and description are required");
    }

    let imageUrl: string | undefined;

    // Handle file upload if exists
    if (file) {
      imageUrl = await handleFileUpload(req, "uploads/services");
    }

    const created = await serviceService.createService({
      title: title.trim(),
      description: description.trim(),
      image: imageUrl,
    });

    return successResponse(created, 201);
  } catch (error) {
    return handleError(error);
  }
};
