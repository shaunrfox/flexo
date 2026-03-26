export const DEFAULT_PREVIEW_WIDTH = 375;
const MIN_PREVIEW_WIDTH = 240;

type PreviewUrlResult =
  | {
      ok: true;
      url: string;
    }
  | {
      error: string;
      ok: false;
    };

type InitialAppState = {
  activeUrl: string;
  draftUrl: string;
  previewWidth: number;
};

function isPrivateHostname(hostname: string): boolean {
  const trimmedHost = hostname.trim().toLowerCase();
  const bracketIndex = trimmedHost.indexOf("]");
  const normalizedHost = trimmedHost.startsWith("[")
    ? trimmedHost.slice(1, bracketIndex === -1 ? trimmedHost.length : bracketIndex)
    : trimmedHost.replace(/:\d+$/, "");

  if (
    normalizedHost === "localhost" ||
    normalizedHost.endsWith(".localhost") ||
    normalizedHost === "127.0.0.1" ||
    normalizedHost === "0.0.0.0" ||
    normalizedHost === "::1"
  ) {
    return true;
  }

  if (normalizedHost.startsWith("127.")) {
    return true;
  }

  if (normalizedHost.startsWith("10.") || normalizedHost.startsWith("192.168.")) {
    return true;
  }

  const parts = normalizedHost.split(".");
  if (parts.length === 4 && parts.every((part) => /^\d+$/.test(part))) {
    const [first, second] = parts.map(Number);
    return first === 172 && second >= 16 && second <= 31;
  }

  return false;
}

function getAuthorityCandidate(value: string): string {
  const normalized = value.replace(/^\/\//, "");
  return normalized.split(/[/?#]/, 1)[0] ?? "";
}

function normalizeSchemeLessInput(value: string): string {
  const normalized = value.replace(/^\/\//, "");
  if (/^::1(?:[/?#]|$)/i.test(normalized)) {
    return `[::1]${normalized.slice(3)}`;
  }
  return normalized;
}

export function clampPreviewWidth(width: number, maxWidth = 1440): number {
  return Math.min(
    Math.max(Math.round(width), MIN_PREVIEW_WIDTH),
    Math.max(MIN_PREVIEW_WIDTH, maxWidth),
  );
}

export function normalizePreviewUrl(input: string): PreviewUrlResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      ok: false,
      error: "Enter a URL or localhost address to preview.",
    };
  }

  if (!trimmed.includes("://")) {
    const normalizedInput = normalizeSchemeLessInput(trimmed);
    const authorityCandidate = getAuthorityCandidate(normalizedInput);
    const prefixed = `${isPrivateHostname(authorityCandidate) ? "http" : "https"}://${normalizedInput}`;

    try {
      const parsed = new URL(prefixed);
      return { ok: true, url: parsed.toString() };
    } catch {
      return {
        ok: false,
        error: "That input does not look like a valid URL.",
      };
    }
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return {
        ok: false,
        error: "Only http and https URLs can be previewed here.",
      };
    }

    return { ok: true, url: parsed.toString() };
  } catch {
    return {
      ok: false,
      error: "That input does not look like a valid URL.",
    };
  }
}

export function getInitialAppState(search: string): InitialAppState {
  const params = new URLSearchParams(search);
  const initialUrl = params.get("url")?.trim() ?? "";
  const initialWidthParam = params.get("width");
  const initialWidth = initialWidthParam ? Number(initialWidthParam) : Number.NaN;
  const normalizedUrl = initialUrl ? normalizePreviewUrl(initialUrl) : null;

  return {
    activeUrl: normalizedUrl?.ok ? normalizedUrl.url : "",
    draftUrl: normalizedUrl?.ok ? normalizedUrl.url : initialUrl,
    previewWidth: Number.isFinite(initialWidth)
      ? clampPreviewWidth(initialWidth)
      : DEFAULT_PREVIEW_WIDTH,
  };
}
