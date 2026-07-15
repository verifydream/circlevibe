<p align="center">
  <img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<h1 align="center">⭕ CircleVibe</h1>

<p align="center">
  <strong>Bikin lingkaran kecil buat hobi yang cocok vibe-nya</strong>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#contributing">Contributing</a> ·
  <a href="#license">License</a>
</p>

---

## 📖 About

CircleVibe adalah platform web mobile-first untuk membentuk **micro-circle hobi 3–6 orang** di kota yang sama, dengan **vibe-matching** dan **toolkit pertemuan 3 kali pertama**.

### Masalah yang Diselesaikan

Banyak orang Indonesia ingin punya teman hobi/offline circle, tapi:
- Bingung mulai dari mana
- Malu join komunitas besar
- Burnout karena grup terlalu ramai dan tidak cocok vibe-nya

### Solusi

CircleVibe match kamu ke 3-5 orang dengan hobi & preferensi yang cocok, lalu bantu setup pertemuan pertama dengan agenda, venue rekomendasi, dan icebreaker.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Vibe Matching** | Matching berdasarkan hobi, budget, jadwal, personality, dan preferensi lainnya |
| ⭕ **Micro-Circle** | Lingkaran kecil 3-6 orang yang intimate |
| 📱 **WhatsApp Integration** | Koordinasi meetup langsung lewat WA |
| 🤖 **AI Content Generator** | Agenda, icebreaker, dan pesan perkenalan yang di-generate AI |
| 📍 **Venue Rekomendasi** | Daftar venue curasi per kota |
| 📊 **Circle Health Dashboard** | Tracking status circle dan meetup |
| 🔐 **Magic Link Auth** | Login tanpa password, cukup email |
| 📲 **Mobile-First PWA** | Pengalaman mobile yang optimal |

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router) + React + TypeScript |
| **Styling** | Tailwind CSS + custom component library |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL 16 + Prisma ORM |
| **Auth** | Auth.js (magic link + Google OAuth) |
| **AI** | OpenAI API (GPT-4o-mini) |
| **Deployment** | Docker Compose on VPS |
| **CI/CD** | GitHub Actions + PR-Agent (AI code review) |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (via Docker)

### Local Development

```bash
# Clone
git clone https://github.com/verifydream/circlevibe.git
cd circlevibe

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values (especially AUTH_SECRET)

# Start database
docker compose up -d db

# Run migrations
npx prisma migrate dev

# Seed data
curl -X POST http://localhost:3000/api/seed

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name
```

## 📦 Deployment

### VPS with Docker

```bash
# Clone on VPS
git clone https://github.com/verifydream/circlevibe.git
cd circlevibe

# Setup environment
cat > .env << EOF
DATABASE_URL="postgresql://circlevibe:circlevibe@db:5432/circlevibe?schema=public"
AUTH_SECRET="$(openssl rand -base64 32)"
AUTH_URL="http://YOUR_IP:3000"
NEXT_PUBLIC_APP_URL="http://YOUR_IP:3000"
OPENAI_API_KEY="your-key"
EOF

# Build and start
docker compose up -d --build

# Run migrations
docker compose exec app npx prisma migrate deploy

# Seed
docker compose exec app curl -X POST http://localhost:3000/api/seed
```

### Nginx Reverse Proxy (Optional)

```nginx
server {
    listen 80;
    server_name circlevibe.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📁 Project Structure

```
circlevibe/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Auth.js handlers
│   │   │   ├── circles/       # Circle CRUD
│   │   │   ├── matching/      # AI matching
│   │   │   ├── onboarding/    # User onboarding
│   │   │   └── venues/        # Venue data
│   │   ├── circle/            # Circle detail pages
│   │   ├── circles/           # Browse circles
│   │   ├── login/             # Login page
│   │   ├── my-circles/        # User's circles
│   │   ├── onboarding/        # Onboarding flow
│   │   ├── signup/            # Signup page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Header, Footer, Providers
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts            # Auth.js config
│   │   ├── hobbies.ts         # Hobby data
│   │   ├── matching.ts        # Matching algorithm
│   │   ├── openai.ts          # OpenAI client
│   │   ├── prisma.ts          # Prisma singleton
│   │   └── utils.ts           # Utilities
│   └── types/
│       └── index.ts           # TypeScript types
├── .github/workflows/         # CI/CD
│   ├── ci.yml                 # Build + lint + PR-Agent
│   └── pr_agent_commands.yml  # PR-Agent /commands
├── .pr_agent.toml             # PR-Agent config
├── docker-compose.yml         # Docker setup
├── Dockerfile                 # Multi-stage build
└── package.json
```

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | Auth handlers |
| POST | `/api/onboarding` | Save vibe profile |
| GET | `/api/circles` | List circles (with match scores) |
| GET | `/api/circles/[id]` | Circle detail |
| POST | `/api/circles/[id]` | Join circle |
| GET | `/api/my-circles` | User's circles |
| POST | `/api/matching` | Run AI matching |
| GET | `/api/venues` | List venues |
| POST | `/api/seed` | Seed data |

## 🤖 CI/CD with PR-Agent

CircleVibe menggunakan [PR-Agent](https://github.com/The-PR-Agent/pr-agent) untuk automated AI code review di setiap PR.

### Commands

| Command | Description |
|---------|-------------|
| `/review` | AI code review |
| `/describe` | Auto-generate PR description |
| `/improve` | Code suggestions |
| `/ask` | Ask questions about PR |
| `/test` | Generate unit tests |

### Setup

1. Add `PR_AGENT_API_KEY` secret di GitHub repo
2. PR-Agent otomatis review setiap PR yang dibuka
3. Gunakan `/review` di PR comment untuk manual trigger

## 📊 Database Schema (ERD)

```
User ─┬─ VibeProfile (1:1)
      ├─ CircleMembership ── Circle ─┬─ Meetup (1:N)
      └─ Account/Session (Auth.js)   └─ Venue (reference)

Hobby (reference data)
```

## 🔒 Security

- Auth via magic link (email) — no passwords to leak
- CSRF protection via Auth.js
- Server-side validation on all API routes
- Rate limiting recommended for production
- Input sanitization with Zod

## 📄 Documentation

- **PRD**: [Notion - CircleVibe PRD](https://app.notion.com/p/CircleVibe-39ef89a879b280eda0c2c2ab036a493c)
- **API Docs**: See [API Endpoints](#-api-endpoints) section
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and PR guidelines.

## 📝 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Built with ❤️ in Indonesia
- Inspired by the need for meaningful offline connections
- Thanks to all beta testers and early adopters

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/verifydream">CircleVibe Team</a>
</p>
