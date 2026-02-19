import { getApplicationsByCareer } from "@/controllers/applicationController";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const careerId = parseInt(resolvedParams.id);
  return getApplicationsByCareer(careerId, req);
}
