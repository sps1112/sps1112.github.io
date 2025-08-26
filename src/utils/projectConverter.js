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
  // Remove frontmatter completely
  let projectContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

  // Convert markdown images to React-style img tags
  projectContent = projectContent.replace(
    /<img\s+class="article-screenshot"\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g,
    '<img style={{width: "100%", borderRadius: "8px", margin: "1rem 0"}}" src="$1" alt="$2" />'
  );

  // Convert markdown images with two-images class
  projectContent = projectContent.replace(
    /<img\s+class="article-screenshots"\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g,
    '<img style={{width: "100%", borderRadius: "8px", margin: "1rem 0"}}" src="$1" alt="$2" />'
  );

  // Convert div with two-images class to a simple div
  projectContent = projectContent.replace(
    /<div\s+class="two-images">\s*\n/g,
    "<div>\n"
  );

  // Convert markdown code blocks to React format
  projectContent = projectContent.replace(/```([\s\S]*?)```/g, "```$1```");

  // Convert markdown links to React format
  projectContent = projectContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Convert markdown headers
  projectContent = projectContent.replace(/^### (.*$)/gm, "### $1");
  projectContent = projectContent.replace(/^## (.*$)/gm, "## $1");
  projectContent = projectContent.replace(/^# (.*$)/gm, "# $1");

  // Convert markdown lists
  projectContent = projectContent.replace(/^- (.*$)/gm, "- $1");

  // Escape single quotes for JavaScript string
  projectContent = projectContent.replace(/'/g, "\\'");

  return projectContent;
}

// Main function to convert markdown files to projects
export function convertMarkdownToProjects() {
  const postsDir = path.join(__dirname, "../posts");
  const projects = [];

  try {
    const files = fs.readdirSync(postsDir);

    files.forEach((file) => {
      if (file.endsWith(".md")) {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, "utf8");

        const frontmatter = parseFrontmatter(content);

        if (!frontmatter || frontmatter.layout !== "project") {
          return; // Skip non-project files
        }

        const links = extractLinks(content);
        const projectId = generateProjectId(frontmatter.title);

        const project = {
          id: projectId,
          title: frontmatter.title,
          type: frontmatter.type || "Personal",
          engine: frontmatter.engine || "NA",
          language: frontmatter.language || "NA",
          platform: frontmatter.platform || "NA",
          description: frontmatter.description || "",
          image: frontmatter.image || "",
          category: frontmatter.category || "Other",
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
`;
}

// Function to update projects.js file
export function updateProjectsJS() {
  try {
    const projects = convertMarkdownToProjects();
    const projectsJSContent = generateProjectsJS(projects);

    const projectsJSPath = path.join(__dirname, "../data/projects.js");
    fs.writeFileSync(projectsJSPath, projectsJSContent, "utf8");

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
  const postsDir = path.join(__dirname, "../posts");
  const articles = [];
  try {
    const files = fs.readdirSync(postsDir);
    files.forEach((file) => {
      if (!file.endsWith(".md")) return;
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const fm = parseFrontmatter(content);
      if (!fm) return;
      if (fm.layout !== "article") return; // only articles
      const id = generateProjectId(fm.title);
      const article = {
        id,
        title: fm.title,
        author: fm.author || "Siddhartha",
        date: fm.date || "",
        description: fm.description || "",
        image: fm.image || "",
        content: convertContentToProjectFormat(content),
        category:
          (fm.category || "gamedev").toLowerCase() === "technical"
            ? "gamedev"
            : fm.category || "gamedev",
        readTime: fm.readTime || "",
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
  return `// Blog articles data - converted from Jekyll posts\nexport const articles = ${articlesArray};\n\nexport const getArticlesByCategory = (category) => {\n  if (category === "all") return articles;\n  return articles.filter((article) => article.category === category);\n};\n\nexport const getArticleById = (id) => {\n  return articles.find((article) => article.id === id);\n};\n\nexport default articles;\n`;
}

export function updateArticlesJS() {
  try {
    const articles = convertMarkdownToArticles();
    const content = generateArticlesJS(articles);
    const outPath = path.join(__dirname, "../data/articles.js");
    fs.writeFileSync(outPath, content, "utf8");
    console.log(
      `Successfully updated articles.js with ${articles.length} articles`
    );
    return true;
  } catch (e) {
    console.error("Error updating articles.js:", e);
    return false;
  }
}
