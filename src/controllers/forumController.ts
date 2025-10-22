import * as forumService from "@/services/forumService";

export const getForums = async () => {
  const forums = await forumService.getAllForums();
  return Response.json(forums);
};

export const getForum = async (id: number) => {
  const f = await forumService.getForumById(id);
  if (!f)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return Response.json(f);
};

export const createForum = async (req: Request) => {
  const body = await req.json();
  if (!body.quote || !body.author) {
    return new Response(
      JSON.stringify({ message: "quote and author required" }),
      { status: 400 }
    );
  }
  const created = await forumService.createForum({
    quote: body.quote,
    author: body.author,
  });
  return new Response(JSON.stringify(created), { status: 201 });
};

export const patchForum = async (id: number, req: Request) => {
  const body = await req.json();
  const updated = await forumService.updateForum(id, body);
  return Response.json(updated);
};

export const removeForum = async (id: number) => {
  await forumService.deleteForum(id);
  return new Response(null, { status: 204 });
};

export const likeForum = async (id: number) => {
  const updated = await forumService.incrementLikes(id, 1);
  return Response.json({ likes: updated.likes });
};

export const unlikeForum = async (id: number) => {
  const updated = await forumService.decrementLikes(id, 1);
  return Response.json({ likes: Math.max(updated.likes, 0) });
};

export const shareForum = async (id: number) => {
  const updated = await forumService.incrementShares(id, 1);
  return Response.json({ shares: updated.shares });
};
