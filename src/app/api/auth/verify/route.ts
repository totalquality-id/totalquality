import { verifyToken } from "@/controllers/authController";

export async function GET(req: Request) {
  return verifyToken(req);
}
