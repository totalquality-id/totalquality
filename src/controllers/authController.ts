import * as authService from "@/services/authService";
import { handleError, ApiError } from "@/utils/apiResponse";
import {
  clearRateLimit,
  enforceRateLimit,
  getClientIp,
} from "@/utils/rateLimit";

export const register = async (req: Request) => {
  try {
    const ip = getClientIp(req);
    enforceRateLimit(`register:${ip}`, {
      limit: 5,
      windowMs: 60 * 60 * 1000,
      message: "Terlalu banyak pendaftaran dari jaringan ini. Coba lagi nanti.",
    });

    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      throw new ApiError(400, "Name, email, and password are required");
    }

    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      typeof body.password !== "string"
    ) {
      throw new ApiError(400, "All fields must be strings");
    }

    if (
      body.name.trim().length === 0 ||
      body.email.trim().length === 0 ||
      body.password.trim().length === 0
    ) {
      throw new ApiError(400, "Fields cannot be empty");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Validate password length
    if (body.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const result = await authService.registerUser({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      password: body.password,
    });

    // Wrap result in successResponse format
    return Response.json(
      {
        success: true,
        data: result, // result already has { user, token }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    if (
      error instanceof Error &&
      error.message === "Email already registered"
    ) {
      return handleError(new ApiError(400, error.message));
    }
    return handleError(error);
  }
};

export const login = async (req: Request) => {
  try {
    const ip = getClientIp(req);
    // Kuota per IP menahan penyerang yang mencoba banyak akun sekaligus.
    enforceRateLimit(`login:ip:${ip}`, {
      limit: 20,
      windowMs: 15 * 60 * 1000,
      message: "Terlalu banyak percobaan login. Coba lagi dalam beberapa menit.",
    });

    const body = await req.json();

    if (!body.email || !body.password) {
      throw new ApiError(400, "Email and password are required");
    }

    if (typeof body.email !== "string" || typeof body.password !== "string") {
      throw new ApiError(400, "Email and password must be strings");
    }

    if (body.email.trim().length === 0 || body.password.trim().length === 0) {
      throw new ApiError(400, "Fields cannot be empty");
    }

    const emailKey = `login:email:${body.email.trim().toLowerCase()}`;
    // Kuota per email menahan penyerang yang menebak password satu akun
    // tertentu dari banyak IP.
    enforceRateLimit(emailKey, {
      limit: 5,
      windowMs: 15 * 60 * 1000,
      message: "Terlalu banyak percobaan login untuk akun ini. Coba lagi nanti.",
    });

    const result = await authService.loginUser({
      email: body.email.trim().toLowerCase(),
      password: body.password,
    });

    // Login berhasil: kosongkan kuota agar user sah tidak terkunci karena
    // salah ketik sebelumnya.
    clearRateLimit(emailKey);

    // Wrap result in successResponse format
    return Response.json(
      {
        success: true,
        data: result, // result already has { user, token }
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    if (
      error instanceof Error &&
      (error.message === "Invalid credentials" ||
        error.message === "User not found")
    ) {
      return handleError(new ApiError(401, "Invalid email or password"));
    }
    return handleError(error);
  }
};

export const verifyToken = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.substring(7);
    const user = await authService.verifyUserToken(token);

    return Response.json(
      {
        success: true,
        data: { user },
      },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Invalid token" || error.message === "Token expired")
    ) {
      return handleError(new ApiError(401, error.message));
    }
    return handleError(error);
  }
};
