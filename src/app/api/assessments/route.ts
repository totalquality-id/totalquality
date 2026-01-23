// src/app/api/assessments/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return assessmentController.createAssessment(req);
}

export async function GET() {
  return assessmentController.getAllAssessments();
}
