import * as engagementService from "@/services/engagementService";
import {
  COMMENT_STATUSES,
  isTargetType,
  type CommentStatus,
  type TargetType,
} from "@/services/engagementService";
import {
  MAX_CONTENT_LENGTH,
  MAX_NAME_LENGTH,
  MIN_CONTENT_LENGTH,
  RECENT_WINDOW_MS,
  hashIp,
  moderateComment,
} from "@/utils/commentModeration";
import { ApiError, handleError, successResponse } from "@/utils/apiResponse";
import { enforceRateLimit, getClientIp } from "@/utils/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** visitorKey dibuat browser (UUID). Batasi bentuknya agar tidak jadi celah. */
const VISITOR_KEY_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;

function parseTarget(url: URL): { targetType: TargetType; targetId: number } {
  const targetType = url.searchParams.get("targetType");
  const targetId = Number(url.searchParams.get("targetId"));

  if (!isTargetType(targetType)) {
    throw new ApiError(400, 'targetType harus "article" atau "event"');
  }
  if (!Number.isInteger(targetId) || targetId <= 0) {
    throw new ApiError(400, "targetId tidak valid");
  }

  return { targetType, targetId };
}

// ─── Publik ──────────────────────────────────────────────────────────────────

/** GET /api/comments?targetType=&targetId= — hanya komentar yang sudah tayang. */
export const listPublicComments = async (req: Request) => {
  try {
    const { targetType, targetId } = parseTarget(new URL(req.url));
    const comments = await engagementService.getApprovedComments(
      targetType,
      targetId
    );
    return successResponse(comments);
  } catch (error) {
    return handleError(error);
  }
};

/** POST /api/comments — moderasi hybrid: lolos filter langsung tayang. */
export const postComment = async (req: Request) => {
  try {
    const ip = getClientIp(req);

    // Lapisan pertama: batasi frekuensi sebelum menyentuh database.
    enforceRateLimit(`comment:${ip}`, {
      limit: 8,
      windowMs: 60 * 60 * 1000,
      message: "Terlalu banyak komentar dari jaringan ini. Coba lagi nanti.",
    });

    const body = await req.json();

    if (!isTargetType(body.targetType)) {
      throw new ApiError(400, 'targetType harus "article" atau "event"');
    }
    const targetId = Number(body.targetId);
    if (!Number.isInteger(targetId) || targetId <= 0) {
      throw new ApiError(400, "targetId tidak valid");
    }

    if (typeof body.name !== "string" || typeof body.content !== "string") {
      throw new ApiError(400, "name dan content harus berupa teks");
    }

    const name = body.name.trim();
    const content = body.content.trim();

    if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
      throw new ApiError(
        400,
        `Nama harus antara 2 sampai ${MAX_NAME_LENGTH} karakter`
      );
    }
    if (content.length < MIN_CONTENT_LENGTH) {
      throw new ApiError(400, "Komentar terlalu pendek");
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new ApiError(
        400,
        `Komentar maksimal ${MAX_CONTENT_LENGTH} karakter`
      );
    }

    let email: string | null = null;
    if (body.email !== undefined && body.email !== null && body.email !== "") {
      if (typeof body.email !== "string" || !EMAIL_PATTERN.test(body.email)) {
        throw new ApiError(400, "Format email tidak valid");
      }
      email = body.email.trim().toLowerCase();
    }

    if (!(await engagementService.targetExists(body.targetType, targetId))) {
      throw new ApiError(404, "Artikel atau event tidak ditemukan");
    }

    const ipHash = hashIp(ip);
    const recentFromSameSender = await engagementService.countRecentByIpHash(
      ipHash,
      RECENT_WINDOW_MS
    );

    const verdict = moderateComment({
      content,
      honeypot: body.website, // nama field honeypot di form
      elapsedMs: body.elapsedMs,
      recentFromSameSender,
    });

    const created = await engagementService.createComment({
      targetType: body.targetType,
      targetId,
      name,
      email,
      content,
      status: verdict.status,
      flagReason: verdict.flagReason,
      ipHash,
    });

    // Bot tidak perlu tahu bahwa ia terdeteksi; responsnya dibuat sama dengan
    // komentar yang masuk antrean supaya tidak bisa dipakai menebak filter.
    const pending = verdict.status !== "approved";

    return successResponse(
      {
        comment: pending ? null : created,
        status: pending ? "pending" : "approved",
        message: pending
          ? "Komentar Anda terkirim dan sedang ditinjau sebelum ditampilkan."
          : "Komentar Anda sudah tayang.",
      },
      201
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Format JSON tidak valid"));
    }
    return handleError(error);
  }
};

/** GET /api/engagement?targetType=&targetId=&visitorKey= */
export const getEngagement = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const { targetType, targetId } = parseTarget(url);

    const visitorKey = url.searchParams.get("visitorKey");
    const safeKey =
      visitorKey && VISITOR_KEY_PATTERN.test(visitorKey) ? visitorKey : null;

    const data = await engagementService.getEngagement(
      targetType,
      targetId,
      safeKey
    );
    return successResponse(data);
  } catch (error) {
    return handleError(error);
  }
};

/** GET /api/engagement/summary?targetType= — jumlah untuk semua kartu sekaligus. */
export const getEngagementSummary = async (req: Request) => {
  try {
    const targetType = new URL(req.url).searchParams.get("targetType");
    if (!isTargetType(targetType)) {
      throw new ApiError(400, 'targetType harus "article" atau "event"');
    }

    const summary = await engagementService.getEngagementSummary(targetType);
    return successResponse(summary);
  } catch (error) {
    return handleError(error);
  }
};

/** POST /api/reactions — toggle like. */
export const toggleReaction = async (req: Request) => {
  try {
    enforceRateLimit(`reaction:${getClientIp(req)}`, {
      limit: 60,
      windowMs: 60 * 60 * 1000,
      message: "Terlalu banyak interaksi. Coba lagi nanti.",
    });

    const body = await req.json();

    if (!isTargetType(body.targetType)) {
      throw new ApiError(400, 'targetType harus "article" atau "event"');
    }
    const targetId = Number(body.targetId);
    if (!Number.isInteger(targetId) || targetId <= 0) {
      throw new ApiError(400, "targetId tidak valid");
    }
    if (
      typeof body.visitorKey !== "string" ||
      !VISITOR_KEY_PATTERN.test(body.visitorKey)
    ) {
      throw new ApiError(400, "visitorKey tidak valid");
    }

    if (!(await engagementService.targetExists(body.targetType, targetId))) {
      throw new ApiError(404, "Artikel atau event tidak ditemukan");
    }

    const result = await engagementService.toggleReaction(
      body.targetType,
      targetId,
      body.visitorKey
    );
    return successResponse(result);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Format JSON tidak valid"));
    }
    return handleError(error);
  }
};

// ─── Admin ───────────────────────────────────────────────────────────────────

/** GET /api/comments/moderation?status=&targetType= */
export const listForModeration = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const targetType = url.searchParams.get("targetType");

    if (status && !COMMENT_STATUSES.includes(status as CommentStatus)) {
      throw new ApiError(
        400,
        `status harus salah satu dari: ${COMMENT_STATUSES.join(", ")}`
      );
    }
    if (targetType && !isTargetType(targetType)) {
      throw new ApiError(400, 'targetType harus "article" atau "event"');
    }

    const [comments, counts] = await Promise.all([
      engagementService.getCommentsForModeration({
        status: (status as CommentStatus) ?? undefined,
        targetType: isTargetType(targetType) ? targetType : undefined,
      }),
      engagementService.getCommentStatusCounts(),
    ]);

    return successResponse({ comments, counts });
  } catch (error) {
    return handleError(error);
  }
};

export const patchCommentStatus = async (id: number, req: Request) => {
  try {
    if (!id || isNaN(id)) throw new ApiError(400, "ID komentar tidak valid");

    const body = await req.json();
    if (!COMMENT_STATUSES.includes(body.status)) {
      throw new ApiError(
        400,
        `status harus salah satu dari: ${COMMENT_STATUSES.join(", ")}`
      );
    }

    const updated = await engagementService.updateCommentStatus(
      id,
      body.status
    );
    return successResponse(updated);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return handleError(new ApiError(400, "Format JSON tidak valid"));
    }
    return handleError(error);
  }
};

export const removeComment = async (id: number) => {
  try {
    if (!id || isNaN(id)) throw new ApiError(400, "ID komentar tidak valid");
    await engagementService.deleteComment(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
};
