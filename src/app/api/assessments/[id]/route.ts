// src/app/api/assessments/[id]/route.ts
import * as assessmentController from "@/controllers/assessmentController";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return assessmentController.getAssessment(Number(id));
}
