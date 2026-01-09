import { requireAuth } from "@/middleware/authMiddleware";
import { handleError, successResponse } from "@/utils/apiResponse";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);

    return successResponse({
      isAdmin: user.role === "admin",
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
