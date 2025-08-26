#!/usr/bin/env node

import {
  updateProjectsJS,
  updateArticlesJS,
} from "../src/utils/projectConverter.js";

console.log("🔄 Updating projects.js and articles.js from markdown files...");

const okProjects = updateProjectsJS();
const okArticles = updateArticlesJS();

if (okProjects && okArticles) {
  console.log("✅ Successfully updated projects.js and articles.js");
  console.log("🚀 You can now start the website with: npm run dev");
} else {
  console.error("❌ Failed to update one or more data files");
  process.exit(1);
}
