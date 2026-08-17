<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design Context

Read these two files before you write or change any UI:

- **[PRODUCT.md](PRODUCT.md)** (strategy): register `brand`. The study chooser (16 to 22) reads first, the parent reads second, and a coach must want to join. Voice is human, calm, honest, with "je" for everybody. Answer the search question before you offer the service. Anti-references: corporate consultancy, government website, SaaS landing page, gamified app, and the old site's own statistics bar.
- **[DESIGN.md](DESIGN.md)** (visual): committed ochre on warm paper, one humanist sans at all sizes, flat surfaces, restrained motion. Currently a seed file; re-run `/impeccable document` when real tokens exist.

The old site is archived at `../studiekeuzeadvies archive/` (514 pages as markdown and HTML, 219 media files, sitemaps, redirect map). Use it as the content source. The rights to all of it are bought, so nothing there is off limits: the coach biographies, the photos and the customer stories are ours to use. One thing still needs judgement, and it is not a rights question: a number must be true of *us* before it goes on the page. See PRODUCT.md, "Inherited Content and Open Questions".

# Where the work and the facts live

- **Open work is GitHub issues, and only GitHub issues.** `gh issue list`. This repo carried a `todos.md` next to them until 2026-08-17, and a second list drifts: issue `#11` sat closed while the same job stood open in the file. Its open items are now issues `#11` and `#15` to `#56`. Close the issue when the work lands, file one when you find work, and do not start a third list.
- **[docs/decisions.md](docs/decisions.md)** holds the decisions already taken, with the date and the reason, including the ones that were reversed. Read it before you re-open one.
- **What was measured lives in `docs/`.** `rebuild-review.md` measures the rebuild against the archive, `url-map.csv` resolves all 522 old URLs to a new URL and an action, `redirects.md` explains why that table looks the way it does, and `five-pages-brief.md` holds the removal rules that every page written after 2026-08-05 obeys.

# When you add a page

Three things this repo cannot do for you:

- **Re-run `python3 scripts/build-url-map.py`.** It reads the routes on disk, so a new page drops its own parked redirect. Forget it and the parked redirect stands in front of the new page, which Next would serve before the filesystem. The build catches that (`app/sitemap.ts` throws), so it is a nuisance and not a risk.
- **Add a new static route to `staticPaths` in `app/sitemap.ts`.** Cities and articles add themselves; a new folder under `app/` does not, because Next 16 exposes no API that enumerates its own routes.
- **Give a new city its `at` point in `app/cities.ts`.** It is required, so the compiler asks for it. The map on the home page works out its own centre and zoom from those points.
