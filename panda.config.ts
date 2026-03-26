import { defineConfig } from "@pandacss/dev";
import { okshaunPreset } from "@okshaun/components/preset";

export default defineConfig({
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@okshaun/components/dist/**/*.js"],
  exclude: [],
  presets: [okshaunPreset],
  outdir: "src/styled-system",
  jsxFramework: "react",
  strictTokens: true,
  importMap: "@styled-system",
});
