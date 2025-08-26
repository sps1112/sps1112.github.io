import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import {
  updateProjectsJS,
  updateArticlesJS,
} from "./src/utils/projectConverter.js";

function postsWatcherPlugin() {
  return {
    name: "posts-watcher-plugin",
    configureServer(server) {
      const postsDir = path.resolve(__dirname, "src/posts");
      const dataUpdater = async () => {
        try {
          await updateProjectsJS();
          await updateArticlesJS();
          // Touch data files to ensure module graph picks them up
          const now = new Date();
          try {
            fs.utimesSync(
              path.resolve(__dirname, "src/data/projects.js"),
              now,
              now
            );
          } catch {}
          try {
            fs.utimesSync(
              path.resolve(__dirname, "src/data/articles.js"),
              now,
              now
            );
          } catch {}
          server.ws.send({ type: "custom", event: "data:updated" });
        } catch {}
      };
      server.watcher.add(postsDir);
      server.watcher.on("change", (file) => {
        if (file.endsWith(".md")) dataUpdater();
      });
      server.watcher.on("add", (file) => {
        if (file.endsWith(".md")) dataUpdater();
      });
      server.watcher.on("unlink", (file) => {
        if (file.endsWith(".md")) dataUpdater();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), postsWatcherPlugin()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
    open: true,
  },
});
