import { getApplicationsByCareer } from "@/controllers/applicationController";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const careerId = parseInt(params.id);
  return getApplicationsByCareer(careerId, req);
}