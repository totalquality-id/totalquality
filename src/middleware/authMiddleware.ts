import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/apiResponse";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface AuthUser {
  userId: number;
  email: string;
  role: string;
}

export const verifyAuthToken = (token: string): AuthUser => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    }
    throw new ApiError(401, "Invalid token");
  }
};

export const extractTokenFromHeader = (req: Request): string => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  return authHeader.substring(7);
};

export const requireAuth = (req: Request): AuthUser => {
  const token = extractTokenFromHeader(req);
  return verifyAuthToken(token);
};

export const requireAdmin = (req: Request): AuthUser => {
  const user = requireAuth(req);

  if (user.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }

  return user;
};

export const requireAdminOrOwner = (
  req: Request,
  resourceUserId: number
): AuthUser => {
  const user = requireAuth(req);

  if (user.role === "admin") {
    return user;
  }

  if (user.userId !== resourceUserId) {
    throw new ApiError(403, "Access denied");
  }

  return user;
};
