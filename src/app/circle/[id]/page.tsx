"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CircleDetail {
  id: string;
  name: string;
  description: string;
  hobby: string;
  city: string;
  status: string;
  maxMembers: number;
  host: { name: string; image: string | null };
  memberships: {
    id: string;
    role: string;
    status: string;
    user: { name: string; image: string | null };
  }[];
  meetups: {
    id: string;
    meetingNo: number;
    title: string;
    venue: string;
    date: string;
    agenda: string;
    icebreaker: string;
    status: string;
  }[];
}

export default function CircleDetailPage() {
  const { id } = useParams();
  const [circle, setCircle] = useState<CircleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/circles/${id}`)
      .then((r) => r.json())
      .then((data) => setCircle(data.circle))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!circle) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Circle tidak ditemukan
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{circle.name}</h1>
            <p className="mt-1 text-gray-500">{circle.description}</p>
          </div>
          <Badge variant="secondary">{circle.hobby}</Badge>
        </div>
        <div className="mt-4 flex gap-2 text-sm text-gray-500">
          <span>📍 {circle.city}</span>
          <span>·</span>
          <span>
            👥 {circle.memberships.length}/{circle.maxMembers} member
          </span>
          <span>·</span>
          <span>Host: {circle.host.name}</span>
        </div>
      </div>

      {/* Members */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Anggota</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          {circle.memberships.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-700">
                {m.user.name?.[0] || "?"}
              </div>
              <span className="text-sm">{m.user.name}</span>
              {m.role === "HOST" && (
                <Badge variant="warning" className="text-[10px]">Host</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Meetups */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Jadwal Meetup</CardTitle>
          <CardDescription>3 pertemuan pertama yang sudah diatur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {circle.meetups.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada jadwal meetup</p>
            ) : (
              circle.meetups.map((meetup) => (
                <div
                  key={meetup.id}
                  className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Meet #{meetup.meetingNo}: {meetup.title}
                      </h4>
                      {meetup.venue && (
                        <p className="text-sm text-gray-500">
                          📍 {meetup.venue}
                        </p>
                      )}
                      {meetup.date && (
                        <p className="text-sm text-gray-500">
                          📅 {new Date(meetup.date).toLocaleDateString("id-ID")}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        meetup.status === "COMPLETED" ? "success" : "default"
                      }
                    >
                      {meetup.status}
                    </Badge>
                  </div>
                  {meetup.agenda && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-700 dark:text-gray-300">📋 Agenda:</p>
                      <p className="whitespace-pre-line">{meetup.agenda}</p>
                    </div>
                  )}
                  {meetup.icebreaker && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-700 dark:text-gray-300">🧊 Icebreaker:</p>
                      <p>{meetup.icebreaker}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* WA Group Link */}
      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">WhatsApp Group</h4>
            <p className="text-sm text-gray-500">
              Koordinasi meetup lewat WA
            </p>
          </div>
          <Button
            onClick={() => {
              const text = encodeURIComponent(
                `Halo! 👋 Aku dari CircleVibe. Yuk kenalan! Siapa nama dan hobi kalian?`
              );
              window.open(`https://wa.me/?text=${text}`, "_blank");
            }}
          >
            Buka WA Group →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}