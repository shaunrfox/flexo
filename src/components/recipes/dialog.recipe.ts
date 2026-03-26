import { sva } from "@styled-system/css";

export const dialogRecipe = sva({
  slots: ["panel", "header", "body", "copy", "rule", "label", "credits", "creditLink"],
  base: {
    panel: {
      width: "xs",
    },
    header: {
      px: "20",
      py: "12",
    },
    body: {
      px: "20",
      py: "16",
    },
    copy: {
      color: "text.subtle",
      fontFamily: "mono",
      fontSize: "14",
      lineHeight: "default",
    },
    rule: {
      borderTop: "default",
      marginBlock: "14",
    },
    label: {
      color: "text",
      fontFamily: "mono",
      fontSize: "12",
      fontWeight: "bold",
      marginBottom: "8",
    },
    credits: {
      color: "text.subtle",
      columnGap: "14",
      display: "grid",
      fontFamily: "mono",
      fontSize: "12",
      gridTemplateColumns: "max-content 1fr",
      rowGap: "6",
    },
    creditLink: {
      color: "link",
      textDecoration: "underline",
    },
  },
});
