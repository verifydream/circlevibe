import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    hobbies,
    customHobby,
    city,
    budget,
    personality,
    genderPref,
    religiPref,
    alcoholPref,
    channel,
    schedule,
  } = body;

  // Upsert vibe profile
  await prisma.vibeProfile.upsert({
    where: { userId: session.user.id },
    update: {
      hobbies,
      customHobby: customHobby || null,
      budget,
      personality,
      genderPref,
      religiPref,
      alcoholPref,
      channel,
      schedule,
    },
    create: {
      userId: session.user.id,
      hobbies,
      customHobby: customHobby || null,
      budget,
      personality,
      genderPref,
      religiPref,
      alcoholPref,
      channel,
      schedule,
    },
  });

  // Update user city
  await prisma.user.update({
    where: { id: session.user.id },
    data: { city },
  });

  return NextResponse.json({ success: true });
}