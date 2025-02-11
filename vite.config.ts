import { defineConfig } from "vite";

// Check if running in GitHub Pages environment
const isGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";

export default defineConfig({
  base: isGithubPages ? "/<repository-name>/" : "/", // Replace <repository-name> with your GitHub repository name
  build: {
    outDir: "dist", // or 'build', depending on your project
    emptyOutDir: true, // recommended to ensure clean builds
  },
});
