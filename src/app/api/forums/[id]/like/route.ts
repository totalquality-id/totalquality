import * as forumController from "@/controllers/forumController";
import { NextRequest } from "next/server";
import { enforceRateLimit, getClientIp } from "@/utils/rateLimit";
import { handleError } from "@/utils/apiResponse";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Endpoint ini sengaja tetap anonim supaya pengunjung yang belum login bisa
  // berinteraksi. Rate limit per IP + per post menahan counter dipompa massal
  // tanpa mengubah perilaku pengunjung biasa.
  try {
    enforceRateLimit(`forum:like:${getClientIp(req)}:${id}`, {
      limit: 10,
      windowMs: 60 * 60 * 1000,
      message: "Terlalu banyak interaksi. Coba lagi nanti.",
    });
  } catch (error) {
    return handleError(error);
  }

  return forumController.likeForum(parseInt(id));
}
