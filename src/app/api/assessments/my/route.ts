// src/app/api/assessments/my/route.ts
import * as assessmentController from "@/controllers/assessmentController";

export async function GET(req: Request) {
  return assessmentController.getUserAssessments(req);
}
