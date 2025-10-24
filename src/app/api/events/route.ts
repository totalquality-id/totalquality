import * as eventController from "@/controllers/eventController";

export async function GET() {
  return eventController.getEvents();
}

export async function POST(req: Request) {
  return eventController.createEvent(req);
}
