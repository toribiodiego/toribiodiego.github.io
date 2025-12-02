# Local Preview Workflow

**Use this when:** You want to run the site on your local machine to test changes before pushing, preview draft content, or develop without affecting analytics.

This guide explains how to run the site locally for development and testing without triggering Google Analytics.

## Running the Site Locally

### Basic Local Server

To start a local development server:

```bash
hugo server
```

This will:
- Start a server at `http://localhost:1313`
- Enable live reload (changes rebuild automatically)
- Run in `development` environment (disables Google Analytics by default)

### With Drafts and Future Posts

To preview draft posts and posts with future dates:

```bash
hugo server --buildDrafts --buildFuture
```

Or use the shorthand:

```bash
hugo server -DF
```

### Custom Port

If port 1313 is already in use:

```bash
hugo server --port 8080
```

## Google Analytics Behavior

### Development Mode (Automatic)

Hugo automatically disables Google Analytics when running `hugo server`:

- **Development mode** (default): Analytics scripts are NOT included
- **Production mode** (hugo build): Analytics scripts ARE included

**Verifying analytics is disabled:**
1. Start: `hugo server`
2. Open `http://localhost:1313` in browser
3. Open DevTools (F12) → Network tab
4. Verify no requests to `googletagmanager.com`

**For production analytics testing:** See [../analytics/analytics-and-referrals.md](../analytics/analytics-and-referrals.md) for preview mode (`?preview=true` flag) which lets you browse the production site without triggering analytics.

## Base URL Considerations

### Development

When running `hugo server`, Hugo automatically uses `http://localhost:1313` as the base URL, overriding the `baseURL` setting in `config/_default/hugo.toml`.

This means:
- Internal links work correctly
- No manual configuration needed for local development

### Building for Production

When building the site for deployment:

```bash
hugo
```

This uses the configured `baseURL` from `hugo.toml` (`https://diegotoribio.com/`).

## Common Workflows

### Quick Preview of Changes

```bash
hugo server
```

Then open `http://localhost:1313` in your browser.

### Testing with All Content

```bash
hugo server --buildDrafts --buildFuture
```

### Production Build Test

```bash
hugo --buildDrafts --buildFuture
```

Then inspect the `public/` directory to verify the output.

## Troubleshooting

### Analytics Still Appearing Locally

If you see analytics requests in development mode:

1. Verify you're using `hugo server` (not `hugo` followed by a static file server)
2. Check that you haven't set `--environment production`
3. Clear your browser cache
4. Try in an incognito/private window

### Port Already in Use

If you see "port already in use" errors:

```bash
# Use a different port
hugo server --port 8080

# Or find and kill the process using port 1313
lsof -ti:1313 | xargs kill -9
```

### Changes Not Reflecting

If live reload isn't working:

1. Check the terminal for build errors
2. Try a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)
3. Restart the Hugo server

## Additional Resources

- [GitHub Pages Deployment Workflow](./github-pages-deployment.md)
- [Building and Deployment Guide](./building-and-deployment.md)
- [Hugo Server Command Documentation](https://gohugo.io/commands/hugo_server/)
- [Hugo Environments Documentation](https://gohugo.io/getting-started/configuration/#configure-with-environment-variables)
