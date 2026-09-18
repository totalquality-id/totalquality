import * as engagementController from "@/controllers/engagementController";
import { withAdmin } from "@/utils/authorizedRoute";
import { NextRequest } from "next/server";

/** Admin: seluruh komentar apa pun statusnya, plus jumlah per status. */
export async function GET(req: NextRequest) {
  return withAdmin(req, () => engagementController.listForModeration(req));
}
