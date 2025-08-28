import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const metadata = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present (both single and double quotes)
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      metadata[key] = value;
    }
  });

  return metadata;
}

// Function to extract links from markdown content
function extractLinks(content) {
  const links = {};

  // Extract build link
  const buildMatch = content.match(/Build:\s*<a\s+href="([^"]+)">[^<]+<\/a>/);
  if (buildMatch) {
    links.build = buildMatch[1];
  }

  // Extract source link
  const sourceMatch = content.match(/Source:\s*<a\s+href="([^"]+)">[^<]+<\/a>/);
  if (sourceMatch) {
    links.source = sourceMatch[1];
  }

  // Alternative pattern for source links
  if (!links.source) {
    const altSourceMatch = content.match(/<a\s+href="([^"]+)">[^<]+<\/a>/);
    if (altSourceMatch && altSourceMatch[1].includes("github.com")) {
      links.source = altSourceMatch[1];
    }
  }

  return links;
}

// Function to generate project ID from title
function generateProjectId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "");
}

// Function to determine if project is featured
function isFeatured(project) {
  // Featured projects are typically games or graphics projects
  const featuredCategories = ["Games", "Graphics"];
  return featuredCategories.includes(project.category);
}

// Function to convert markdown content to HTML-like format for projects.js
function convertContentToProjectFormat(content) {
  // Remove frontmatter
  let projectContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

  // Convert <img class="article-screenshot" src="..." alt="..." /> to markdown image syntax
  projectContent = projectContent.replace(
    /<img\s+class="article-screenshot"\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g,
    (m, src, alt) => `![${alt || ""}](${src})`
  );

  // Convert <div class="code-container"><pre class="code-block">...</pre></div> to markdown code blocks
  projectContent = projectContent.replace(
    /<div class="code-container">\s*<pre class="code-block">([\s\S]*?)<\/pre>\s*<\/div>/g,
    (m, code) => {
      // Remove only blank lines before/after, never the first code line
      let cleaned = code.replace(/^[\r\n]+/, "").replace(/[\r\n]+$/, "");
      return `\n\`\`\`\n${cleaned}\n\`\`\`\n`;
    }
  );

  // Only convert actual code blocks (triple backticks), preserve inline code
  // This regex matches triple backtick blocks, not single backtick inline code
  projectContent = projectContent.replace(
    /(^|\n)```([\s\S]*?)```(\n|$)/g,
    (m, before, code, after) => {
      let cleaned = code.replace(/^[\r\n]+/, "").replace(/[\r\n]+$/, "");
      return `\n\`\`\`\n${cleaned}\n\`\`\`\n`;
    }
  );

  return projectContent;
}

// helper: normalize permalink strings (ensure leading slash, remove trailing .html if present)
function normalizePermalink(p) {
  if (!p) return p;
  let s = p.toString().trim();
  if (!s.startsWith("/")) s = "/" + s;
  // optional: strip .html if present so lookups become friendlier
  // s = s.replace(/\.html$/, "");
  return s;
}

// Main function to convert markdown files to projects
export function convertMarkdownToProjects() {
  const postsDir = path.join(__dirname, "../posts/projects");
  const projects = [];

  try {
    const files = fs.readdirSync(postsDir);

    files.forEach((file) => {
      if (file.endsWith(".md")) {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, "utf8");

        // Skip files that already contain template tags
        if (/\{\{(IMG|TWOIMAGES|CODEBLOCK|LINK|THANKYOU)\}\}/.test(content)) {
          return;
        }

        const frontmatter = parseFrontmatter(content);

        if (!frontmatter || frontmatter.layout !== "project") {
          return; // Skip non-project files
        }

        const links = extractLinks(content);
        const projectId = generateProjectId(frontmatter.title);

        // permalink: prefer frontmatter.permalink, otherwise default to /projects/<id>
        const permalink = frontmatter.permalink
          ? normalizePermalink(frontmatter.permalink)
          : `/projects/${projectId}`;

        const project = {
          id: projectId,
          title: frontmatter.title,
          permalink, // <-- saved permalink here
          type: frontmatter.type || "Personal",
          organization:
            frontmatter.organization ||
            (frontmatter.type &&
            frontmatter.type.toLowerCase() !== "self-project"
              ? frontmatter.type
              : "Self"),
          role: frontmatter.role || "",
          engine: frontmatter.engine || "N/A",
          language: frontmatter.language || "N/A",
          platform: frontmatter.platform || "N/A",
          description: frontmatter.description || "",
          image: frontmatter.image || "",
          category: frontmatter.category || "Other",
          categoryLabel: (frontmatter.category || "Other").toString().trim(),
          date: frontmatter.date || frontmatter.time || "",
          readTime: (() => {
            const wordCount = content
              .replace(/^---[\s\S]*?---\s*/, "")
              .split(/\s+/)
              .filter(Boolean).length;
            return `${Math.max(1, Math.round(wordCount / 200))} min read`;
          })(),
          links,
          featured: isFeatured({ category: frontmatter.category }),
          content: convertContentToProjectFormat(content),
        };

        projects.push(project);
      }
    });

    // Sort projects by date (extracted from filename)
    projects.sort((a, b) => {
      const dateA = a.id.match(/\d{4}-\d{2}-\d{1}/)?.[0] || "";
      const dateB = b.id.match(/\d{4}-\d{2}-\d{1}/)?.[0] || "";
      return dateB.localeCompare(dateA); // Newest first
    });

    return projects;
  } catch (error) {
    console.error("Error converting markdown to projects:", error);
    return [];
  }
}

// Function to generate the projects.js file content
export function generateProjectsJS(projects) {
  const projectsArray = JSON.stringify(projects, null, 2);

  return `// Project data - converted from Jekyll posts
export const projects = ${projectsArray};

export const categories = [
  { id: "all", label: "All" },
  { id: "professional", label: "Professional" },
  { id: "personal", label: "Personal" },
  { id: "games", label: "Games" },
  { id: "graphics", label: "Graphics" },
  { id: "other", label: "Other" },
];

export const getProjectsByCategory = (category) => {
  if (category === "all") return projects;
  if (category === "professional")
    return projects.filter((p) => p.type === "Professional");
  if (category === "personal")
    return projects.filter((p) => p.type === "Personal");
  if (category === "games")
    return projects.filter((p) => p.category === "Games");
  if (category === "graphics")
    return projects.filter((p) => p.category === "Graphics");
  if (category === "other")
    return projects.filter((p) => p.category === "Other");
  return projects;
};

// Helper: get project by permalink (normalizes trailing slash)
function _normalize(p) {
  if (!p) return p;
  return p.toString().replace(/\\/+$/,'');
}

export const getProjectByPermalink = (permalink) => {
  const norm = _normalize(permalink);
  return projects.find(p => _normalize(p.permalink) === norm);
};

export const getProjectById = (id) => projects.find(p => p.id === id);
`;
}

// Function to update projects.js file
export function updateProjectsJS() {
  try {
    const projects = convertMarkdownToProjects();
    const projectsJSContent = generateProjectsJS(projects);

    const projectsJSPath = path.join(__dirname, "../data/projects.js");
    // Overwrite the file with fresh content
    fs.writeFileSync(projectsJSPath, projectsJSContent, {
      encoding: "utf8",
      flag: "w",
    });

    console.log(
      `Successfully updated projects.js with ${projects.length} projects`
    );
    return true;
  } catch (error) {
    console.error("Error updating projects.js:", error);
    return false;
  }
}

// Auto-update if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateProjectsJS();
}

export function convertMarkdownToArticles() {
  const postsDir = path.join(__dirname, "../posts/blogs");
  const articles = [];
  try {
    const files = fs.readdirSync(postsDir);
    files.forEach((file) => {
      if (!file.endsWith(".md")) return;
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      // Skip files that already contain template tags
      if (/\{\{(IMG|TWOIMAGES|CODEBLOCK|LINK|THANKYOU)\}\}/.test(content)) {
        return;
      }
      const fm = parseFrontmatter(content);
      if (!fm) return;
      if (fm.layout !== "article") return; // only articles
      const id = generateProjectId(fm.title);
      const categoryLabel = (fm.category || "gamedev").toString().trim();
      const lower = categoryLabel.toLowerCase();
      const category = lower === "technical" ? "gamedev" : lower;
      const timeOrDate = fm.date || fm.time || "";
      const wordCount = content
        .replace(/^---[\s\S]*?---\s*/, "")
        .split(/\s+/)
        .filter(Boolean).length;
      const minutes = Math.max(1, Math.round(wordCount / 200));

      // permalink: prefer frontmatter.permalink, otherwise default to /articles/<id>
      const permalink = fm.permalink
        ? normalizePermalink(fm.permalink)
        : `/articles/${id}`;

      const article = {
        id,
        title: fm.title,
        author: fm.author || "Siddhartha",
        date: timeOrDate,
        description: fm.description || "",
        image: fm.image || "",
        content: convertContentToProjectFormat(content),
        category,
        categoryLabel,
        readTime: fm.readTime || `${minutes} min read`,
        permalink, // <-- saved permalink here
      };
      articles.push(article);
    });
    return articles;
  } catch (e) {
    console.error("Error converting markdown to articles:", e);
    return [];
  }
}

export function generateArticlesJS(articles) {
  const articlesArray = JSON.stringify(articles, null, 2);
  return `// Blog articles data - converted from Jekyll posts
export const articles = ${articlesArray};

export const getArticlesByCategory = (category) => {
  if (category === "all") return articles;
  return articles.filter((article) => article.category === category);
};

export const getArticleById = (id) => {
  return articles.find((article) => article.id === id);
};

// Helper: normalize trailing slash and compare permalinks
function _normalize(p) {
  if (!p) return p;
  return p.toString().replace(/\\/+$/,'');
}

export const getArticleByPermalink = (permalink) => {
  const norm = _normalize(permalink);
  return articles.find(a => _normalize(a.permalink) === norm);
};

export default articles;
`;
}

export function updateArticlesJS() {
  try {
    const articles = convertMarkdownToArticles();
    const content = generateArticlesJS(articles);
    const outPath = path.join(__dirname, "../data/articles.js");
    // Overwrite the file with fresh content
    fs.writeFileSync(outPath, content, { encoding: "utf8", flag: "w" });
    console.log(
      `Successfully updated articles.js with ${articles.length} articles`
    );
    return true;
  } catch (e) {
    console.error("Error updating articles.js:", e);
    return false;
  }
}
