import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const category = searchParams.get("category");

  const venues = await prisma.venue.findMany({
    where: {
      isActive: true,
      ...(city ? { city } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ venues });
}