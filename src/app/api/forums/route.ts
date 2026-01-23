import * as forumController from "@/controllers/forumController";
import { NextRequest } from "next/server";

export async function GET() {
  return forumController.getForums();
}

export async function POST(req: NextRequest) {
  return forumController.createForum(req);
}
