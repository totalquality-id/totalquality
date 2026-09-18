import * as engagementController from "@/controllers/engagementController";
import { NextRequest } from "next/server";

/** Publik: toggle like tanpa login, dedup lewat visitorKey milik browser. */
export async function POST(req: NextRequest) {
  return engagementController.toggleReaction(req);
}
