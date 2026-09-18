import { NextRequest } from "next/server";
import * as careerController from "@/controllers/careerController";

export async function GET(req: NextRequest) {
  return await careerController.getCareers(req);
}

export async function POST(req: NextRequest) {
  return await careerController.createCareer(req);
}
