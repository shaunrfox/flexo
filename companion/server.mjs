import { createServer } from "node:http";
import process from "node:process";
import JSZip from "jszip";
import { chromium } from "playwright";

const COMPANION_HOST = "127.0.0.1";
const COMPANION_PORT = 43127;
const DEFAULT_ALLOWED_ORIGINS = new Set(["http://localhost:5173", "http://127.0.0.1:5173"]);

const allowedOrigins = new Set(DEFAULT_ALLOWED_ORIGINS);

for (const origin of [
  process.env.FLEXO_PRODUCTION_ORIGIN,
  ...(process.env.FLEXO_ALLOWED_ORIGINS?.split(",") ?? []),
]) {
  const normalized = origin?.trim();
  if (normalized) {
    allowedOrigins.add(normalized);
  }
}

let browserPromise;

function sendJson(response, statusCode, body, origin) {
  response.writeHead(statusCode, {
    ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

function assertAllowedOrigin(request) {
  const origin = request.headers.origin;

  if (!origin || !allowedOrigins.has(origin)) {
    const error = new Error("Origin is not allowed.");
    error.statusCode = 403;
    throw error;
  }

  return origin;
}

function assertJsonRequest(request) {
  const contentType = request.headers["content-type"] ?? "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    const error = new Error("Expected application/json request body.");
    error.statusCode = 415;
    throw error;
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(Object.assign(new Error("Request body is too large."), { statusCode: 413 }));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error("Request body must be valid JSON."), { statusCode: 400 }));
      }
    });
    request.on("error", reject);
  });
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw Object.assign(new Error("Request body must be an object."), { statusCode: 400 });
  }

  const { captures, url } = payload;

  let parsedUrl;
  try {
    parsedUrl = new URL(String(url));
  } catch {
    throw Object.assign(new Error("The provided URL is invalid."), { statusCode: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw Object.assign(new Error("Only http and https URLs can be captured."), {
      statusCode: 400,
    });
  }

  if (!Array.isArray(captures) || captures.length === 0) {
    throw Object.assign(new Error("At least one capture width is required."), { statusCode: 400 });
  }

  return {
    captures: captures.map((capture, index) => {
      if (!capture || typeof capture !== "object") {
        throw Object.assign(new Error(`Capture ${index + 1} is invalid.`), { statusCode: 400 });
      }

      const label = String(capture.label ?? "").trim();
      const width = Number(capture.width);

      if (!label) {
        throw Object.assign(new Error(`Capture ${index + 1} must include a label.`), {
          statusCode: 400,
        });
      }

      if (!Number.isFinite(width) || width < 240) {
        throw Object.assign(new Error(`Capture "${label}" must include a valid width.`), {
          statusCode: 400,
          label,
        });
      }

      return {
        label,
        width: Math.round(width),
      };
    }),
    url: parsedUrl.toString(),
  };
}

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = chromium.launch({ headless: true });
  }

  return browserPromise;
}

async function captureSingle(browser, url, capture) {
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    viewport: {
      height: 900,
      width: capture.width,
    },
  });

  try {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(500);

    return await page.screenshot({
      fullPage: true,
      type: "png",
    });
  } finally {
    await context.close();
  }
}

async function handleCaptureBatch(request, response, origin) {
  assertJsonRequest(request);
  const payload = validatePayload(await readJsonBody(request));
  const browser = await getBrowser();
  const zip = new JSZip();

  try {
    for (const capture of payload.captures) {
      let image;

      try {
        image = await captureSingle(browser, payload.url, capture);
      } catch (error) {
        throw Object.assign(
          new Error(error instanceof Error ? error.message : "Screenshot capture failed."),
          { label: capture.label },
        );
      }

      zip.file(`${capture.label}-${capture.width}px.png`, image);
    }
  } catch (error) {
    const label = error?.label;
    const message = error instanceof Error ? error.message : "Screenshot capture failed.";
    sendJson(response, 502, { error: message, ...(label ? { label } : {}) }, origin);
    return;
  }

  const archive = await zip.generateAsync({
    compression: "DEFLATE",
    type: "nodebuffer",
  });

  response.writeHead(200, {
    "Access-Control-Allow-Origin": origin,
    "Content-Type": "application/zip",
    Vary: "Origin",
  });
  response.end(archive);
}

const server = createServer(async (request, response) => {
  try {
    const origin = assertAllowedOrigin(request);

    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": origin,
        Vary: "Origin",
      });
      response.end();
      return;
    }

    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { ok: true, version: "1.0.0" }, origin);
      return;
    }

    if (request.method === "POST" && request.url === "/capture-batch") {
      await handleCaptureBatch(request, response, origin);
      return;
    }

    sendJson(response, 404, { error: "Route not found." }, origin);
  } catch (error) {
    const statusCode =
      typeof error === "object" && error && "statusCode" in error ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Unexpected companion error.";
    sendJson(response, statusCode ?? 500, { error: message });
  }
});

server.listen(COMPANION_PORT, COMPANION_HOST, () => {
  console.log(
    `Flexo companion listening on http://${COMPANION_HOST}:${COMPANION_PORT} (origins: ${[...allowedOrigins].join(", ")})`,
  );
});

async function shutdown() {
  server.close();

  if (browserPromise) {
    const browser = await browserPromise.catch(() => null);
    await browser?.close();
  }

  process.exit(0);
}

process.on("SIGINT", () => {
  void shutdown();
});

process.on("SIGTERM", () => {
  void shutdown();
});
