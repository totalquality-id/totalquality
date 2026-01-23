// src/app/api/assessments/my/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return assessmentController.getUserAssessments(req);
}
