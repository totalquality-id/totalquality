// src/app/api/assessments/stats/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { withAdmin } from "@/utils/authorizedRoute";

export async function GET(request: Request) {
  return withAdmin(request, assessmentController.getStats);
}
