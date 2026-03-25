# Flexy Plexy Returns

A fresh rebuild of the old Flexiblewidth app on React 19, Vite+, and `@okshaun/components`.

## What it does

- Launches a live URL or localhost target in two iframe previews.
- Compares a fluid preview against a fixed-width viewport.
- Supports preset widths plus drag resizing in split mode.
- Persists the active URL and selected width in the query string.

## Run locally

```bash
vp install
vp dev
```

Then open the local Vite URL shown in the terminal.

## Verify

```bash
vp check
vp test
vp build
```

## GitHub Pages prep

The Vite config supports a Pages build via `GITHUB_PAGES=true`. For this repo name:

```bash
vp run build:pages
```

To override the base path, set `GITHUB_PAGES_BASE` before the build.
