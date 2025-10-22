import * as forumController from "@/controllers/forumController";

export async function GET() {
  return forumController.getForums();
}

export async function POST(req: Request) {
  return forumController.createForum(req);
}
