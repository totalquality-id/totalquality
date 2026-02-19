/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "./authMiddleware";

export async function adminOnlyMiddleware(req: NextRequest) {
  try {
    requireAdmin(req as unknown as Request);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }
}
