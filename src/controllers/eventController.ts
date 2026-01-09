import * as eventService from "@/services/eventService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { requireAdmin } from "@/middleware/authMiddleware";

export const getEvents = async () => {
  try {
    const events = await eventService.getAllEvents();
    return successResponse(events);
  } catch (error) {
    return handleError(error);
  }
};

export const getEvent = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid event ID");
    }

    const event = await eventService.getEventById(id);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    return successResponse(event);
  } catch (error) {
    return handleError(error);
  }
};

export const createEvent = async (req: Request) => {
  try {
    requireAdmin(req);

    const body = await req.json();

    if (!body.title || !body.description || !body.date) {
      throw new ApiError(400, "title, description, and date are required");
    }

    if (
      typeof body.title !== "string" ||
      typeof body.description !== "string"
    ) {
      throw new ApiError(400, "title and description must be strings");
    }

    if (
      body.title.trim().length === 0 ||
      body.description.trim().length === 0
    ) {
      throw new ApiError(400, "title and description cannot be empty");
    }

    // Validate date
    const eventDate = new Date(body.date);
    if (isNaN(eventDate.getTime())) {
      throw new ApiError(400, "Invalid date format");
    }

    // Optional: validate location if provided
    if (body.location !== undefined && typeof body.location !== "string") {
      throw new ApiError(400, "location must be a string");
    }

    const created = await eventService.createEvent({
      title: body.title.trim(),
      description: body.description.trim(),
      date: eventDate,
      location: body.location?.trim(),
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

export const patchEvent = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid event ID");
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

    if (body.location !== undefined && typeof body.location !== "string") {
      throw new ApiError(400, "location must be a string");
    }

    const updateData: Partial<{
      title: string;
      description: string;
      date: Date;
      location?: string;
      image?: string;
    }> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined)
      updateData.description = body.description.trim();
    if (body.location !== undefined) updateData.location = body.location.trim();
    if (body.image !== undefined) updateData.image = body.image;

    if (body.date !== undefined) {
      const eventDate = new Date(body.date);
      if (isNaN(eventDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
      }
      updateData.date = eventDate;
    }

    const updated = await eventService.updateEvent(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeEvent = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid event ID");
    }

    await eventService.deleteEvent(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};
