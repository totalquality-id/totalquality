import * as userService from "@/services/userService";
import { handleError, successResponse, ApiError } from "@/utils/apiResponse";

export const getUsers = async () => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(users);
  } catch (error) {
    return handleError(error);
  }
};

export const getUser = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid user ID");
    }

    const user = await userService.getUserById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return successResponse(user);
  } catch (error) {
    return handleError(error);
  }
};

export const updateUser = async (id: number, req: Request) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid user ID");
    }

    const body = await req.json();

    if (Object.keys(body).length === 0) {
      throw new ApiError(400, "No fields to update");
    }

    // ⭐ VALIDATION
    if (body.email !== undefined && typeof body.email !== "string") {
      throw new ApiError(400, "email must be a string");
    }

    if (body.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        throw new ApiError(400, "Invalid email format");
      }
    }

    if (body.password !== undefined && typeof body.password !== "string") {
      throw new ApiError(400, "password must be a string");
    }

    if (body.password !== undefined && body.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const updateData: Partial<{
      name?: string;
      email?: string;
      password?: string;
      phone?: string | null;
      address?: string | null;
      dateOfBirth?: Date | null;
      age?: number | null;
      gender?: string | null;
      lastEducation?: string | null;
      institution?: string | null;
      major?: string | null;
      graduationYear?: number | null;
      gpa?: number | null;
      lastCompany?: string | null;
      lastPosition?: string | null;
      workStartDate?: Date | null;
      workEndDate?: Date | null;
      jobDescription?: string | null;
      reasonLeaving?: string | null;
      skills?: string | null;
      certifications?: string | null;
      portfolioUrl?: string | null;
      linkedinUrl?: string | null;
      isProfileComplete?: boolean;
    }> = {};

    // Basic fields
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.email !== undefined)
      updateData.email = body.email.trim().toLowerCase();
    if (body.password !== undefined) updateData.password = body.password;

    // Profile fields
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.dateOfBirth !== undefined)
      updateData.dateOfBirth = body.dateOfBirth
        ? new Date(body.dateOfBirth)
        : null;
    if (body.age !== undefined) updateData.age = body.age;
    if (body.gender !== undefined) updateData.gender = body.gender;

    // Education
    if (body.lastEducation !== undefined)
      updateData.lastEducation = body.lastEducation;
    if (body.institution !== undefined)
      updateData.institution = body.institution;
    if (body.major !== undefined) updateData.major = body.major;
    if (body.graduationYear !== undefined)
      updateData.graduationYear = body.graduationYear;
    if (body.gpa !== undefined) updateData.gpa = body.gpa;

    // Experience
    if (body.lastCompany !== undefined)
      updateData.lastCompany = body.lastCompany;
    if (body.lastPosition !== undefined)
      updateData.lastPosition = body.lastPosition;
    if (body.workStartDate !== undefined)
      updateData.workStartDate = body.workStartDate
        ? new Date(body.workStartDate)
        : null;
    if (body.workEndDate !== undefined)
      updateData.workEndDate = body.workEndDate
        ? new Date(body.workEndDate)
        : null;
    if (body.jobDescription !== undefined)
      updateData.jobDescription = body.jobDescription;
    if (body.reasonLeaving !== undefined)
      updateData.reasonLeaving = body.reasonLeaving;

    // Additional
    if (body.skills !== undefined) updateData.skills = body.skills;
    if (body.certifications !== undefined)
      updateData.certifications = body.certifications;
    if (body.portfolioUrl !== undefined)
      updateData.portfolioUrl = body.portfolioUrl;
    if (body.linkedinUrl !== undefined)
      updateData.linkedinUrl = body.linkedinUrl;
    if (body.isProfileComplete !== undefined)
      updateData.isProfileComplete = body.isProfileComplete;

    const updated = await userService.updateUser(id, updateData);

    return Response.json(
      {
        success: true,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Invalid JSON format"));
    }
    if (error instanceof Error && error.message === "Email already in use") {
      return handleError(new ApiError(400, error.message));
    }
    return handleError(error);
  }
};

export const removeUser = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new ApiError(400, "Invalid user ID");
    }

    await userService.deleteUser(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};

export const getUserProfile = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    // You'll need to decode the token to get userId
    // This is a simplified version - implement proper token verification
    const userId = 1; // Replace with actual token decode logic

    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return successResponse(user);
  } catch (error) {
    return handleError(error);
  }
};
