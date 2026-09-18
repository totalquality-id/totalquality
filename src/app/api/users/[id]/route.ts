import { getUser, updateUser, removeUser } from "@/controllers/userController";
import { NextRequest } from "next/server";
import { withAdmin, withAdminOrOwner } from "@/utils/authorizedRoute";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return withAdminOrOwner(req, id, () => getUser(id));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return withAdminOrOwner(req, id, () => updateUser(id, req));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  return withAdmin(req, () => removeUser(id));
}
