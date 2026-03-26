import { Box } from "@okshaun/components";
import { previewFrameRecipe } from "./recipes/preview-frame.recipe.ts";

type PreviewFrameProps = {
  frameWidth: number;
  isDragging: boolean;
  previewNonce: number;
  src: string;
  title: string;
};

export function PreviewFrame({
  frameWidth,
  isDragging,
  previewNonce,
  src,
  title,
}: PreviewFrameProps) {
  const classes = previewFrameRecipe({ dragging: isDragging });

  return (
    <Box as="section" className={classes.root}>
      <iframe
        key={`${title}-${previewNonce}-${src}`}
        className={classes.iframe}
        loading="eager"
        referrerPolicy="no-referrer"
        src={src}
        title={title}
      />
      <Box className={classes.badge}>{frameWidth}px</Box>
    </Box>
  );
}
