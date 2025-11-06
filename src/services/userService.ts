import prisma from "@/config/prismaConfig";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: { careers: true },
      },
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      careers: {
        select: {
          id: true,
          title: true,
          location: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { careers: true },
      },
    },
  });
};

export const updateUser = async (
  id: number,
  data: {
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
  }
) => {
  // checck if email is being updated and if it's already in use
  if (data.email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }
  }

  const updateData: Prisma.UserUpdateInput = {
    name: data.name,
    email: data.email,

    // Profile
    phone: data.phone,
    address: data.address,
    dateOfBirth: data.dateOfBirth,
    age: data.age,
    gender: data.gender,

    // Education
    lastEducation: data.lastEducation,
    institution: data.institution,
    major: data.major,
    graduationYear: data.graduationYear,
    gpa: data.gpa,

    // Experience
    lastCompany: data.lastCompany,
    lastPosition: data.lastPosition,
    workStartDate: data.workStartDate,
    workEndDate: data.workEndDate,
    jobDescription: data.jobDescription,
    reasonLeaving: data.reasonLeaving,

    // Additional
    skills: data.skills,
    certifications: data.certifications,
    portfolioUrl: data.portfolioUrl,
    linkedinUrl: data.linkedinUrl,
    isProfileComplete: data.isProfileComplete,
  };

  // Hash password if it's being updated
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = hashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      dateOfBirth: true,
      age: true,
      gender: true,
      lastEducation: true,
      institution: true,
      major: true,
      graduationYear: true,
      gpa: true,
      lastCompany: true,
      lastPosition: true,
      workStartDate: true,
      workEndDate: true,
      jobDescription: true,
      reasonLeaving: true,
      skills: true,
      certifications: true,
      portfolioUrl: true,
      linkedinUrl: true,
      isProfileComplete: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const getUserApplications = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      careers: {
        include: {
          _count: {
            select: { applicants: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
};
