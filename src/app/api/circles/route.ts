import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  // Get circles in same city
  const circles = await prisma.circle.findMany({
    where: {
      status: "ACTIVE",
      ...(user?.city ? { city: user.city } : {}),
    },
    include: {
      _count: { select: { memberships: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Filter circles with available slots
  const availableCircles = circles.filter(
    (c: typeof circles[number]) => c._count.memberships < c.maxMembers
  );

  // Calculate match scores if user has profile
  let scoredCircles = availableCircles;
  if (user?.profile) {
    const { calculateVibeScore } = await import("@/lib/matching");
    scoredCircles = availableCircles
      .map((circle: typeof circles[number]) => ({
        ...circle,
        matchScore: calculateVibeScore(
          {
            hobbies: user.profile!.hobbies,
            budget: user.profile!.budget,
            personality: user.profile!.personality,
            religiPref: user.profile!.religiPref,
            alcoholPref: user.profile!.alcoholPref,
            schedule: user.profile!.schedule,
            genderPref: user.profile!.genderPref,
            channel: user.profile!.channel,
            city: user.city || "",
          },
          {
            id: circle.id,
            hobby: circle.hobby,
            city: circle.city,
            members: circle._count.memberships,
            maxMembers: circle.maxMembers,
            hostProfile: {
              hobbies: [circle.hobby],
              budget: "medium" as const,
              personality: "ambivert" as const,
              religiPref: "no_pref" as const,
              alcoholPref: "no_pref" as const,
              schedule: [],
              genderPref: "any" as const,
              channel: "whatsapp" as const,
              city: circle.city,
            },
          }
        ).score,
      }))
      .sort(
        (
          a: typeof circles[number] & { matchScore?: number },
          b: typeof circles[number] & { matchScore?: number }
        ) => (b.matchScore ?? 0) - (a.matchScore ?? 0)
      );
  }

  return NextResponse.json({ circles: scoredCircles });
}
