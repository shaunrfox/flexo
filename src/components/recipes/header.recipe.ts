import { sva } from "@styled-system/css";

export const headerRecipe = sva({
  slots: ["root", "left", "brand", "urlForm", "sizePicker"],
  base: {
    root: {
      position: "relative",
      alignItems: "stretch",
      background: "surface",
      color: "text",
      display: "flex",
      justifyContent: "space-between",
      minHeight: "40",
      zIndex: "1000",
      boxShadow: "raised",
      smDown: {
        alignItems: "flex-start",
        flexDirection: "column",
        px: "12",
        py: "10",
      },
    },
    left: {
      alignItems: "stretch",
      display: "flex",
      minWidth: "0",
      smDown: {
        width: "full",
      },
    },
    brand: {
      alignItems: "center",
      display: "flex",
      textStyle: "mono.sm",
      color: "text",
      px: "16",
      whiteSpace: "nowrap",
      smDown: {
        pb: "8",
        px: "0",
      },
    },
    urlForm: {
      alignItems: "center",
      // background: "bg.input",
      borderStart: "default",
      display: "flex",
      minWidth: "224",
      width: "fit",
      smDown: {
        borderStart: "none",
        width: "full",
      },
    },
    sizePicker: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      gap: "12",
      justifyContent: "flex-end",
      px: "14",
      smDown: {
        gap: "10",
        justifyContent: "flex-start",
        pt: "8",
        px: "0",
        width: "full",
      },
    },
  },
});
