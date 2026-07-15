import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const circle = await prisma.circle.findUnique({
    where: { id },
    include: {
      host: { select: { name: true, image: true } },
      memberships: {
        include: { user: { select: { name: true, image: true } } },
      },
      meetups: { orderBy: { meetingNo: "asc" } },
    },
  });

  if (!circle) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ circle });
}

// Join circle
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const circle = await prisma.circle.findUnique({
    where: { id },
    include: { _count: { select: { memberships: true } } },
  });

  if (!circle) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (circle._count.memberships >= circle.maxMembers) {
    return NextResponse.json({ error: "Circle penuh" }, { status: 400 });
  }

  // Check if already member
  const existing = await prisma.circleMembership.findUnique({
    where: { userId_circleId: { userId: session.user.id, circleId: id } },
  });

  if (existing) {
    return NextResponse.json({ error: "Sudah bergabung" }, { status: 400 });
  }

  await prisma.circleMembership.create({
    data: {
      userId: session.user.id,
      circleId: id,
      role: "MEMBER",
      status: "APPROVED",
    },
  });

  return NextResponse.json({ success: true });
}