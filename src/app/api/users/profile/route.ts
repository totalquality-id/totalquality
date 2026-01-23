import { getUserProfile } from "@/controllers/userController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getUserProfile(req);
}
