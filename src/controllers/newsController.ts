import * as newsService from "@/services/newsService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";

export const getNewsList = async () => {
  try {
    const news = await newsService.getAllNews();
    return successResponse(news);
  } catch (error) {
    return handleError(error);
  }
};

export const getNews = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid news ID");
    }

    const news = await newsService.getNewsById(id);
    if (!news) {
      throw new ApiError(404, "News not found");
    }
    return successResponse(news);
  } catch (error) {
    return handleError(error);
  }
};

export const createNews = async (req: Request) => {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      throw new ApiError(400, "title and content are required");
    }

    if (typeof body.title !== "string" || typeof body.content !== "string") {
      throw new ApiError(400, "title and content must be strings");
    }

    if (body.title.trim().length === 0 || body.content.trim().length === 0) {
      throw new ApiError(400, "title and content cannot be empty");
    }

    // Validate author if provided
    if (body.author !== undefined && typeof body.author !== "string") {
      throw new ApiError(400, "author must be a string");
    }

    const created = await newsService.createNews({
      title: body.title.trim(),
      content: body.content.trim(),
      image: body.image,
      author: body.author?.trim(),
    });
    return successResponse(created, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const patchNews = async (id: number, req: Request) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid news ID");
    }

    const body = await req.json();

    if (Object.keys(body).length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    // Validate types
    if (body.title !== undefined && typeof body.title !== "string") {
      throw new ApiError(400, "title must be a string");
    }

    if (body.content !== undefined && typeof body.content !== "string") {
      throw new ApiError(400, "content must be a string");
    }

    if (body.author !== undefined && typeof body.author !== "string") {
      throw new ApiError(400, "author must be a string");
    }

    // Prepare update data
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.content !== undefined) updateData.content = body.content.trim();
    if (body.author !== undefined) updateData.author = body.author.trim();
    if (body.image !== undefined) updateData.image = body.image;

    const updated = await newsService.updateNews(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeNews = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid news ID");
    }

    await newsService.deleteNews(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};
