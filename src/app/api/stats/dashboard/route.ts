// src/app/api/stats/dashboard/route.ts
//
// Satu endpoint ringkasan untuk Dashboard admin. Sebelumnya panel admin
// memanggil /users/count, /careers/count, /applications/count dan
// /events/count yang tidak pernah ada, sehingga semua kartu selalu 0.

import prisma from "@/config/prismaConfig";
import { withAdmin } from "@/utils/authorizedRoute";
import { handleError, successResponse } from "@/utils/apiResponse";

export async function GET(request: Request) {
  return withAdmin(request, getDashboardStats);
}

async function getDashboardStats() {
  try {
    const now = new Date();

    const [
      users,
      careers,
      applications,
      pendingApplications,
      events,
      upcomingEvents,
      articles,
      services,
      consultations,
      forums,
      assessments,
    ] = await prisma.$transaction([
      prisma.user.count(),
      prisma.career.count(),
      prisma.application.count(),
      prisma.application.count({ where: { status: "pending" } }),
      prisma.event.count(),
      prisma.event.count({ where: { date: { gte: now } } }),
      prisma.article.count(),
      prisma.service.count(),
      prisma.consultation.count(),
      prisma.forum.count(),
      prisma.assessmentResult.count(),
    ]);

    return successResponse({
      users,
      careers,
      applications,
      pendingApplications,
      events,
      upcomingEvents,
      articles,
      services,
      consultations,
      forums,
      assessments,
    });
  } catch (error) {
    return handleError(error);
  }
}
