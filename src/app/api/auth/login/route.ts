import { login } from "@/controllers/authController";

export async function POST(req: Request) {
  return login(req);
}
