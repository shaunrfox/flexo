import { sva } from "@styled-system/css";

export const landingRecipe = sva({
  slots: ["root", "content", "title", "message"],
  base: {
    root: {
      alignItems: "center",
      display: "flex",
      flex: "1",
      justifyContent: "center",
      px: "20",
      py: "24",
    },
    content: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "20",
      width: "full",
    },
    title: {
      textStyle: "mono.lg",
      color: "text",
      maxWidth: "sm",
      textAlign: "center",
    },
    message: {
      textStyle: "mono.sm",
      textAlign: "center",
    },
  },
  variants: {
    tone: {
      hint: {
        message: {
          color: "text.subtlest",
        },
      },
      error: {
        message: {
          color: "text.danger",
        },
      },
    },
  },
});
