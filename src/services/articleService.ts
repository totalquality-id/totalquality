import prisma from "@/config/prismaConfig";

export const getAllArticles = async () => {
  return await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
};

export const getArticleById = async (id: number) => {
  return await prisma.article.findUnique({ where: { id } });
};

export const createArticle = async (data: {
  title: string;
  content: string;
  image?: string;
  author?: string;
}) => {
  return await prisma.article.create({ data });
};

export const updateArticle = async (
  id: number,
  data: Partial<{
    title: string;
    content: string;
    image?: string;
    author?: string;
  }>
) => {
  return await prisma.article.update({ where: { id }, data });
};

export const deleteArticle = async (id: number) => {
  return await prisma.article.delete({ where: { id } });
};
