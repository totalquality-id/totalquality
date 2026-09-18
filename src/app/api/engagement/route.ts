import * as engagementController from "@/controllers/engagementController";
import { NextRequest } from "next/server";

/** Publik: jumlah like & komentar satu target, plus status like pengunjung. */
export async function GET(req: NextRequest) {
  return engagementController.getEngagement(req);
}
