import { NextRequest } from "next/server";
import * as careerController from "@/controllers/careerController";

export async function GET() {
  return await careerController.getCareers();
}

export async function POST(req: NextRequest) {
  return await careerController.createCareer(req);
}
