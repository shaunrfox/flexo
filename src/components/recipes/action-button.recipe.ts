import { cva } from "@styled-system/css";

export const actionButtonRecipe = cva({
  base: {
    alignItems: "center",
    appearance: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    lineHeight: "none",
    minWidth: "0",
    textDecoration: "none",
    transitionDuration: "fast",
    transitionProperty: "background, color, border-color, box-shadow",
    transitionTimingFunction: "default",
    _focusVisible: {
      outlineColor: "border.focused",
      outlineOffset: "1",
      outlineStyle: "solid",
      outlineWidth: "2",
    },
  },
  variants: {
    kind: {
      preset: {
        fontFamily: "mono",
        fontSize: "12",
        fontWeight: "medium",
      },
      submit: {
        background: "bg.selected.bold",
        borderRadius: "2",
        color: "text.inverse",
        fontFamily: "mono",
        fontSize: "12",
        fontWeight: "bold",
        letterSpacing: "widest",
        px: "10",
        py: "6",
        textTransform: "uppercase",
        transition: "all",
        _hover: {
          bg: "bg.selected.bold.hovered",
        },
      },
      footer: {
        color: "link",
        fontFamily: "mono",
        fontSize: "12",
      },
      close: {
        color: "text.subtlest",
        fontFamily: "mono",
        fontSize: "24",
        lineHeight: "none",
        p: "0",
      },
    },
  },
  defaultVariants: {
    kind: "preset",
  },
});
