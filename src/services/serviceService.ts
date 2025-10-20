import prisma from "@/config/prismaConfig";

export const getAllServices = async () => {
  return await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
};

export const createService = async (data: {
  title: string;
  description: string;
  image?: string;
}) => {
  return await prisma.service.create({ data });
};
