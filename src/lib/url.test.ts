import { describe, expect, test } from "vite-plus/test";
import {
  DEFAULT_PREVIEW_WIDTH,
  clampPreviewWidth,
  getInitialAppState,
  normalizePreviewUrl,
} from "./url.ts";

describe("normalizePreviewUrl", () => {
  test("keeps fully qualified https urls", () => {
    expect(normalizePreviewUrl("https://example.com/docs")).toEqual({
      ok: true,
      url: "https://example.com/docs",
    });
  });

  test("adds https for naked domains", () => {
    expect(normalizePreviewUrl("example.com")).toEqual({
      ok: true,
      url: "https://example.com/",
    });
  });

  test("keeps localhost on http", () => {
    expect(normalizePreviewUrl("localhost:3000")).toEqual({
      ok: true,
      url: "http://localhost:3000/",
    });
  });

  test("keeps localhost paths on http", () => {
    expect(normalizePreviewUrl("localhost:3000/foo?x=1")).toEqual({
      ok: true,
      url: "http://localhost:3000/foo?x=1",
    });
  });

  test("keeps loopback ipv4 shorthands on http", () => {
    expect(normalizePreviewUrl("127.1:3000")).toEqual({
      ok: true,
      url: "http://127.0.0.1:3000/",
    });
  });

  test("keeps localhost subdomains on http", () => {
    expect(normalizePreviewUrl("app.localhost:3000")).toEqual({
      ok: true,
      url: "http://app.localhost:3000/",
    });
  });

  test("keeps bracketed ipv6 loopback on http", () => {
    expect(normalizePreviewUrl("[::1]:3000")).toEqual({
      ok: true,
      url: "http://[::1]:3000/",
    });
  });

  test("normalizes bare ipv6 loopback before parsing", () => {
    expect(normalizePreviewUrl("::1")).toEqual({
      ok: true,
      url: "http://[::1]/",
    });
  });

  test("accepts scheme-relative localhost input", () => {
    expect(normalizePreviewUrl("//localhost:3000")).toEqual({
      ok: true,
      url: "http://localhost:3000/",
    });
  });

  test("rejects unsupported protocols", () => {
    expect(normalizePreviewUrl("ftp://example.com")).toEqual({
      ok: false,
      error: "Only http and https URLs can be previewed here.",
    });
  });
});

describe("app state helpers", () => {
  test("clamps widths below the minimum", () => {
    expect(clampPreviewWidth(120)).toBe(240);
  });

  test("reads initial state from the query string", () => {
    expect(getInitialAppState("?url=example.com&width=999")).toEqual({
      activeUrl: "https://example.com/",
      draftUrl: "https://example.com/",
      previewWidth: 999,
    });
  });

  test("falls back cleanly when query params are missing", () => {
    expect(getInitialAppState("")).toEqual({
      activeUrl: "",
      draftUrl: "",
      previewWidth: DEFAULT_PREVIEW_WIDTH,
    });
  });
});
