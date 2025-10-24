import * as eventController from "@/controllers/eventController";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return eventController.getEvent(Number(params.id));
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return eventController.patchEvent(Number(params.id), req);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  return eventController.removeEvent(Number(params.id));
}
