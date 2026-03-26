import { Box } from "@okshaun/components";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { PreviewFrame } from "./preview-frame.tsx";
import { workspacePaneRecipe, workspaceRecipe } from "./recipes/workspace.recipe.ts";

type PreviewWorkspaceProps = {
  activeUrl: string;
  fluidWidth: number;
  isDragging: boolean;
  isStackedLayout: boolean;
  previewNonce: number;
  previewWidth: number;
  workspaceRef: RefObject<HTMLElement | null>;
  onDividerPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
};

export function PreviewWorkspace({
  activeUrl,
  fluidWidth,
  isDragging,
  isStackedLayout,
  previewNonce,
  previewWidth,
  workspaceRef,
  onDividerPointerDown,
}: PreviewWorkspaceProps) {
  const classes = workspaceRecipe({
    dragging: isDragging,
    stacked: isStackedLayout,
  });

  return (
    <Box ref={workspaceRef} as="section" className={classes.root}>
      {isDragging ? <Box className={classes.overlay} /> : null}

      <Box
        className={workspacePaneRecipe({
          pane: "fluid",
          stacked: isStackedLayout,
        })}
      >
        <PreviewFrame
          frameWidth={fluidWidth}
          isDragging={isDragging}
          previewNonce={previewNonce}
          src={activeUrl}
          title="Fluid preview"
        />
      </Box>

      {isStackedLayout ? null : (
        <Box
          as="button"
          aria-label="Resize preview divider"
          className={classes.divider}
          onPointerDown={onDividerPointerDown}
          type="button"
        >
          <Box className={classes.dividerMarker} />
        </Box>
      )}

      <Box
        className={workspacePaneRecipe({
          pane: "fixed",
          stacked: isStackedLayout,
        })}
        style={isStackedLayout ? undefined : { width: `${previewWidth}px` }}
      >
        <PreviewFrame
          frameWidth={previewWidth}
          isDragging={isDragging}
          previewNonce={previewNonce}
          src={activeUrl}
          title="Fixed preview"
        />
      </Box>
    </Box>
  );
}
