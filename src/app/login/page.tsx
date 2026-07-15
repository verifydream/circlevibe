"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/circles",
    });
    setLoading(false);
    if (!result?.error) setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <div className="mb-4 text-4xl">📧</div>
          <CardTitle>Check email kamu!</CardTitle>
          <CardDescription className="mt-2">
            Magic link terkirim ke <strong>{email}</strong>
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mb-2 text-3xl">⭕</div>
          <CardTitle>Masuk ke CircleVibe</CardTitle>
          <CardDescription>Masukkan email untuk magic link</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="raka@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Magic Link →"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/signup" className="text-purple-600 hover:underline">
            Daftar
          </Link>
        </div>
      </Card>
    </div>
  );
}