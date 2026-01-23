import * as forumController from "@/controllers/forumController";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return forumController.shareForum(parseInt(id));
}
