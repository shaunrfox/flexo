import { defineConfig } from "@pandacss/dev";
import { okshaunPreset } from "@okshaun/components/preset";

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: "react",
  jsxStyleProps: "all",
  jsxFactory: "styled",
  preflight: false, // do not add Panda's default reset styles
  strictTokens: true,

  presets: [okshaunPreset],

  include: [
    "./node_modules/okshaun/components/dist/panda.buildinfo.json",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  exclude: [],

  outdir: "src/styled-system",
  importMap: "@styled-system",

  hooks: {
    "config:resolved": ({ config, utils }) => {
      return utils.omit(config, ["patterns.box", "patterns.divider"]);
    },
  },
});
