import { cva, sva } from "@styled-system/css";

export const workspaceRecipe = sva({
  slots: ["root", "overlay", "divider", "dividerMarker"],
  base: {
    root: {
      display: "flex",
      flex: "1",
      minHeight: "0",
      position: "relative",
    },
    overlay: {
      bottom: "0",
      cursor: "col-resize",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0",
      zIndex: "2",
    },
    divider: {
      alignItems: "center",
      appearance: "none",
      background: "border",
      border: "none",
      cursor: "col-resize",
      display: "flex",
      justifyContent: "center",
      padding: "0",
      position: "relative",
      width: "6",
      zIndex: "3",
    },
    dividerMarker: {
      background: "bg.neutral.boldest",
      display: "block",
      height: "12",
      position: "relative",
      width: "1",
      _before: {
        background: "bg.neutral.boldest",
        content: '""',
        height: "12",
        left: "0",
        position: "absolute",
        top: "-16",
        width: "1",
      },
      _after: {
        background: "bg.neutral.boldest",
        content: '""',
        height: "12",
        left: "0",
        position: "absolute",
        top: "16",
        width: "1",
      },
    },
  },
  variants: {
    stacked: {
      true: {
        root: {
          flexDirection: "column",
        },
        divider: {
          display: "none",
        },
      },
      false: {
        root: {
          flexDirection: "row",
        },
      },
    },
    dragging: {
      true: {
        divider: {
          background: "bg.selected",
        },
      },
    },
  },
});

export const workspacePaneRecipe = cva({
  base: {
    minHeight: "0",
    minWidth: "0",
    position: "relative",
  },
  variants: {
    pane: {
      fluid: {
        flex: "1",
      },
      fixed: {
        flex: "none",
      },
    },
    stacked: {
      true: {
        flex: "1",
        minHeight: "240",
        width: "full",
      },
    },
  },
});
