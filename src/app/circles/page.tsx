"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CircleData {
  id: string;
  name: string;
  description: string;
  hobby: string;
  city: string;
  _count: { memberships: number };
  maxMembers: number;
  matchScore?: number;
}

export default function CirclesPage() {
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/circles")
      .then((r) => r.json())
      .then((data) => setCircles(data.circles || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Jelajahi Circle</h1>
        <p className="text-gray-500">Temukan circle hobi yang cocok buat kamu</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
        </div>
      ) : circles.length === 0 ? (
        <Card className="py-12 text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <CardTitle>Belum ada circle</CardTitle>
          <CardDescription className="mt-2">
            Jadilah yang pertama bikin circle di kota kamu!
          </CardDescription>
          <Link href="/onboarding">
            <Button className="mt-4">Mulai Onboarding →</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {circles.map((circle) => (
            <Link key={circle.id} href={`/circle/${circle.id}`}>
              <Card className="cursor-pointer transition-all hover:ring-2 hover:ring-purple-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{circle.name}</CardTitle>
                    {circle.matchScore && (
                      <Badge variant="success">
                        {Math.round(circle.matchScore)}% match
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{circle.description}</CardDescription>
                </CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="secondary">{circle.hobby}</Badge>
                  <span>📍 {circle.city}</span>
                  <span className="ml-auto">
                    {circle._count.memberships}/{circle.maxMembers} member
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}