# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

A personal recipe site published at **notes.improvisedscience.org**. Hugo static site, `recipe-book` theme (vendored under `themes/recipe-book/`). Content is Markdown with YAML frontmatter.

## Authoring rules — read first

**`STYLE_GUIDE.md` is the authoritative rule set** for all recipe content: filenames, frontmatter schema, controlled vocabularies for `categories` / `tags` / `methods` / `themes`, measurement conventions (grams-first with imperial in parens), section order, attribution, internal links. When adding or editing recipes, conform to it exactly — existing content is already brought into conformance.

Do **not** use the `archetypes/recipes.md` scaffold as a style reference; it predates the style guide and its placeholder values (`tags: new, recipe`, etc.) are wrong. Follow `STYLE_GUIDE.md` instead.

## Content sections

Three top-level sections under `content/`, each surfaced as a "cookbook" on the home page:

| Path | Label | Purpose |
|------|-------|---------|
| `content/recipes/` | My Recipes | Tested, personal recipes |
| `content/to-test/` | To Try | Aspirational queue, untested |
| `content/michael/` | The Michael Collection | Curated for Michael |

Plus taxonomy landing pages under `content/taxonomies/`, `content/methods/`, `content/themes/`.

## File conventions

- Filenames: **kebab-case, lowercase**, accents stripped, punctuation removed.
- Single-file recipe: `recipe-name.md`.
- Multi-file recipe (has images, etc.): `recipe-name/index.md` + sibling assets.
- Internal links: Hugo `ref` shortcode, e.g. `[Pâte Brisée]({{< ref "/recipes/pate-brisee" >}})`.

## Deployment

**Push to `main` → Cloudflare Pages auto-builds and deploys.** That is the production path.

- Build config lives in the Cloudflare Pages **web UI only** (no `wrangler.toml` by design — see `CLOUDFLARE_SETUP.md`).
- Build command: `hugo --minify -b https://notes.improvisedscience.org/`
- Output: `public/`
- `HUGO_VERSION`: `0.148.1`
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

## Taxonomies

Configured in `config.yaml`:

- `categories` (singular: `category`)
- `tags` (singular: `tag`)
- `methods` (singular: `method`)
- `themes` (singular: `theme`)

Controlled vocabularies for each live in `STYLE_GUIDE.md`. Prefer existing values over inventing new ones.

## MCP tools available

`hugo-reader` MCP server is registered in `.mcp.json`. Use it to discover site structure, taxonomies, and content without shelling out — faster than `grep` over `content/` for site-wide questions.

## Workflow notes

- Commits land on `main` directly (no PR requirement for this repo) and ship to production on push. Treat every commit as a live deploy.
- Keep recipe changes minimal and consistent with surrounding content — don't restructure unrelated recipes in a single commit.
