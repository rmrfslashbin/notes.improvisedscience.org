# Cloudflare Pages Configuration

This project uses a combination of repository-based configuration (`wrangler.toml`) and Cloudflare Pages web UI settings.

## Repository Configuration (wrangler.toml)

The following settings are managed via the `wrangler.toml` file in this repository:

- **Build command**: `hugo -b https://notes.improvisedscience.org/`
- **Environment variables**: `HUGO_VERSION = "0.148.1"`
- **Environment-specific builds**: Different commands for production vs preview

## Manual Web UI Configuration Required

The following settings must be configured manually in the Cloudflare Pages dashboard:

### Build Configuration
- **Build output**: `public`
- **Root directory**: (leave empty)
- **Build comments**: Enabled
- **Build cache**: Disabled
- **Build system version**: Version 2

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