// src/app/api/assessments/stats/route.ts
import * as assessmentController from "@/controllers/assessmentController";

export async function GET() {
  return assessmentController.getStats();
}
