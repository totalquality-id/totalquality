// src/app/api/assessments/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { NextRequest } from "next/server";
import { withAdmin } from "@/utils/authorizedRoute";

export async function POST(req: NextRequest) {
  return assessmentController.createAssessment(req);
}

export async function GET(request: Request) {
  return withAdmin(request, assessmentController.getAllAssessments);
}
