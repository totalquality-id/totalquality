import * as serviceController from "@/controllers/serviceController";

export async function GET() {
  return serviceController.getServices();
}

export async function POST(req: Request) {
  return serviceController.postService(req);
}
