import { sva } from "@styled-system/css";

export const footerRecipe = sva({
  slots: ["root", "divider", "themeSwitcher"],
  base: {
    root: {
      position: "relative",
      alignItems: "center",
      background: "surface",
      display: "flex",
      gap: "8",
      minHeight: "24",
      px: "8",
      py: "4",
      zIndex: "1000",
      boxShadow: "raised.up",
    },
    divider: {
      color: "text.subtlest",
      fontFamily: "mono",
      fontSize: "12",
    },
    themeSwitcher: {
      marginBlock: "0",
      marginInlineEnd: "0",
      marginInlineStart: "auto",
    },
  },
});
