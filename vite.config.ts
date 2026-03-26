import { defineConfig } from "vite-plus";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
// import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

const githubPagesBase = process.env.GITHUB_PAGES_BASE ?? "/flexo/";
const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [
    react(),
    // dts(),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@okshaun/components/dist/sprite.svg",
          dest: "assets/",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@styled-system": resolve(rootDir, "./src/styled-system"),
      // "@okshaun/components": resolve(
      //   rootDir,
      //   "./node_modules/@okshaun/components",
      // ),
    },
  },
});
