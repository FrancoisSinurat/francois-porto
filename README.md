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

Personal projects use a **simplified Neekosa-style** flow (office has `dev → staging → prod`; here staging is skipped):

```
feature/* ──PR (+ CI)──► dev ──(auto Promote workflow)──► master
   │                      │                                │
   └─ Vercel Preview      └─ Vercel Preview                └─ Vercel Production
                                                              francois-porto.vercel.app
```

| Branch | Role | Deploy |
| --- | --- | --- |
| `feature/*` | Work in progress | Vercel Preview URL |
| `dev` | Integration / “ready” | Preview + **auto-promotes to `master`** |
| `master` | Production | `francois-porto.vercel.app` |
| `staging` | Unused for personal (optional leftover) | — |

### Day-to-day

1. Branch from `dev`: `git checkout -b feature/nama-fitur`
2. Push → Vercel **Preview** + CI on PR
3. Open **PR → `dev`**, wait until Lint & Build is green, then merge
4. Workflow **Promote Dev to Prod** syncs `dev` → `master`
5. Vercel redeploys production automatically

Hot-fix only: PR straight into `master` (rare).

### Vercel dashboard (one-time)

Project → **Settings → Git**:

1. **Production Branch** = `master` (required for this flow)
2. Keep **Preview Deployments** on for non-production branches / PRs

CI: `.github/workflows/ci.yml`  
Promote: `.github/workflows/promote-dev-to-prod.yml`
