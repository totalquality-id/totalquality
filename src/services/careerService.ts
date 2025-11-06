import prisma from "@/config/prismaConfig";
import { Prisma } from "@prisma/client";

export const getAllCareers = async () => {
  return await prisma.career.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applicants: true },
      },
    },
  });
};

export const getCareerById = async (id: number) => {
  return await prisma.career.findUnique({
    where: { id },
    include: {
      _count: {
        select: { applicants: true },
      },
    },
  });
};

export const createCareer = async (data: {
  title: string;
  description: string;
  requirements: string;
  location: string;
}) => {
  const cleanData: Prisma.CareerCreateInput = {
    title: data.title,
    description: data.description,
    requirements: data.requirements,
    location: data.location,
  };

  return await prisma.career.create({ data: cleanData });
};

export const updateCareer = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    requirements: string;
    location: string;
  }>
) => {
  const cleanData: Prisma.CareerUpdateInput = {
    title: data.title,
    description: data.description,
    requirements: data.requirements,
    location: data.location,
  };

  return await prisma.career.update({
    where: { id },
    data: cleanData,
  });
};

export const deleteCareer = async (id: number) => {
  return await prisma.career.delete({ where: { id } });
};

export const applyToCareer = async (
  careerId: number,
  userId: number,
  applicationData?: {
    coverLetter?: string;
    expectedSalary?: string;
    availableDate?: Date | null;
  }
) => {
  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_careerId: {
        userId: userId,
        careerId: careerId,
      },
    },
  });

  if (existingApplication) {
    throw new Error("Already applied to this position");
  }

  // Check if career exists
  const career = await prisma.career.findUnique({
    where: { id: careerId },
  });

  if (!career) {
    throw new Error("Career not found");
  }

  // ⭐ CREATE APPLICATION
  return await prisma.application.create({
    data: {
      userId: userId,
      careerId: careerId,
      coverLetter: applicationData?.coverLetter,
      expectedSalary: applicationData?.expectedSalary,
      availableDate: applicationData?.availableDate,
      status: "pending",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      career: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  });
};
