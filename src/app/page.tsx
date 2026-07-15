import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: "🎯",
    title: "Vibe Matching",
    desc: "Bukan cuma hobi sama — budget, jadwal, dan gaya ngobrol juga dipertimbangkan.",
  },
  {
    icon: "⭕",
    title: "Micro-Circle 3-6 Orang",
    desc: "Lingkaran kecil yang intimate. Kenal beneran, bukan sekadar nama di grup ratusan orang.",
  },
  {
    icon: "🤝",
    title: "Toolkit 3 Meetup Pertama",
    desc: "Venue rekomendasi, icebreaker, dan agenda — biar gak awkward di pertemuan pertama.",
  },
  {
    icon: "📱",
    title: "Integrasi WhatsApp",
    desc: "Semua koordinasi di WA. Gak perlu pindah platform — link langsung jadi grup.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="mb-6 text-6xl">⭕</div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Bikin lingkaran kecil
          <br />
          <span className="text-purple-600">buat hobi yang cocok vibe-nya</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-gray-500 dark:text-gray-400">
          Temukan 3-5 orang dengan hobi & preferensi yang match. Meetup offline
          rutin, bukan sekadar chat di grup ratusan orang yang akhirnya sepi.
        </p>
        <div className="flex gap-3">
          <Link href="/signup">
            <Button size="lg">Mulai Gratis →</Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">Pelajari Lebih</Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Sudah ada <strong>200+</strong> circle terbentuk · <strong>50+</strong> meetup terlaksana
        </p>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Kenapa CircleVibe?</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">3 Langkah Saja</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Isi Profil", desc: "Hobi, jadwal, budget, dan preferensi vibe kamu." },
            { step: "2", title: "Dapat Circle", desc: "AI match kamu ke 3-5 orang yang cocok di kotamu." },
            { step: "3", title: "Meetup!", desc: "WA group otomatis, agenda meet pertama siap." },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                {s.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Siap ketemu circle-mu?</h2>
        <p className="mb-8 text-gray-500">Gratis, cepat, dan gak awkward.</p>
        <Link href="/signup">
          <Button size="lg">Mulai Sekarang →</Button>
        </Link>
      </section>
    </div>
  );
}