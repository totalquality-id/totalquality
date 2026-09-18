import * as articleService from "@/services/articleService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";
import { requireAdmin } from "@/middleware/authMiddleware";

export const getArticleList = async () => {
  try {
    const articles = await articleService.getAllArticles();
    return successResponse(articles);
  } catch (error) {
    return handleError(error);
  }
};

export const getArticle = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid article ID");
    }

    const article = await articleService.getArticleById(id);
    if (!article) {
      throw new ApiError(404, "Article not found");
    }
    return successResponse(article);
  } catch (error) {
    return handleError(error);
  }
};

export const createArticle = async (req: Request) => {
  try {
    requireAdmin(req);

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

    const created = await articleService.createArticle({
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

export const patchArticle = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid article ID");
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

    const updateData: Partial<{
      title: string;
      content: string;
      image?: string;
      author?: string;
    }> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.content !== undefined) updateData.content = body.content.trim();
    if (body.author !== undefined) updateData.author = body.author.trim();
    if (body.image !== undefined) updateData.image = body.image;

    const updated = await articleService.updateArticle(id, updateData);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    return handleError(error);
  }
};

export const removeArticle = async (id: number, req: Request) => {
  try {
    requireAdmin(req);

    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid article ID");
    }

    await articleService.deleteArticle(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};
