import * as newsController from "@/controllers/newsController";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return newsController.getNews(Number(params.id));
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return newsController.patchNews(Number(params.id), req);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  return newsController.removeNews(Number(params.id));
}
