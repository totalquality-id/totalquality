import * as engagementController from "@/controllers/engagementController";
import { NextRequest } from "next/server";

/** Publik: jumlah untuk semua article/event sekaligus, dipakai kartu listing. */
export async function GET(req: NextRequest) {
  return engagementController.getEngagementSummary(req);
}
