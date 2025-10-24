import * as forumService from "@/services/forumService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";

export const getForums = async () => {
  try {
    const forums = await forumService.getAllForums();
    return successResponse(forums);
  } catch (error) {
    return handleError(error);
  }
};

export const getForum = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    const forum = await forumService.getForumById(id);
    if (!forum) {
      throw new ApiError(404, "Forum not found");
    }
    return successResponse(forum);
  } catch (error) {
    return handleError(error);
  }
};

export const createForum = async (req: Request) => {
  try {
    const body = await req.json();

    if (!body.quote || !body.author) {
      throw new ApiError(400, "quote and author are required");
    }

    if (typeof body.quote !== "string" || typeof body.author !== "string") {
      throw new ApiError(400, "quote and author must be strings");
    }

    if (body.quote.trim().length === 0 || body.author.trim().length === 0) {
      throw new ApiError(400, "quote and author cannot be empty");
    }

    const created = await forumService.createForum({
      quote: body.quote.trim(),
      author: body.author.trim(),
    });
    return successResponse(created, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const patchForum = async (id: number, req: Request) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    const body = await req.json();

    if (Object.keys(body).length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    if (body.quote !== undefined && typeof body.quote !== "string") {
      throw new ApiError(400, "quote must be a string");
    }

    if (body.author !== undefined && typeof body.author !== "string") {
      throw new ApiError(400, "author must be a string");
    }

    const updateData: Partial<{ quote: string; author: string }> = {};
    if (body.quote !== undefined) updateData.quote = body.quote.trim();
    if (body.author !== undefined) updateData.author = body.author.trim();

    const updated = await forumService.updateForum(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeForum = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    await forumService.deleteForum(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};

export const likeForum = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    const updated = await forumService.incrementLikes(id, 1);
    return successResponse({ likes: updated.likes });
  } catch (error) {
    return handleError(error);
  }
};

export const unlikeForum = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    const updated = await forumService.decrementLikes(id, 1);
    return successResponse({ likes: Math.max(updated.likes, 0) });
  } catch (error) {
    return handleError(error);
  }
};

export const shareForum = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid forum ID");
    }

    const updated = await forumService.incrementShares(id, 1);
    return successResponse({ shares: updated.shares });
  } catch (error) {
    return handleError(error);
  }
};
