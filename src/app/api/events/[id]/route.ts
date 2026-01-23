import * as eventController from "@/controllers/eventController";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return eventController.getEvent(Number(id));
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return eventController.patchEvent(Number(id), req);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return eventController.removeEvent(Number(id), req);
}
