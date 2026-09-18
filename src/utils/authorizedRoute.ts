import { requireAdmin, requireAdminOrOwner } from "@/middleware/authMiddleware";
import { handleError } from "@/utils/apiResponse";

type Action = () => Promise<Response>;

export async function withAdmin(request: Request, action: Action): Promise<Response> {
  try {
    requireAdmin(request);
    return await action();
  } catch (error) {
    return handleError(error);
  }
}

export async function withAdminOrOwner(request: Request, userId: number, action: Action): Promise<Response> {
  try {
    requireAdminOrOwner(request, userId);
    return await action();
  } catch (error) {
    return handleError(error);
  }
}
