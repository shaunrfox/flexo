import { cva } from "@styled-system/css";

export const shellRecipe = cva({
  base: {
    bg: "surface",
    color: "text",
    display: "flex",
    flexDirection: "column",
    minHeight: "dvh",
  },
  variants: {
    dragging: {
      true: {
        userSelect: "none",
      },
    },
  },
});

export const mainRecipe = cva({
  base: {
    background: "surface",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    minHeight: "0",
    position: "relative",
  },
});
