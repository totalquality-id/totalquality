import { getUsers } from "@/controllers/userController";
import { withAdmin } from "@/utils/authorizedRoute";

export async function GET(request: Request) {
  return withAdmin(request, getUsers);
}
