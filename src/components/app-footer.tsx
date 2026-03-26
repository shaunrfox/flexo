import { Box, Link, Text, ThemeSwitcher } from "@okshaun/components";
import { actionButtonRecipe } from "./recipes/action-button.recipe.ts";
import { footerRecipe } from "./recipes/footer.recipe.ts";

type AppFooterProps = {
  onOpenAbout: () => void;
};

export function AppFooter({ onOpenAbout }: AppFooterProps) {
  const classes = footerRecipe();

  return (
    <Box as="footer" className={classes.root}>
      <Box
        as="button"
        className={actionButtonRecipe({ kind: "footer" })}
        onClick={onOpenAbout}
        type="button"
      >
        About
      </Box>
      <Text as="span" className={classes.divider}>
        /
      </Text>
      <Link
        className={actionButtonRecipe({ kind: "footer" })}
        href="https://github.com/shaunrfox/flexiblewidth"
        rel="noreferrer"
        target="_blank"
      >
        Github
      </Link>
      <ThemeSwitcher className={classes.themeSwitcher} />
    </Box>
  );
}
