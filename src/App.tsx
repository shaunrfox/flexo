import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Box } from "@okshaun/components";
import { AboutDialog } from "./components/about-dialog.tsx";
import { AppFooter } from "./components/app-footer.tsx";
import { AppHeader } from "./components/app-header.tsx";
import { LandingForm } from "./components/landing-form.tsx";
import { PreviewWorkspace } from "./components/preview-workspace.tsx";
import { mainRecipe, shellRecipe } from "./components/recipes/shell.recipe.ts";
import {
  DEFAULT_PREVIEW_WIDTH,
  clampPreviewWidth,
  getInitialAppState,
  normalizePreviewUrl,
} from "./lib/url.ts";

const PRESET_WIDTHS = [1080, 800, 768, 720, 540, 480, 375, 320, 240] as const;
const DIVIDER_WIDTH = 6;
const MIN_FLUID_WIDTH = 320;
const STACKED_BREAKPOINT = 880;

function App() {
  const [initialState] = useState(() => getInitialAppState(window.location.search));
  const [draftUrl, setDraftUrl] = useState(initialState.draftUrl);
  const [activeUrl, setActiveUrl] = useState(initialState.activeUrl);
  const [previewWidth, setPreviewWidth] = useState(initialState.previewWidth);
  const [previewNonce, setPreviewNonce] = useState(0);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [workspaceWidth, setWorkspaceWidth] = useState(0);
  const workspaceRef = useRef<HTMLElement | null>(null);

  const measuredWorkspaceWidth = workspaceWidth || window.innerWidth;
  const isStackedLayout = measuredWorkspaceWidth < STACKED_BREAKPOINT;
  const isDraggingActive = isDragging && !isStackedLayout;
  const maxPreviewWidth = isStackedLayout
    ? Math.max(DEFAULT_PREVIEW_WIDTH, measuredWorkspaceWidth)
    : Math.max(DEFAULT_PREVIEW_WIDTH, measuredWorkspaceWidth - DIVIDER_WIDTH - MIN_FLUID_WIDTH);
  const resolvedPreviewWidth = clampPreviewWidth(previewWidth, maxPreviewWidth);
  const fluidWidth = isStackedLayout
    ? measuredWorkspaceWidth
    : Math.max(MIN_FLUID_WIDTH, measuredWorkspaceWidth - DIVIDER_WIDTH - resolvedPreviewWidth);

  const persistUrlState = useEffectEvent((nextUrl: string, nextWidth: number) => {
    const url = new URL(window.location.href);

    if (!nextUrl) {
      url.searchParams.delete("url");
      url.searchParams.delete("width");
    } else {
      url.searchParams.set("url", nextUrl);
      url.searchParams.set("width", String(nextWidth));
    }

    const nextSearch = url.searchParams.toString();
    const nextHref = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}${url.hash}`;
    window.history.replaceState({}, "", nextHref);
  });

  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    if (!isDraggingActive || !workspaceRef.current) {
      return;
    }

    const bounds = workspaceRef.current.getBoundingClientRect();
    const nextWidth = Math.round(bounds.right - event.clientX);
    const clampedWidth = clampPreviewWidth(
      nextWidth,
      Math.max(DEFAULT_PREVIEW_WIDTH, bounds.width - DIVIDER_WIDTH - MIN_FLUID_WIDTH),
    );
    setPreviewWidth(clampedWidth);
  });

  const handlePointerUp = useEffectEvent(() => {
    setIsDragging(false);
  });

  useEffect(() => {
    if (!workspaceRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width;
      if (nextWidth) {
        setWorkspaceWidth(Math.round(nextWidth));
      }
    });

    observer.observe(workspaceRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDraggingActive) {
      return;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDraggingActive]);

  useEffect(() => {
    persistUrlState(activeUrl, resolvedPreviewWidth);
  }, [activeUrl, resolvedPreviewWidth]);

  const handleDraftUrlChange = (value: string) => {
    setDraftUrl(value);
    if (urlError) {
      setUrlError(null);
    }
  };

  const applyPreview = (rawInput: string = draftUrl) => {
    const result = normalizePreviewUrl(rawInput);

    if (!result.ok) {
      setUrlError(result.error);
      return;
    }

    setUrlError(null);
    setDraftUrl(result.url);
    startTransition(() => {
      setActiveUrl(result.url);
      setPreviewNonce((current) => current + 1);
    });
  };

  const handleLaunch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyPreview();
  };

  const handleReset = () => {
    setUrlError(null);
    setDraftUrl("");
    startTransition(() => {
      setActiveUrl("");
      setPreviewNonce((current) => current + 1);
    });
  };

  const handleDividerPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  return (
    <Box className={shellRecipe({ dragging: isDraggingActive })}>
      <AppHeader
        activeUrl={activeUrl}
        draftUrl={draftUrl}
        onDraftUrlChange={handleDraftUrlChange}
        onReset={handleReset}
        onSelectWidth={setPreviewWidth}
        onSubmit={handleLaunch}
        presetWidths={PRESET_WIDTHS}
        selectedWidth={resolvedPreviewWidth}
      />

      <Box as="main" className={mainRecipe()}>
        {activeUrl ? (
          <PreviewWorkspace
            activeUrl={activeUrl}
            fluidWidth={fluidWidth}
            isDragging={isDraggingActive}
            isStackedLayout={isStackedLayout}
            onDividerPointerDown={handleDividerPointerDown}
            previewNonce={previewNonce}
            previewWidth={resolvedPreviewWidth}
            workspaceRef={workspaceRef}
          />
        ) : (
          <LandingForm
            draftUrl={draftUrl}
            onDraftUrlChange={handleDraftUrlChange}
            onSubmit={handleLaunch}
            urlError={urlError}
          />
        )}
      </Box>

      <AppFooter onOpenAbout={() => setAboutOpen(true)} />
      <AboutDialog onClose={() => setAboutOpen(false)} open={aboutOpen} />
    </Box>
  );
}

export default App;
