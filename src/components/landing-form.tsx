import { Box, Text, TextInput } from "@okshaun/components";
import type { ChangeEvent, FormEvent } from "react";
import { actionButtonRecipe } from "./recipes/action-button.recipe.ts";
import { landingRecipe } from "./recipes/landing.recipe.ts";

type LandingFormProps = {
  draftUrl: string;
  urlError: string | null;
  onDraftUrlChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function LandingForm({
  draftUrl,
  urlError,
  onDraftUrlChange,
  onSubmit,
}: LandingFormProps) {
  const classes = landingRecipe({ tone: urlError ? "error" : "hint" });

  return (
    <Box as="section" className={classes.root}>
      <Box as="form" className={classes.content} onSubmit={onSubmit}>
        <Text as="h1" className={classes.title}>
          Enter a URL to view your site at multiple widths at once
        </Text>
        <TextInput
          aria-label="Site URL"
          size="xl"
          error={Boolean(urlError)}
          name="site-url"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onDraftUrlChange(event.currentTarget.value)
          }
          placeholder="Enter a URL..."
          spellCheck={false}
          type="text"
          value={draftUrl}
        />
        {draftUrl.trim() ? (
          <Box
            as="button"
            className={actionButtonRecipe({ kind: "submit" })}
            type="submit"
          >
            View Site
          </Box>
        ) : (
          <Text as="div" className={classes.message}>
            Any URL or localhost will work.
          </Text>
        )}
        {urlError ? (
          <Text as="div" className={classes.message}>
            {urlError}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
