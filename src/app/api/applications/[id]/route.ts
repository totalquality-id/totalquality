import {
  getApplicationById,
  removeApplication,
  updateApplicationStatus,
} from "@/controllers/applicationController";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // <-- Ubah tipe menjadi Promise
) {
  const resolvedParams = await params; // <-- Await params-nya
  const id = parseInt(resolvedParams.id);

  return getApplicationById(id, req);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // <-- Ubah tipe menjadi Promise
) {
  const resolvedParams = await params; // <-- Await params-nya
  const id = parseInt(resolvedParams.id);

  return updateApplicationStatus(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  return removeApplication(id, req);
}
