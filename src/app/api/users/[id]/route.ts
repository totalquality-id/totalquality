import { getUser, updateUser, removeUser } from "@/controllers/userController";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return getUser(id);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return updateUser(id, req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return removeUser(id);
}
