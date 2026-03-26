import { Button, ThemeSwitcher } from "@okshaun/components";
import { footerRecipe } from "./recipes/footer.recipe.ts";
import { Flex } from "@styled-system/jsx";

type AppFooterProps = {
  onOpenAbout: () => void;
};

export function AppFooter({ onOpenAbout }: AppFooterProps) {
  const classes = footerRecipe();

  return (
    <Flex as="footer" className={classes.root}>
      <Button
        // className={actionButtonRecipe({ kind: "footer" })}
        onClick={onOpenAbout}
        variant="hollow"
        size="sm"
        fontFamily="mono"
        fontSize="12"
      >
        About
      </Button>
      {/*<Text as="span" className={classes.divider}>
        /
      </Text>*/}
      <Button
        // className={actionButtonRecipe({ kind: "footer" })}
        href="https://github.com/shaunrfox/flexo"
        rel="noreferrer"
        target="_blank"
        variant="hollow"
        size="sm"
        fontFamily="mono"
        fontSize="12"
      >
        Github
      </Button>
      <ThemeSwitcher ml="auto" />
    </Flex>
  );
}
