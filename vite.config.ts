import { defineConfig } from "vite-plus";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const githubPagesBase = process.env.GITHUB_PAGES_BASE ?? "/flexy-plexy-returns/";
const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [react()],
  resolve: {
    alias: {
      "@styled-system": resolve(rootDir, "./src/styled-system"),
    },
  },
});
