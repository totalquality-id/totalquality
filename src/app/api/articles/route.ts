import * as articleController from "@/controllers/articleController";
import { NextRequest } from "next/server";

export async function GET() {
  return articleController.getArticleList();
}

export async function POST(req: NextRequest) {
  return articleController.createArticle(req);
}
