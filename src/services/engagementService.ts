import prisma from "@/config/prismaConfig";

/**
 * Layanan komentar & like untuk Article dan Event.
 *
 * Keduanya memakai pasangan (targetType, targetId) supaya satu implementasi
 * melayani dua modul. Menambah modul ketiga nanti cukup menambah nilai baru di
 * TARGET_TYPES tanpa menyentuh logika di bawah.
 */
export const TARGET_TYPES = ["article", "event"] as const;
export type TargetType = (typeof TARGET_TYPES)[number];

export const COMMENT_STATUSES = ["approved", "pending", "rejected"] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];

export function isTargetType(value: unknown): value is TargetType {
  return (
    typeof value === "string" && TARGET_TYPES.includes(value as TargetType)
  );
}

/** Pastikan target yang dikomentari benar-benar ada sebelum menyimpan apa pun. */
export async function targetExists(
  targetType: TargetType,
  targetId: number
): Promise<boolean> {
  if (targetType === "article") {
    return (await prisma.article.count({ where: { id: targetId } })) > 0;
  }
  return (await prisma.event.count({ where: { id: targetId } })) > 0;
}

// ─── Komentar ────────────────────────────────────────────────────────────────

/** Komentar yang tayang di website: hanya yang sudah approved. */
export async function getApprovedComments(
  targetType: TargetType,
  targetId: number
) {
  return prisma.comment.findMany({
    where: { targetType, targetId, status: "approved" },
    orderBy: { createdAt: "desc" },
    // email dan ipHash sengaja tidak pernah ikut ke response publik.
    select: {
      id: true,
      name: true,
      content: true,
      createdAt: true,
    },
  });
}

export async function createComment(data: {
  targetType: TargetType;
  targetId: number;
  name: string;
  email?: string | null;
  content: string;
  status: CommentStatus;
  flagReason?: string | null;
  ipHash?: string | null;
}) {
  return prisma.comment.create({
    data: {
      ...data,
      email: data.email ?? null,
      flagReason: data.flagReason ?? null,
      ipHash: data.ipHash ?? null,
    },
    select: {
      id: true,
      name: true,
      content: true,
      status: true,
      createdAt: true,
    },
  });
}

/** Berapa komentar dari pengirim yang sama dalam rentang waktu tertentu. */
export async function countRecentByIpHash(ipHash: string, sinceMs: number) {
  return prisma.comment.count({
    where: { ipHash, createdAt: { gte: new Date(Date.now() - sinceMs) } },
  });
}

// ─── Moderasi (admin) ────────────────────────────────────────────────────────

export async function getCommentsForModeration(filters: {
  status?: CommentStatus;
  targetType?: TargetType;
}) {
  return prisma.comment.findMany({
    where: {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.targetType ? { targetType: filters.targetType } : {}),
    },
    orderBy: [{ createdAt: "desc" }],
  });
}

export async function updateCommentStatus(id: number, status: CommentStatus) {
  return prisma.comment.update({
    where: { id },
    data: { status, reviewedAt: new Date() },
  });
}

export async function deleteComment(id: number) {
  return prisma.comment.delete({ where: { id } });
}

/** Jumlah komentar per status, untuk badge di panel admin. */
export async function getCommentStatusCounts() {
  const rows = await prisma.comment.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const counts: Record<string, number> = {
    approved: 0,
    pending: 0,
    rejected: 0,
  };
  for (const row of rows) counts[row.status] = row._count._all;
  counts.total = counts.approved + counts.pending + counts.rejected;
  return counts;
}

// ─── Like ────────────────────────────────────────────────────────────────────

/**
 * Toggle like. Mengembalikan jumlah terbaru dan status like pengunjung ini.
 * Unique constraint (targetType, targetId, visitorKey) yang menjamin satu
 * browser hanya terhitung sekali.
 */
export async function toggleReaction(
  targetType: TargetType,
  targetId: number,
  visitorKey: string
) {
  const existing = await prisma.reaction.findUnique({
    where: {
      targetType_targetId_visitorKey: { targetType, targetId, visitorKey },
    },
    select: { id: true },
  });

  if (existing) {
    await prisma.reaction.delete({ where: { id: existing.id } });
  } else {
    // create bisa bertabrakan kalau user klik dua kali sangat cepat;
    // abaikan konflik karena hasil akhirnya sama-sama "sudah like".
    await prisma.reaction
      .create({ data: { targetType, targetId, visitorKey } })
      .catch(() => undefined);
  }

  const likes = await prisma.reaction.count({
    where: { targetType, targetId },
  });

  return { likes, liked: !existing };
}

export async function getEngagement(
  targetType: TargetType,
  targetId: number,
  visitorKey?: string | null
) {
  const [likes, comments, liked] = await Promise.all([
    prisma.reaction.count({ where: { targetType, targetId } }),
    prisma.comment.count({
      where: { targetType, targetId, status: "approved" },
    }),
    visitorKey
      ? prisma.reaction.count({
          where: { targetType, targetId, visitorKey },
        })
      : Promise.resolve(0),
  ]);

  return { likes, comments, liked: liked > 0 };
}

/**
 * Ringkasan untuk banyak target sekaligus.
 *
 * Dipakai kartu di beranda dan halaman listing supaya tidak memanggil API
 * satu per satu untuk tiap kartu (N+1 request dari browser).
 */
export async function getEngagementSummary(targetType: TargetType) {
  const [reactions, comments] = await Promise.all([
    prisma.reaction.groupBy({
      by: ["targetId"],
      where: { targetType },
      _count: { _all: true },
    }),
    prisma.comment.groupBy({
      by: ["targetId"],
      where: { targetType, status: "approved" },
      _count: { _all: true },
    }),
  ]);

  const summary: Record<number, { likes: number; comments: number }> = {};

  for (const row of reactions) {
    summary[row.targetId] = {
      likes: row._count._all,
      comments: 0,
    };
  }
  for (const row of comments) {
    summary[row.targetId] = {
      likes: summary[row.targetId]?.likes ?? 0,
      comments: row._count._all,
    };
  }

  return summary;
}
