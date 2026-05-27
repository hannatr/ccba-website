# Cayuga County Bar Association — website

Public website for the **Cayuga County Bar Association** (Auburn and Cayuga County, New York): mission and officers, membership information, a searchable member directory, public legal resources, and related pages.

## Tech stack

| Area           | Choices                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| App & routing  | [TanStack Start](https://tanstack.com/start) (React 19), [TanStack Router](https://tanstack.com/router) |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) v4, [shadcn/ui](https://ui.shadcn.com/)                        |
| Data           | [Drizzle ORM](https://orm.drizzle.team/), [Neon](https://neon.tech/) (Postgres)                         |
| Build & deploy | [Vite](https://vitejs.dev/), [Nitro](https://nitro.unjs.io/) with the **Vercel** preset                 |

## Prerequisites

- **Node.js** 20+ (18+ may work; match your deployment runtime)
- **pnpm** (recommended) or npm/yarn

## Getting started

```bash
pnpm install
cp .env.example .env
```

Edit `.env` with your values (see below), then:

```bash
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable        | Purpose                                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`  | Neon Postgres connection string. Required in production for **Membership**, **Lost Wills**, **Officers** (home page), and **Committees**. Locally, omit or use an empty database to show empty sections. |
| `VITE_SITE_URL` | Public site origin **without** a trailing slash (e.g. `https://www.example.org`). Used for canonical URLs and absolute Open Graph image URLs.                                                            |

## Database

Apply the schema to Neon (from the project root, with `DATABASE_URL` set):

```bash
pnpm db:push
```

Creates/updates `members`, `lost_will_holders`, `officers`, and `committee_members` (and any other tables defined in `src/db/schema.ts`).

## Scripts

| Command             | Description                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `pnpm dev`          | Start the Vite dev server (port **3000**).                                                  |
| `pnpm build`        | Production build (Vercel output under `.vercel/output` when using the Nitro Vercel preset). |
| `pnpm preview`      | Preview the production build locally.                                                       |
| `pnpm start`        | Run the Node server from `.output/server` (for non-Vercel Node deployments).                |
| `pnpm test`         | Run Vitest.                                                                                 |
| `pnpm lint`         | Run ESLint ([`@tanstack/eslint-config`](https://tanstack.com/config/latest/docs/eslint)).   |
| `pnpm format`       | Format the repo with Prettier (`printWidth` 140 — see `prettier.config.js`).                |
| `pnpm format:check` | Check formatting without writing files.                                                     |
| `pnpm db:push`      | Push the Drizzle schema with `drizzle-kit push`.                                            |
| `pnpm db:generate`  | Generate SQL migrations with Drizzle Kit.                                                   |

## Deploying on Vercel

1. Create a Neon database and add **`DATABASE_URL`** in the Vercel project → Environment Variables (Production and Preview).
2. Set **`VITE_SITE_URL`** to the live site URL (no trailing slash).
3. Run **`pnpm db:push`** once against production from a trusted environment with production `DATABASE_URL`, or adopt Drizzle migrations if you prefer.
4. Connect the Git repository and deploy; the Nitro Vercel preset produces **`.vercel/output`** during **`pnpm build`**.
5. Configure the custom domain under Vercel → Domains and update DNS as instructed.

## Static assets

- **Hero images:** per-route banners are configured in `src/content/images.ts` (`heroByPath`). Add or replace files under `public/images/` and update that map. Open Graph previews use the same image as each page’s hero.

## Editing site content

Static copy and structured data live under `src/content/`:

| File                  | Contents                        |
| --------------------- | ------------------------------- |
| `mission.ts`          | Mission / constitution excerpts |
| `membership-rules.ts` | Membership rules copy           |
| `resources.ts`        | Public resource links           |

Officers and committee rosters are stored in Neon (`officers` and `committee_members` tables), not in `src/content/`.

Always verify legal and roster text against your authoritative documents (PDFs, resolutions, etc.).

## Local `docs/` directory

PDFs and other working files can live in a local **`docs/`** folder. That path is **gitignored** and is not deployed with the site.

## UI toolkit (maintainers)

The interface uses a shadcn **Start** preset (radix base, stone, Remix Icon, Raleway). To re-initialize or refresh the preset from upstream:

```bash
yes yes | head -20 | npx shadcn@latest init -f -y -t start --base radix -p b1aIuQ2XC --reinstall
```

## License

Add a **`LICENSE`** file that matches your organization’s policy (and any third-party notice requirements) before or when you publish the repository on GitHub.
