# Resume Lab

Single source of truth for your public profile and resume formats.

## Architecture

- `data/resume.json`: canonical resume content
- `scripts/build.mjs`: deterministic multi-format generator
- `dist/index.html`: personal marketing site
- `dist/resume-ats.html`: ATS-first one-page resume
- `dist/resume-modern.html`: designed one-page resume
- `dist/resume-slides.html`: web slide deck

## Usage

```bash
cd /Users/hungkienluu/resume-lab
npm run build
```

Preview locally:

```bash
npm run dev
```

Then open http://localhost:8080.

## Vercel Auto Deploy

This repo is configured for Vercel via:

- `vercel.json` for build/output settings
- `.github/workflows/vercel-deploy.yml` for deploy on every PR (`preview`) and push to `main` (`production`)

Set these GitHub Actions secrets in `hungkienluu/resume-lab`:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

How to get IDs:

1. Run `npx vercel link` once in this repo.
2. Open `.vercel/project.json` and copy `orgId` and `projectId`.
3. Add those values as GitHub secrets.

## Workflow

1. Edit `data/resume.json` only.
2. Run `npm run build` locally to verify.
3. Push to GitHub.
4. Vercel deploys automatically (preview for PRs, production for `main`).

## Next upgrades

- Add role-targeted variants from same source (`ai-lab`, `startup`, `general`).
- Add AI-assisted edit checks (fact consistency and metric validation) before publish.
