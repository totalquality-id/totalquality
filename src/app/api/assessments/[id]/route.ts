// src/app/api/assessments/[id]/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return assessmentController.getAssessment(Number(id));
}
