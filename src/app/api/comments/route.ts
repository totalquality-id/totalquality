import * as engagementController from "@/controllers/engagementController";
import { NextRequest } from "next/server";

/** Publik: komentar yang sudah tayang untuk satu article/event. */
export async function GET(req: NextRequest) {
  return engagementController.listPublicComments(req);
}

/** Publik: kirim komentar (moderasi hybrid, tanpa perlu login). */
export async function POST(req: NextRequest) {
  return engagementController.postComment(req);
}
