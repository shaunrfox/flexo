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
      gap: "12",
      width: "full",
    },
    title: {
      color: "text",
      fontFamily: "mono",
      fontSize: "16",
      fontWeight: "normal",
      lineHeight: "tight",
      maxWidth: "sm",
      textAlign: "center",
    },
    message: {
      fontFamily: "mono",
      fontSize: "12",
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
