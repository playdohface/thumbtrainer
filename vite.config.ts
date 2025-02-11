import { defineConfig } from "vite";

// Check if running in GitHub Pages environment
const isGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";

export default defineConfig({
  base: isGithubPages ? "/thumbtrainer/" : "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
