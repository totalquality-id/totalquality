import {
  getApplicationById,
  updateApplicationStatus,
} from "@/controllers/applicationController";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  return getApplicationById(id, req);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  return updateApplicationStatus(id, req);
}
