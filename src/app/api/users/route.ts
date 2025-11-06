import { getUsers } from "@/controllers/userController";

export async function GET() {
  return getUsers();
}
