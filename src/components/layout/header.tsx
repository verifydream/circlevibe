"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⭕</span>
          <span className="text-xl font-bold text-purple-600">CircleVibe</span>
        </Link>
        <nav className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/circles">
                <Button variant="ghost" size="sm">Jelajahi</Button>
              </Link>
              <Link href="/my-circles">
                <Button variant="ghost" size="sm">My Circles</Button>
              </Link>
              <Link href="/onboarding">
                <Button size="sm">{session.user?.name || "Profile"}</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Masuk</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Mulai Gratis</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}