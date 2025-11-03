import { NextRequest } from "next/server";
import * as careerController from "@/controllers/careerController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return await careerController.getCareer(parseInt(id));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return await careerController.patchCareer(parseInt(id), req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return await careerController.removeCareer(parseInt(id));
}