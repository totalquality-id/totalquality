import { requireAuth } from "@/middleware/authMiddleware";
import { handleError, successResponse } from "@/utils/apiResponse";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
