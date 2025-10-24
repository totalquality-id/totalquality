import prisma from "@/config/prismaConfig";
import { Prisma } from "@prisma/client";

export const getAllEvents = async () => {
  return await prisma.event.findMany({ orderBy: { createdAt: "desc" } });
};

export const getEventById = async (id: number) => {
  return await prisma.event.findUnique({ where: { id } });
};

export const createEvent = async (data: {
  title: string;
  description: string;
  date: Date;
  location?: string;
  image?: string;
}) => {
  const cleanData: Prisma.EventCreateInput = {
    title: data.title,
    description: data.description,
    date: data.date,
    ...(data.location && { location: data.location }),
    ...(data.image && { image: data.image }),
  };

  return await prisma.event.create({ data: cleanData });
};

export const updateEvent = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    date: Date;
    location?: string;
    image?: string;
  }>
) => {
  const cleanData: Prisma.EventUpdateInput = {
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location ?? undefined,
    image: data.image ?? undefined,
  };

  return await prisma.event.update({
    where: { id },
    data: cleanData,
  });
};

export const deleteEvent = async (id: number) => {
  return await prisma.event.delete({ where: { id } });
};
