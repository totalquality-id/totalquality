/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/config/prismaConfig";

export const getAllServices = async () => {
  return await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
};

export const getServiceById = async (id: number) => {
  return await prisma.service.findUnique({
    where: { id },
  });
};

export const createService = async (data: {
  title: string;
  description: string;
  image?: string;
}) => {
  return await prisma.service.create({ data });
};

export const updateService = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    icon?: string;
  }>
) => {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== null)
  );

  return await prisma.service.update({
    where: { id },
    data: cleanData,
  });
};

export const deleteService = async (id: number) => {
  return await prisma.service.delete({
    where: { id },
  });
};
