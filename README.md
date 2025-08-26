# SPS Portfolio Website

A React-based portfolio website for Siddhartha Pratap Singh, showcasing projects and technical articles.

## Features

- **Hero Section**: Dynamic banner with smooth transitions
- **Portfolio Section**: Project showcase with category filtering
- **Responsive Design**: Modern UI with responsive layouts
- **Project Management**: Automated conversion from markdown files

## Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.jsx          # Main banner section
│   │   └── Portfolio.jsx     # Project showcase section
│   └── ...
├── data/
│   └── projects.js           # Generated project data
├── posts/                    # Markdown project files
│   ├── 2021-04-1-RoamingRuins.md
│   ├── 2021-04-2-TheTests.md
│   └── ...
├── utils/
│   └── projectConverter.js   # Markdown to projects converter
└── ...
scripts/
└── update-projects.js        # Build script for updating projects
```

## Project Data Management

The website uses an automated system to convert markdown files from the `src/posts/` directory into the `projects.js` data file.

### Markdown File Format

Each project should be a markdown file with the following frontmatter:

```yaml
---
layout: project
title: "Project Title"
author: Siddhartha
permalink: /project-url/
type: "Personal"           # Personal or Professional
category: "Games"          # Games, Graphics, or Other
engine: "Unity"            # Engine used (or "NA")
language: "C#"             # Programming language
platform: "PC"             # Target platform
description: "Project description"
image: "/assets/projects/image.png"
---
```

### Project Categories

- **Games**: Game development projects
- **Graphics**: Graphics programming, shaders, rendering
- **Other**: Utility tools, libraries, other projects

### Project Types

- **Personal**: Self-initiated projects, game jams, learning projects
- **Professional**: Work projects, client work, commercial projects

## Development Workflow

### 1. Adding New Projects

1. Create a new markdown file in `src/posts/` with the naming convention: `YYYY-MM-D-ProjectName.md`
2. Add frontmatter with all required fields
3. Write your project content in markdown format
4. Run the converter to update `projects.js`

### 2. Updating Existing Projects

1. Edit the markdown file in `src/posts/`
2. Run the converter to update `projects.js`

### 3. Running the Converter

The converter automatically runs before starting the development server:

```bash
npm run dev          # Automatically runs converter + starts dev server
npm run build        # Automatically runs converter + builds for production
npm run update-projects  # Manually run converter only
```

## Available Scripts

- `npm run dev` - Start development server (auto-updates projects)
- `npm run build` - Build for production (auto-updates projects)
- `npm run preview` - Preview production build
- `npm run update-projects` - Manually update projects.js from markdown files

## Technical Details

### Banner Animation System

The Hero section uses a sophisticated animation system with:
- State-driven transitions
- Smooth fade effects
- Transform preservation during transitions
- CSS keyframe animations

### Portfolio Filtering

Projects can be filtered by:
- **All**: Shows all projects
- **Professional**: Work projects only
- **Personal**: Personal projects only
- **Games**: Game development projects
- **Graphics**: Graphics programming projects
- **Other**: Utility and other projects

### Content Conversion

The converter automatically:
- Parses markdown frontmatter
- Extracts project metadata
- Converts markdown content to React-compatible format
- Generates proper project objects
- Maintains consistent data structure

## Dependencies

- React 18.2.0
- Vite 7.0.6
- Modern CSS features (clamp, CSS Grid, Flexbox)

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Responsive design for mobile and desktop

## Contributing

1. Follow the existing code style
2. Update markdown files for content changes
3. Run the converter after making changes
4. Test the website locally before committing

## License

This project is for personal portfolio use.