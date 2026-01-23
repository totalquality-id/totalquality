import { verifyToken } from "@/controllers/authController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return verifyToken(req);
}
