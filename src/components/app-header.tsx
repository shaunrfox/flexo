import { Box, Button, Chip, ChipGroup, TextInput } from "@okshaun/components";
import { HStack } from "@styled-system/jsx";
import type { ChangeEvent, SubmitEvent } from "react";
import { actionButtonRecipe } from "./recipes/action-button.recipe.ts";
import { fieldRecipe } from "./recipes/field.recipe.ts";
import { headerRecipe } from "./recipes/header.recipe.ts";

type AppHeaderProps = {
  activeUrl: string;
  draftUrl: string;
  isDownloadingScreenshots: boolean;
  presetWidths: readonly number[];
  selectedWidth: number;
  onDraftUrlChange: (value: string) => void;
  onDownloadScreenshots: () => void;
  onReset: () => void;
  onSelectWidth: (width: number) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function AppHeader({
  activeUrl,
  draftUrl,
  isDownloadingScreenshots,
  presetWidths,
  selectedWidth,
  onDraftUrlChange,
  onReset,
  onDownloadScreenshots,
  onSelectWidth,
  onSubmit,
}: AppHeaderProps) {
  const classes = headerRecipe();

  return (
    <Box as="header" className={classes.root}>
      <Box className={classes.left}>
        <HStack h="full" overflow="hidden">
          <Button variant="ghost" className={classes.brand} onClick={onReset}>
            Flexo
          </Button>
        </HStack>
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
              w="full"
            />
          </Box>
        ) : null}
      </Box>

      <Box className={classes.sizePicker}>
        {activeUrl ? (
          <Button
            loading={isDownloadingScreenshots}
            fontFamily="mono"
            fontSize="12"
            onClick={onDownloadScreenshots}
            size="sm"
            variant="hollow"
            whiteSpace="nowrap"
          >
            {isDownloadingScreenshots ? "Preparing ZIP..." : "Download screenshots"}
          </Button>
        ) : null}
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
