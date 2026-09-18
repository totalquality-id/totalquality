// src/app/api/assessments/[id]/route.ts
import * as assessmentController from "@/controllers/assessmentController";
import { NextRequest } from "next/server";
import { withAdmin } from "@/utils/authorizedRoute";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdmin(request, () => assessmentController.getAssessment(Number(id)));
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdmin(request, () =>
    assessmentController.removeAssessment(Number(id))
  );
}
