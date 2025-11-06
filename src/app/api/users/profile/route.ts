import { getUserProfile } from "@/controllers/userController";

export async function GET(req: Request) {
  return getUserProfile(req);
}
