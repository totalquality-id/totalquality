import * as serviceController from "@/controllers/serviceController";
import { NextRequest } from "next/server";

export async function GET() {
  return serviceController.getServices();
}

export async function POST(req: NextRequest) {
  return serviceController.postService(req);
}
