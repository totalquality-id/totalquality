import { NextRequest } from "next/server";
import * as careerController from "@/controllers/careerController";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return await careerController.applyCareer(parseInt(id), req);
}
