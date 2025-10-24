import * as newsController from "@/controllers/newsController";

export async function GET() {
  return newsController.getNewsList();
}

export async function POST(req: Request) {
  return newsController.createNews(req);
}
