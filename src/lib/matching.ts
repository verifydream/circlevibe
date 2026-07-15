import { VibeProfile } from "@/types";

interface CircleCandidate {
  id: string;
  hobby: string;
  city: string;
  members: number;
  maxMembers: number;
  hostProfile: VibeProfile;
}

interface MatchResult {
  circleId: string;
  score: number;
  reasons: string[];
}

export function calculateVibeScore(
  profile: VibeProfile,
  circle: CircleCandidate
): MatchResult {
  let score = 0;
  const reasons: string[] = [];
  const host = circle.hostProfile;

  // Hobby match (0-30 points)
  if (profile.hobbies.includes(circle.hobby)) {
    score += 30;
    reasons.push("Hobby cocok");
  }

  // City match (0-20 points) - required
  if (profile.city === circle.city) {
    score += 20;
    reasons.push("Satu kota");
  } else {
    return { circleId: circle.id, score: 0, reasons: ["Beda kota"] };
  }

  // Budget compatibility (0-15 points)
  const budgetOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
  const budgetDiff = Math.abs(
    (budgetOrder[profile.budget] ?? 1) - (budgetOrder[host.budget] ?? 1)
  );
  if (budgetDiff === 0) {
    score += 15;
    reasons.push("Budget pas");
  } else if (budgetDiff === 1) {
    score += 8;
    reasons.push("Budget lumayan cocok");
  }

  // Personality compatibility (0-15 points)
  if (profile.personality === host.personality) {
    score += 15;
    reasons.push("Gaya ngobrol mirip");
  } else if (
    profile.personality === "ambivert" || host.personality === "ambivert"
  ) {
    score += 10;
    reasons.push("Ada ambivert, fleksibel");
  } else {
    score += 3;
  }

  // Religion preference (0-10 points)
  if (
    profile.religiPref === "no_pref" ||
    host.religiPref === "no_pref" ||
    profile.religiPref === host.religiPref
  ) {
    score += 10;
    reasons.push("Preferensi agama cocok");
  }

  // Schedule overlap (0-10 points)
  const scheduleOverlap = profile.schedule.filter((s) =>
    host.schedule.includes(s)
  );
  if (scheduleOverlap.length > 0) {
    score += 10;
    reasons.push(`Jadwal cocok: ${scheduleOverlap.length} slot`);
  }

  return { circleId: circle.id, score, reasons };
}

export function rankCircles(
  profile: VibeProfile,
  circles: CircleCandidate[]
): MatchResult[] {
  return circles
    .map((circle) => calculateVibeScore(profile, circle))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
