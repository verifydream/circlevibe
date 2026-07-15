"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { HOBBIES, SCHEDULES, BUDGET_OPTIONS, CITIES } from "@/lib/hobbies";

const STEPS = ["Hobi & Lokasi", "Vibe & Preferensi", "Jadwal"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    hobbies: [] as string[],
    customHobby: "",
    city: "",
    budget: "medium",
    personality: "ambivert",
    genderPref: "any",
    religiPref: "no_pref",
    alcoholPref: "no_pref",
    channel: "whatsapp",
    schedule: [] as string[],
  });

  const update = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/circles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      {/* Progress */}
      <div className="mb-8 flex justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= step
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${
                i <= step ? "text-purple-600" : "text-gray-400"
              } hidden sm:inline`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <Card>
        {step === 0 && (
          <>
            <CardHeader>
              <CardTitle>apa hobi kamu? 🎯</CardTitle>
            </CardHeader>
            <div className="space-y-6">
              <CheckboxGroup
                label="Pilih hobi utama"
                options={HOBBIES.map((h) => ({
                  value: h.slug,
                  label: h.name,
                  icon: h.icon,
                }))}
                selected={form.hobbies}
                onChange={(v) => update("hobbies", v)}
                max={5}
              />
              <Input
                label="Hobi lain (opsional)"
                placeholder="Misal: berkebun, panjat tebing..."
                value={form.customHobby}
                onChange={(e) => update("customHobby", e.target.value)}
              />
              <Select
                label="Kota"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                options={[
                  { value: "", label: "Pilih kota..." },
                  ...CITIES.map((c) => ({ value: c, label: c })),
                ]}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>vibe kamu seperti apa? ✨</CardTitle>
            </CardHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget nongkrong</label>
                <div className="flex gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b.slug}
                      type="button"
                      onClick={() => update("budget", b.slug)}
                      className={`flex-1 rounded-xl border p-3 text-center text-sm transition-all ${
                        form.budget === b.slug
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-lg">{b.icon}</div>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <Select
                label="Gaya ngobrol"
                value={form.personality}
                onChange={(e) => update("personality", e.target.value)}
                options={[
                  { value: "introvert", label: "Introvert — suka ngobrol pelan & mendalam" },
                  { value: "ambivert", label: "Ambivert — fleksibel" },
                  { value: "extrovert", label: "Extrovert — suka rame & seru" },
                ]}
              />

              <Select
                label="Preferensi gender di circle"
                value={form.genderPref}
                onChange={(e) => update("genderPref", e.target.value)}
                options={[
                  { value: "any", label: "Terserah" },
                  { value: "male", label: "Cowok aja" },
                  { value: "female", label: "Cewek aja" },
                ]}
              />

              <Select
                label="Preferensi religi"
                value={form.religiPref}
                onChange={(e) => update("religiPref", e.target.value)}
                options={[
                  { value: "no_pref", label: "Terserah" },
                  { value: "muslim", label: "Muslim" },
                  { value: "non-muslim", label: "Non-muslim" },
                ]}
              />

              <Select
                label="Channel utama"
                value={form.channel}
                onChange={(e) => update("channel", e.target.value)}
                options={[
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "telegram", label: "Telegram" },
                ]}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>kapan biasa luang? 📅</CardTitle>
            </CardHeader>
            <div className="space-y-6">
              <CheckboxGroup
                label="Pilih jadwal yang cocok"
                options={SCHEDULES.map((s) => ({
                  value: s.slug,
                  label: s.label,
                }))}
                selected={form.schedule}
                onChange={(v) => update("schedule", v)}
              />
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              ← Kembali
            </Button>
          ) : (
            <div />
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Lanjut →</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Menyimpan..." : "Temukan Circle-mu! ⭕"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}