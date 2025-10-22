import prisma from "@/config/prismaConfig";

export const getAllForums = async () => {
  return await prisma.forum.findMany({ orderBy: { createdAt: "desc" } });
};

export const getForumById = async (id: number) => {
  return await prisma.forum.findUnique({ where: { id } });
};

export const createForum = async (data: { quote: string; author: string }) => {
  return await prisma.forum.create({ data });
};

export const updateForum = async (
  id: number,
  data: Partial<{ quote: string; author: string }>
) => {
  return await prisma.forum.update({ where: { id }, data });
};

export const deleteForum = async (id: number) => {
  return await prisma.forum.delete({ where: { id } });
};

export const incrementLikes = async (id: number, value: number) => {
  const updated = await prisma.forum.update({
    where: { id },
    data: { likes: { increment: value } },
    select: {
      id: true,
      createdAt: true,
      quote: true,
      author: true,
      likes: true,
    },
  });

  return updated as {
    id: number;
    createdAt: Date;
    quote: string;
    author: string;
    likes: number;
  };
};

export const decrementLikes = async (id: number, value: number) => {
  const updated = await prisma.forum.update({
    where: { id },
    data: {
      likes: { decrement: value },
    },
    select: {
      id: true,
      createdAt: true,
      quote: true,
      author: true,
      likes: true,
    },
  });

  return updated as {
    id: number;
    createdAt: Date;
    quote: string;
    author: string;
    likes: number;
  };
};

export const incrementShares = async (id: number, by = 1) => {
  return await prisma.forum.update({
    where: { id },
    data: { shares: { increment: by } },
  });
};
