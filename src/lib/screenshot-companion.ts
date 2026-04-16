const COMPANION_ENDPOINT = "http://127.0.0.1:43127";
const START_COMMAND = "npm run companion";

type CaptureRequest = {
  fixedWidth: number;
  fluidWidth: number;
  url: string;
};

type CompanionErrorResponse = {
  error?: string;
  label?: string;
};

function getArchiveName(rawUrl: string): string {
  try {
    const { hostname } = new URL(rawUrl);
    return `${hostname || "preview"}-screenshots.zip`;
  } catch {
    return "preview-screenshots.zip";
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  link.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1_000);
}

export async function downloadCompanionScreenshots({
  fixedWidth,
  fluidWidth,
  url,
}: CaptureRequest): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${COMPANION_ENDPOINT}/capture-batch`, {
      body: JSON.stringify({
        captures: [
          { label: "left", width: fluidWidth },
          { label: "right", width: fixedWidth },
        ],
        url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch {
    throw new Error(
      `Screenshot companion is offline. Start it with: ${START_COMMAND}`,
    );
  }

  if (!response.ok) {
    let errorPayload: CompanionErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as CompanionErrorResponse;
    } catch {
      errorPayload = null;
    }

    if (response.status >= 500) {
      throw new Error(errorPayload?.error || "Screenshot capture failed.");
    }

    throw new Error(errorPayload?.error || "Screenshot request was rejected.");
  }

  const blob = await response.blob();
  triggerDownload(blob, getArchiveName(url));
}
