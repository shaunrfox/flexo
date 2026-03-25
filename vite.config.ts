import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

const githubPagesBase = process.env.GITHUB_PAGES_BASE ?? "/flexy-plexy-returns/";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [react()],
});
