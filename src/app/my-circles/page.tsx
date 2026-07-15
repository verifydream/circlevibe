"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MyCircle {
  id: string;
  name: string;
  hobby: string;
  status: string;
  circle: {
    name: string;
    hobby: string;
    city: string;
  };
  meetupCount: number;
}

export default function MyCirclesPage() {
  const [circles, setCircles] = useState<MyCircle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-circles")
      .then((r) => r.json())
      .then((data) => setCircles(data.circles || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">My Circles</h1>
      <p className="mb-8 text-gray-500">Circle yang kamu ikuti</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
        </div>
      ) : circles.length === 0 ? (
        <Card className="py-12 text-center">
          <div className="mb-4 text-4xl">⭕</div>
          <CardTitle>Belum ada circle</CardTitle>
          <CardDescription className="mt-2">
            Gabung circle pertama kamu!
          </CardDescription>
        </Card>
      ) : (
        <div className="space-y-3">
          {circles.map((mc) => (
            <Link key={mc.id} href={`/circle/${mc.id}`}>
              <Card className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{mc.circle.name}</CardTitle>
                    <CardDescription>
                      {mc.circle.hobby} · {mc.circle.city}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        mc.status === "APPROVED" ? "success" : "warning"
                      }
                    >
                      {mc.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}