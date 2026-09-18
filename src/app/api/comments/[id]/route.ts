import * as engagementController from "@/controllers/engagementController";
import { withAdmin } from "@/utils/authorizedRoute";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

/** Admin: setujui, tolak, atau kembalikan ke antrean. */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return withAdmin(req, () =>
    engagementController.patchCommentStatus(Number(id), req)
  );
}

/** Admin: hapus permanen. */
export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return withAdmin(req, () => engagementController.removeComment(Number(id)));
}
