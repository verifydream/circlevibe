export const HOBBIES = [
  { slug: "coding", name: "Ngoding", icon: "💻", category: "tech" },
  { slug: "product", name: "Product/UX", icon: "🎨", category: "tech" },
  { slug: "photography", name: "Fotografi", icon: "📸", category: "creative" },
  { slug: "drawing", name: "Menggambar", icon: "✏️", category: "creative" },
  { slug: "music", name: "Musik", icon: "🎵", category: "creative" },
  { slug: "boardgame", name: "Boardgame", icon: "🎲", category: "social" },
  { slug: "running", name: "Lari", icon: "🏃", category: "sport" },
  { slug: "gym", name: "Gym/Fitness", icon: "💪", category: "sport" },
  { slug: "japanese", name: "Belajar Bahasa Jepang", icon: "🇯🇵", category: "learning" },
  { slug: "english", name: "Belajar Bahasa Inggris", icon: "🇬🇧", category: "learning" },
  { slug: "cooking", name: "Masak", icon: "🍳", category: "creative" },
  { slug: "reading", name: "Baca Buku", icon: "📚", category: "learning" },
  { slug: "hiking", name: "Hiking", icon: "⛰️", category: "sport" },
  { slug: "gaming", name: "Gaming", icon: "🎮", category: "social" },
  { slug: "traveling", name: "Traveling", icon: "✈️", category: "social" },
] as const;

export const SCHEDULES = [
  { slug: "weekday_morning", label: "Weekday Pagi (08-12)" },
  { slug: "weekday_afternoon", label: "Weekday Siang (12-17)" },
  { slug: "weekday_evening", label: "Weekday Malam (17-21)" },
  { slug: "weekend_morning", label: "Weekend Pagi (08-12)" },
  { slug: "weekend_afternoon", label: "Weekend Siang (12-17)" },
  { slug: "weekend_evening", label: "Weekend Malam (17-21)" },
] as const;

export const CITIES = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Malang",
  "Medan",
  "Makassar",
  "Bali",
  "Tangerang",
  "Depok",
  "Bekasi",
] as const;

export const BUDGET_OPTIONS = [
  { slug: "low", label: "Hemat (Rp 0-30rb)", icon: "💚" },
  { slug: "medium", label: "Sedang (Rp 30-75rb)", icon: "💛" },
  { slug: "high", label: "Premium (Rp 75rb+)", icon: "🧡" },
] as const;