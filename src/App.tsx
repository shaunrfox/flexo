import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import "./app.css";
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

type FrameProps = {
  frameWidth: number;
  isDragging: boolean;
  previewNonce: number;
  src: string;
  title: string;
};

function PreviewFrame({ frameWidth, isDragging, previewNonce, src, title }: FrameProps) {
  return (
    <section className="preview-frame">
      <iframe
        key={`${title}-${previewNonce}-${src}`}
        className="preview-frame__iframe"
        loading="eager"
        referrerPolicy="no-referrer"
        src={src}
        title={title}
      />
      <div className={`preview-frame__size${isDragging ? " preview-frame__size--active" : ""}`}>
        {frameWidth}px
      </div>
    </section>
  );
}

function App() {
  const initialState = getInitialAppState(window.location.search);
  const [draftUrl, setDraftUrl] = useState(initialState.draftUrl);
  const [activeUrl, setActiveUrl] = useState(initialState.activeUrl);
  const [previewWidth, setPreviewWidth] = useState(initialState.previewWidth);
  const [previewNonce, setPreviewNonce] = useState(0);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [workspaceWidth, setWorkspaceWidth] = useState(0);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const measuredWorkspaceWidth = workspaceWidth || window.innerWidth;
  const isStackedLayout = measuredWorkspaceWidth < STACKED_BREAKPOINT;
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
    if (!isDragging || !workspaceRef.current || isStackedLayout) {
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
    if (!isDragging) {
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
  }, [handlePointerMove, handlePointerUp, isDragging]);

  useEffect(() => {
    if (isDragging && isStackedLayout) {
      setIsDragging(false);
    }
  }, [isDragging, isStackedLayout]);

  useEffect(() => {
    if (previewWidth !== resolvedPreviewWidth) {
      setPreviewWidth(resolvedPreviewWidth);
    }
  }, [previewWidth, resolvedPreviewWidth]);

  useEffect(() => {
    persistUrlState(activeUrl, resolvedPreviewWidth);
  }, [activeUrl, persistUrlState, resolvedPreviewWidth]);

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

  const handleHeaderSubmit = (event: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={`app-shell${isDragging ? " app-shell--dragging" : ""}`}>
      <header className="app-header">
        <div className="app-header__left">
          <div className="app-header__brand">Flexiblewidth.com</div>
          {activeUrl ? (
            <form className="header-url" onSubmit={handleHeaderSubmit}>
              <input
                aria-label="Preview URL"
                className="header-url__input"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setDraftUrl(event.currentTarget.value);
                  if (urlError) {
                    setUrlError(null);
                  }
                }}
                spellCheck={false}
                type="text"
                value={draftUrl}
              />
              <button
                aria-label="Clear preview"
                className="header-url__clear"
                onClick={handleReset}
                type="button"
              >
                ×
              </button>
            </form>
          ) : null}
        </div>

        <div className="size-picker" aria-label="Common preview widths">
          {PRESET_WIDTHS.map((width) => {
            const isSelected = resolvedPreviewWidth === width;
            return (
              <button
                key={width}
                className={`size-picker__button${isSelected ? " size-picker__button--active" : ""}`}
                onClick={() => setPreviewWidth(width)}
                type="button"
              >
                {width}
              </button>
            );
          })}
        </div>
      </header>

      <main className="app-main">
        {!activeUrl ? (
          <section className="landing">
            <form className="landing__content" onSubmit={handleLaunch}>
              <h1 className="landing__title">
                Enter a URL to view your site at multiple width at once
              </h1>
              <input
                aria-label="Site URL"
                className="landing__input"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setDraftUrl(event.currentTarget.value);
                  if (urlError) {
                    setUrlError(null);
                  }
                }}
                placeholder="Enter a URL..."
                spellCheck={false}
                type="text"
                value={draftUrl}
              />
              {draftUrl.trim() ? (
                <button className="landing__submit" type="submit">
                  View Site
                </button>
              ) : (
                <div className="landing__hint">Any url or localhost will work.</div>
              )}
              {urlError ? <div className="landing__error">{urlError}</div> : null}
            </form>
          </section>
        ) : (
          <section
            ref={workspaceRef}
            className={`workspace${isStackedLayout ? " workspace--stacked" : ""}`}
          >
            {isDragging ? <div className="workspace__drag-overlay" /> : null}

            <div className="workspace__pane workspace__pane--fluid">
              <PreviewFrame
                frameWidth={fluidWidth}
                isDragging={isDragging}
                previewNonce={previewNonce}
                src={activeUrl}
                title="Fluid preview"
              />
            </div>

            {isStackedLayout ? null : (
              <button
                aria-label="Resize preview divider"
                className={`workspace__divider${isDragging ? " workspace__divider--active" : ""}`}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setIsDragging(true);
                }}
                type="button"
              >
                <span className="workspace__divider-marker" />
                <span className="workspace__divider-marker" />
                <span className="workspace__divider-marker" />
              </button>
            )}

            <div
              className="workspace__pane workspace__pane--fixed"
              style={isStackedLayout ? undefined : { width: `${resolvedPreviewWidth}px` }}
            >
              <PreviewFrame
                frameWidth={resolvedPreviewWidth}
                isDragging={isDragging}
                previewNonce={previewNonce}
                src={activeUrl}
                title="Fixed preview"
              />
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <button className="app-footer__link" onClick={() => setAboutOpen(true)} type="button">
          About
        </button>
        <span className="app-footer__divider">/</span>
        <a
          className="app-footer__link"
          href="https://github.com/shaunrfox/flexiblewidth"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
      </footer>

      {aboutOpen ? (
        <div className="about-backdrop" onClick={() => setAboutOpen(false)} role="presentation">
          <div
            aria-modal="true"
            className="about-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close about dialog"
              className="about-modal__close"
              onClick={() => setAboutOpen(false)}
              type="button"
            >
              ×
            </button>
            <h2 className="about-modal__title">About Flexiblewidth.com</h2>
            <p className="about-modal__copy">
              We built this tool to help us visualize a website at two sizes at once. This can
              certainly help with a published site, but can also be really handy to see right as
              you&apos;re building your site locally.
            </p>
            <div className="about-modal__rule" />
            <div className="about-modal__label">This tool was built by:</div>
            <div className="about-modal__credits">
              <div>Broderick Young</div>
              <a href="http://broderickyoung.com/" rel="noreferrer" target="_blank">
                broderickyoung.com
              </a>
              <div>Shaun Fox</div>
              <a href="http://shaunfox.com/" rel="noreferrer" target="_blank">
                shaunfox.com
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
