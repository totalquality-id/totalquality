import * as authService from "@/services/authService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";

export const register = async (req: Request) => {
  try {
    console.log("Register endpoint hit");
    
    const body = await req.json();
    console.log("Request body:", { ...body, password: "***" });

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

    console.log("Registration successful:", { 
      userId: result.user.id, 
      hasToken: !!result.token 
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
    console.error("Register error:", error);
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
    console.log("Login endpoint hit");
    
    const body = await req.json();
    console.log("Login attempt for:", body.email);

    if (!body.email || !body.password) {
      throw new ApiError(400, "Email and password are required");
    }

    if (typeof body.email !== "string" || typeof body.password !== "string") {
      throw new ApiError(400, "Email and password must be strings");
    }

    if (body.email.trim().length === 0 || body.password.trim().length === 0) {
      throw new ApiError(400, "Fields cannot be empty");
    }

    const result = await authService.loginUser({
      email: body.email.trim().toLowerCase(),
      password: body.password,
    });

    console.log("Login successful:", { 
      userId: result.user.id, 
      hasToken: !!result.token 
    });

    // Wrap result in successResponse format
    return Response.json(
      {
        success: true,
        data: result, // result already has { user, token }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
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