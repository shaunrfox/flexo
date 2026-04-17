import { Box, Link, Modal, ModalBody, ModalHeader, Text } from "@okshaun/components";
import { dialogRecipe } from "./recipes/dialog.recipe.ts";

type AboutDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function AboutDialog({ open, onClose }: AboutDialogProps) {
  const classes = dialogRecipe();

  if (!open) {
    return null;
  }

  return (
    <Modal className={classes.panel} onOpenChange={onClose} open={open} size="sm">
      <ModalHeader className={classes.header} title="About Flexo" />
      <ModalBody className={classes.body}>
        <Text as="p" className={classes.copy}>
          We built this tool to help us visualize a website at two sizes at once. This can certainly
          help with a published site, but can also be really handy to see right as you&apos;re
          building your site locally.
        </Text>
        <Box className={classes.rule} />
        <Text as="div" className={classes.label}>
          This tool was built by:
        </Text>
        <Box className={classes.credits}>
          <Text as="div">Broderick Young</Text>
          <Link
            className={classes.creditLink}
            href="http://broderickyoung.com/"
            rel="noreferrer"
            target="_blank"
          >
            broderickyoung.com
          </Link>
          <Text as="div">Shaun Fox</Text>
          <Link
            className={classes.creditLink}
            href="http://shaunfox.com/"
            rel="noreferrer"
            target="_blank"
          >
            shaunfox.com
          </Link>
        </Box>
      </ModalBody>
    </Modal>
  );
}
