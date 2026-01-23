import * as newsController from "@/controllers/newsController";
import { NextRequest } from "next/server";

export async function GET() {
  return newsController.getNewsList();
}

export async function POST(req: NextRequest) {
  return newsController.createNews(req);
}
