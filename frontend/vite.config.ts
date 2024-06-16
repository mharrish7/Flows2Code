import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  resolve: {
    alias: [
      {
        find: "@public",
        replacement: path.resolve(__dirname, "./public"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/Components"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "./src/Config"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/Pages"),
      },
      {
        find: "@router",
        replacement: path.resolve(__dirname, "./src/Router"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/Utils"),
      },
    ],
  },
  plugins: [react()],
});
