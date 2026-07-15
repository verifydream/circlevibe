import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rankCircles } from "@/lib/matching";
import type { VibeProfile } from "@/types";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  if (!user?.profile) {
    return NextResponse.json({ error: "Lengkapi profil dulu" }, { status: 400 });
  }

  // Find circles in same city
  const circles = await prisma.circle.findMany({
    where: {
      city: user.city || undefined,
      status: { in: ["MATCHING", "ACTIVE"] },
    },
    include: {
      host: { include: { profile: true } },
      _count: { select: { memberships: true } },
    },
  });

  const ranked = rankCircles(
    {
      hobbies: user.profile.hobbies,
      budget: user.profile.budget,
      personality: user.profile.personality,
      religiPref: user.profile.religiPref,
      alcoholPref: user.profile.alcoholPref,
      schedule: user.profile.schedule,
      genderPref: user.profile.genderPref,
      channel: user.profile.channel,
      city: user.city || "",
    },
    circles
      .filter((c: typeof circles[number]) => c._count.memberships < c.maxMembers)
      .map((c: typeof circles[number]) => ({
        id: c.id,
        hobby: c.hobby,
        city: c.city,
        members: c._count.memberships,
        maxMembers: c.maxMembers,
        hostProfile: {
          hobbies: c.host.profile?.hobbies || [c.hobby],
          budget: c.host.profile?.budget || "medium",
          personality: c.host.profile?.personality || "ambivert",
          religiPref: c.host.profile?.religiPref || "no_pref",
          alcoholPref: c.host.profile?.alcoholPref || "no_pref",
          schedule: c.host.profile?.schedule || [],
          genderPref: c.host.profile?.genderPref || "any",
          channel: c.host.profile?.channel || "whatsapp",
          city: c.city,
        },
      }))
  );

  return NextResponse.json({ matches: ranked });
}