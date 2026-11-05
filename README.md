This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Branch & deploy flow

```
feature/* ──PR──► dev ──PR──► staging ──PR──► master
   │               │            │              │
   └─ Vercel       └─ Vercel    └─ Vercel      └─ Vercel
      Preview         Preview      Preview        Production
```

| Branch | Role | Vercel |
| --- | --- | --- |
| `feature/*` | Work in progress | Preview URL per branch / PR |
| `dev` | Integration / daily | Preview (optional custom domain) |
| `staging` | Release candidate | Preview / Staging environment |
| `master` | Production | Production domain |

### Day-to-day

1. `git checkout -b feature/nama-fitur` from `dev` (or `master` if hot-fixing prod).
2. Push → Vercel spins a **Preview** automatically.
3. Open PR → `dev` (CI runs lint + build).
4. When ready to freeze a release: PR `dev` → `staging`.
5. When ready to go live: PR `staging` → `master`.

### Vercel dashboard (one-time)

In the Vercel project → **Settings → Git / Environments**:

1. **Production Branch** = `master`
2. Keep **Preview Deployments** enabled for all non-production branches / PRs
3. Optional: create custom environments named `Development` (`dev`) and `Staging` (`staging`) and attach domains (e.g. `dev.yoursite.com`, `staging.yoursite.com`)

No extra deploy script is required — Vercel deploys on every push/PR once the GitHub repo is connected. GitHub Actions CI (`.github/workflows/ci.yml`) gates merges with lint + build.
