import { getAllApplications } from "@/controllers/applicationController";

export async function GET(req: Request) {
  return getAllApplications(req);
}
