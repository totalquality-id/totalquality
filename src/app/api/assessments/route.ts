// src/app/api/assessments/route.ts
import * as assessmentController from "@/controllers/assessmentController";

export async function POST(req: Request) {
  return assessmentController.createAssessment(req);
}

export async function GET() {
  return assessmentController.getAllAssessments();
}
