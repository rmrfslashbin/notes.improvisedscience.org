# Cloudflare Pages Configuration

This project uses Cloudflare Pages web UI configuration only. A `wrangler.toml` file is **not recommended** for static site builds like Hugo, as it's primarily designed for Pages Functions.

## Why No wrangler.toml?

- Cloudflare Pages `wrangler.toml` is designed for **Functions configuration** (bindings, KV, D1, etc.)
- Build commands and environment variables work best through the **web UI**
- Static site generators like Hugo don't need the complexity of `wrangler.toml`

## Required Web UI Configuration

The following settings must be configured manually in the Cloudflare Pages dashboard:

### Build Configuration
- **Build command**: `hugo --minify -b https://notes.improvisedscience.org/`
- **Build output**: `public`
- **Root directory**: (leave empty)
- **Build comments**: Enabled
- **Build cache**: Disabled
- **Build system version**: Version 2

### Environment Variables
- **HUGO_VERSION**: `0.148.1`

### Branch Control
- **Production branch**: `main`
- **Automatic deployments**: Enabled

### Build Watch Paths
- **Include paths**: `*`

### Runtime Settings
- **Placement**: Default
- **Compatibility date**: Dec 30, 2024
- **Compatibility flags**: (none)
- **Fail open/closed**: Fail open

### General Settings
- **Name**: `notes-improvisedscience-org`
- **Access policy**: Enabled

## Setup Instructions

1. **Connect Repository**: Link your GitHub repository `rmrfslashbin/notes.improvisedscience.org` to Cloudflare Pages

2. **Configure Manual Settings**: Set the manual settings listed above in the Cloudflare Pages dashboard

3. **Deploy**: Cloudflare Pages will automatically use the `wrangler.toml` configuration for builds

## Notes

- The `wrangler.toml` file overrides equivalent settings in the web UI
- Environment variables in the web UI are supplemented by those in `wrangler.toml`
- If you need to change build settings, prefer updating `wrangler.toml` for version control
- Some advanced features (deploy hooks, notifications, bindings) can only be configured via the web UI

## Troubleshooting

If builds fail after repository changes:
1. Check that Hugo version is compatible with theme requirements
2. Verify all required Hugo modules/themes are properly referenced
3. Ensure build output directory (`public`) matches Cloudflare Pages configuration