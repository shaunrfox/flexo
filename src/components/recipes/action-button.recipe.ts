import { cva } from "@styled-system/css";

export const actionButtonRecipe = cva({
  base: {
    alignItems: "center",
    appearance: "none",
    // background: "transparent",
    // border: "none",
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
        // color: "text.subtlest",
        fontFamily: "mono",
        fontSize: "12",
        fontWeight: "medium",
        // px: "0",
        // py: "0",
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
      },
      // clear: {
      //   // color: "text.subtlest",
      //   fontFamily: "mono",
      //   fontSize: "20",
      //   h: "40",
      //   px: "12",
      // },
      footer: {
        color: "link",
        fontFamily: "mono",
        fontSize: "12",
        // px: "0",
        // py: "0",
        // bg: "transparent",
        // textDecoration: "underline",
      },
      close: {
        color: "text.subtlest",
        fontFamily: "mono",
        fontSize: "24",
        lineHeight: "none",
        p: "0",
      },
    },
    // active: {
    //   true: {
    //     color: "text.in.selected",
    //   },
    // },
  },
  defaultVariants: {
    kind: "preset",
    // active: false,
  },
});
