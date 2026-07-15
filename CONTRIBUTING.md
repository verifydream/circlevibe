# Contributing to CircleVibe

Terima kasih sudah mau berkontribusi! 🎉

## Development Setup

```bash
# Clone
git clone https://github.com/verifydream/circlevibe.git
cd circlevibe

# Install
npm install

# Setup env
cp .env.example .env
# Edit .env with your values

# Database
docker compose up -d db
npx prisma migrate dev
npx prisma db seed

# Run
npm run dev
```

## PR Guidelines

1. Buat branch dari `develop`: `git checkout -b feat/nama-fitur`
2. Commit messages: `feat:`, `fix:`, `chore:`, `docs:`
3. Pastikan `npm run lint` dan `npm run build` passes
4. Buka PR ke `develop` — PR-Agent akan auto-review
5. Deskripsikan perubahan dengan jelas

## Code Standards

- TypeScript strict mode
- ESLint + Prettier
- Component naming: PascalCase
- File naming: kebab-case
- API routes: RESTful

## Architecture

- **Next.js App Router** — FE + BE dalam satu project
- **Prisma** — ORM untuk PostgreSQL
- **Auth.js** — Authentication (magic link + Google)
- **Tailwind CSS** — Styling

## Questions?

Buka issue atau hubungi maintainers.
