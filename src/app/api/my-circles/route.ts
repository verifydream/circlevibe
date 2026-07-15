import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await prisma.circleMembership.findMany({
    where: { userId: session.user.id },
    include: {
      circle: {
        select: { name: true, hobby: true, city: true },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  const circlesWithMeetups = await Promise.all(
    memberships.map(async (m) => {
      const meetupCount = await prisma.meetup.count({
        where: { circleId: m.circleId, status: "COMPLETED" },
      });
      return {
        id: m.circleId,
        status: m.status,
        circle: m.circle,
        meetupCount,
      };
    })
  );

  return NextResponse.json({ circles: circlesWithMeetups });
}
