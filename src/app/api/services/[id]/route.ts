import * as serviceController from "@/controllers/serviceController";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return serviceController.getService(parseInt(id));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return serviceController.updateService(parseInt(id), request);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return serviceController.removeService(parseInt(id));
}
