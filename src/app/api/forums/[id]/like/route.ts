import * as forumController from "@/controllers/forumController";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return forumController.likeForum(parseInt(id));
}
