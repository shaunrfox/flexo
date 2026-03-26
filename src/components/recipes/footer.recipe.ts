import { sva } from "@styled-system/css";

export const footerRecipe = sva({
  slots: ["root", "divider", "themeSwitcher"],
  base: {
    root: {
      alignItems: "center",
      background: "surface",
      display: "flex",
      gap: "4",
      minHeight: "24",
      px: "14",
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
