import { cva } from "@styled-system/css";

export const fieldRecipe = cva({
  base: {
    appearance: "none",
    background: "bg.input",
    color: "text",
    fontFamily: "mono",
    lineHeight: "default",
    outlineColor: "transparent",
    outlineOffset: "1",
    outlineStyle: "solid",
    outlineWidth: "2",
    transitionDuration: "fast",
    transitionProperty: "background, border-color, color, outline-color",
    transitionTimingFunction: "default",
    width: "full",
    _focusVisible: {
      outlineColor: "border.focused",
    },
    _placeholder: {
      color: "text.placeholder",
    },
  },
  variants: {
    surface: {
      header: {
        background: "transparent",
        border: "none",
        fontSize: "12",
        h: "40",
        px: "10",
      },
      landing: {
        background: "bg.input",
        border: "input",
        borderRadius: "2",
        fontSize: "16",
        h: "40",
        maxWidth: "xs",
        px: "12",
      },
    },
    invalid: {
      true: {
        borderColor: "border.danger",
        outlineColor: "border.danger",
      },
    },
  },
  defaultVariants: {
    invalid: false,
    surface: "landing",
  },
});
