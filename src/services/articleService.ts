import prisma from "@/config/prismaConfig";

export const getAllNews = async () => {
  return await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
};

export const getNewsById = async (id: number) => {
  return await prisma.news.findUnique({ where: { id } });
};

export const createNews = async (data: {
  title: string;
  content: string;
  image?: string;
  author?: string;
}) => {
  return await prisma.news.create({ data });
};

export const updateNews = async (
  id: number,
  data: Partial<{
    title: string;
    content: string;
    image?: string;
    author?: string;
  }>
) => {
  return await prisma.news.update({ where: { id }, data });
};

export const deleteNews = async (id: number) => {
  return await prisma.news.delete({ where: { id } });
};
