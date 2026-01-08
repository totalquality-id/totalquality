// src/services/assessmentService.ts
import prisma from "@/config/prismaConfig";

interface CreateAssessmentData {
  userId?: number;
  name: string;
  job: string;
  city: string;
  age: number;
  gender: string;
  type: "personality" | "company";
  answers: Record<number, any>;
  results: any;
}

export const createAssessmentResult = async (data: CreateAssessmentData) => {
  return await prisma.assessmentResult.create({
    data: {
      userId: data.userId,
      name: data.name,
      job: data.job,
      city: data.city,
      age: data.age,
      gender: data.gender,
      type: data.type,
      answers: data.answers,
      results: data.results,
    },
  });
};

export const getUserAssessments = async (userId: number) => {
  return await prisma.assessmentResult.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getAssessmentById = async (id: number) => {
  return await prisma.assessmentResult.findUnique({
    where: { id },
  });
};

export const getAllAssessments = async () => {
  return await prisma.assessmentResult.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getAssessmentStats = async () => {
  const totalAssessments = await prisma.assessmentResult.count();

  const byType = await prisma.assessmentResult.groupBy({
    by: ["type"],
    _count: true,
  });

  const recentAssessments = await prisma.assessmentResult.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
    },
  });

  return {
    total: totalAssessments,
    byType,
    recent: recentAssessments,
  };
};
