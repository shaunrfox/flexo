import { Box, Chip, ChipGroup, IconButton, Text, TextInput } from "@okshaun/components";
import type { ChangeEvent, SubmitEvent } from "react";
import { actionButtonRecipe } from "./recipes/action-button.recipe.ts";
import { fieldRecipe } from "./recipes/field.recipe.ts";
import { headerRecipe } from "./recipes/header.recipe.ts";

type AppHeaderProps = {
  activeUrl: string;
  draftUrl: string;
  presetWidths: readonly number[];
  selectedWidth: number;
  onDraftUrlChange: (value: string) => void;
  onReset: () => void;
  onSelectWidth: (width: number) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function AppHeader({
  activeUrl,
  draftUrl,
  presetWidths,
  selectedWidth,
  onDraftUrlChange,
  onReset,
  onSelectWidth,
  onSubmit,
}: AppHeaderProps) {
  const classes = headerRecipe();

  return (
    <Box as="header" className={classes.root}>
      <Box className={classes.left}>
        <Text as="div" className={classes.brand}>
          Flexo
        </Text>
        {activeUrl ? (
          <Box as="form" className={classes.urlForm} onSubmit={onSubmit}>
            <TextInput
              aria-label="Preview URL"
              name="preview-url"
              className={fieldRecipe({ surface: "header" })}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onDraftUrlChange(event.currentTarget.value)
              }
              spellCheck={false}
              type="text"
              value={draftUrl}
              autoSize
            />
            <IconButton
              altText="Clear preview"
              // className={actionButtonRecipe({ kind: "clear" })}
              onClick={onReset}
              size="lg"
              variant="ghost"
              iconName="x"
              bg="transparent"
            />
          </Box>
        ) : null}
      </Box>

      <Box className={classes.sizePicker}>
        <ChipGroup
          label="Common preview widths"
          onChange={(value) => onSelectWidth(Number(value))}
          type="single"
          value={String(selectedWidth)}
        >
          {presetWidths.map((width) => (
            <Chip
              key={width}
              className={actionButtonRecipe({
                kind: "preset",
              })}
              size="sm"
              value={String(width)}
            >
              {width}
            </Chip>
          ))}
        </ChipGroup>
      </Box>
    </Box>
  );
}
