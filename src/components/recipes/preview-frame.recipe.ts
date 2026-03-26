import { sva } from "@styled-system/css";

export const previewFrameRecipe = sva({
  slots: ["root", "iframe", "badge"],
  base: {
    root: {
      background: "surface",
      height: "full",
      minHeight: "0",
      position: "relative",
      width: "full",
    },
    iframe: {
      background: "surface",
      border: "none",
      display: "block",
      height: "full",
      width: "full",
    },
    badge: {
      background: "surface.overlay",
      bottom: "8",
      color: "text.subtlest",
      fontFamily: "mono",
      fontSize: "12",
      lineHeight: "none",
      paddingInline: "6",
      paddingBlock: "4",
      position: "absolute",
      right: "8",
    },
  },
  variants: {
    dragging: {
      true: {
        badge: {
          background: "bg.selected.bold",
          color: "text.inverse",
          fontWeight: "bold",
        },
      },
    },
  },
});
