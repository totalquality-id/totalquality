import * as eventController from "@/controllers/eventController";
import { NextRequest } from "next/server";

export async function GET() {
  return eventController.getEvents();
}

export async function POST(req: NextRequest) {
  return eventController.createEvent(req);
}
