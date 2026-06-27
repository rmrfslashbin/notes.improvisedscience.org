# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

A personal recipe site published at **notes.improvisedscience.org**. Hugo static site, `recipe-book` theme (vendored under `themes/recipe-book/`). Content is Markdown with YAML frontmatter.

## Authoring rules — read `STYLE_GUIDE.md`

**`STYLE_GUIDE.md` is the single source of truth for recipe authoring.** It covers filenames and directory layout, frontmatter schema, controlled vocabularies for `categories` / `tags` / `methods` / `themes`, measurement conventions, section order, attribution, and internal links. **Read it before adding or editing any recipe** and conform exactly — existing content is already in conformance.

Do **not** use the `archetypes/recipes.md` scaffold as a style reference; it predates the style guide and its placeholder values (`tags: new, recipe`, etc.) are wrong.

## Content sections

Three top-level sections under `content/`, each surfaced as a "cookbook" on the home page:

| Path | Label | Purpose |
|------|-------|---------|
| `content/recipes/` | My Recipes | Tested, personal recipes |
| `content/to-test/` | To Try | Aspirational queue, untested |
| `content/michael/` | The Michael Collection | Curated for Michael |

Plus taxonomy landing pages under `content/taxonomies/`, `content/methods/`, `content/themes/`. Taxonomies (`categories`, `tags`, `methods`, `themes`) are configured in `config.yaml`; controlled vocabularies for each live in `STYLE_GUIDE.md`.

## Deployment

**Push to `main` → Cloudflare Pages auto-builds and deploys.** That is the production path.

- Build config lives in the Cloudflare Pages **web UI only** (no `wrangler.toml` by design — see `CLOUDFLARE_SETUP.md`).
- Build command: `hugo --minify -b https://notes.improvisedscience.org/`
- Output: `public/`
- `HUGO_VERSION`: `0.163.3`
- Production branch: `main`; automatic deploys enabled.

The `Makefile`'s `deploy` target (`hugo deploy`) is a manual/legacy path and is **not** what production uses. Do not run it expecting it to ship the site.

GitHub Actions workflows in this repo do not build or deploy the site:

- `pushover-notices.yml` — sends Pushover notifications on push / PR / issue / release.
- `claude.yml` — responds to `@claude` mentions in issues, PR comments, and reviews.
- `claude-code-review.yml` — automated Claude review on PR open / sync / reopen.

## Local development

```bash
make run     # hugo server (live reload)
make build   # clean public/, build once
```

`make run` requires `themes/papermod/README.md` to exist per the install check — note the actual theme is `recipe-book`; if the check fails, it's a stale Makefile guard, not a real missing dependency.

## MCP tools available

`hugo-reader` MCP server is registered in `.mcp.json`. Use it to discover site structure, taxonomies, and content without shelling out — faster than `grep` over `content/` for site-wide questions.

## Workflow notes

- Commits land on `main` directly (no PR requirement for this repo) and ship to production on push. Treat every commit as a live deploy.
- Keep recipe changes minimal and consistent with surrounding content — don't restructure unrelated recipes in a single commit.
- **Always check the current local date/time (`date`) before setting a recipe's `date:` frontmatter.** Hugo defaults to `buildFuture: false` (not overridden in `config.yaml`), so any recipe whose `date` is later than the Cloudflare build time will silently not render. Set the `date` to the current time or earlier — never to a future timestamp.
