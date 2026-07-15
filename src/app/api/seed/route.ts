import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HOBBIES } from "@/lib/hobbies";

export async function POST() {
  // Seed hobbies
  for (const h of HOBBIES) {
    await prisma.hobby.upsert({
      where: { slug: h.slug },
      update: { name: h.name, icon: h.icon, category: h.category },
      create: { slug: h.slug, name: h.name, icon: h.icon, category: h.category },
    });
  }

  // Seed venues (Jakarta sample)
  const venues = [
    { name: "Kopi Kenangan", city: "Jakarta", category: "cafe", budget: "low", tags: ["wifi", "ac"] },
    { name: "Ruangan Kerja", city: "Jakarta", category: "coworking", budget: "medium", tags: ["wifi", "quiet", "meeting_room"] },
    { name: "Taman Menteng", city: "Jakarta", category: "park", budget: "low", tags: ["outdoor", "free"] },
    { name: "Kafe Toko Dulu", city: "Bandung", category: "cafe", budget: "medium", tags: ["wifi", "aesthetic"] },
    { name: "GBK Running Track", city: "Jakarta", category: "park", budget: "low", tags: ["outdoor", "track"] },
  ];

  for (const v of venues) {
    await prisma.venue.create({ data: v });
  }

  return NextResponse.json({ success: true, message: "Hobbies & venues seeded" });
}