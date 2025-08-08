# 🎯 Siddhartha Pratap Singh - Modern React Portfolio

A complete reimplementation of the original Jekyll portfolio website using modern React architecture with enhanced UX and interactive features.

## ✨ Features

### 🎨 Modern Design
- **Dark Theme**: Professional dark color scheme with blue accents
- **Tab-Based Navigation**: Instant switching between sections
- **Responsive Design**: Perfect experience on all devices
- **Smooth Animations**: Polished transitions and hover effects
- **Interactive Modals**: Detailed project and article viewers

### 📱 User Experience
- **Mobile-First**: Touch-friendly interface with hamburger navigation
- **Fast Performance**: Inline CSS and optimized components
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: Graceful error boundaries and fallbacks

### 🎮 Portfolio Showcase
- **Project Filtering**: Filter by Games, Graphics, Tools, Professional
- **Modal Details**: In-depth project information with galleries
- **Technical Articles**: Blog posts with reading progress tracking
- **Work Timeline**: Interactive experience visualization

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sps1112/sps1112.github.io.git
   cd sps1112.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   *If you encounter PowerShell execution policy issues on Windows:*
   ```powershell
   # Option 1: Enable scripts (recommended)
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   npm run dev
   
   # Option 2: Use Command Prompt
   cmd
   npm run dev
   
   # Option 3: Run Vite directly
   node node_modules/vite/bin/vite.js
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Architecture

### Component Structure
```
src/
├── App.jsx                     # Main app with state management
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Fixed navigation with mobile menu
│   │   └── Footer.jsx         # Social links and copyright
│   ├── sections/
│   │   ├── Hero.jsx           # Landing with typewriter animation
│   │   ├── About.jsx          # Personal intro and skills
│   │   ├── Portfolio.jsx      # Project showcase with filtering
│   │   ├── Experience.jsx     # Work timeline and achievements
│   │   └── Contact.jsx        # Contact info and availability
│   ├── ui/
│   │   ├── Modal.jsx          # Reusable modal component
│   │   ├── ProjectCard.jsx    # Interactive project cards
│   │   └── ErrorBoundary.jsx  # Error handling
│   └── modals/
│       ├── ProjectModal.jsx   # Detailed project viewer
│       └── ArticleModal.jsx   # Blog post reader
├── data/
│   ├── config.js              # Site configuration
│   ├── projects.js            # Project data (10 projects)
│   ├── experience.js          # Work history and achievements
│   └── articles.js            # Blog posts and technical articles
└── main.jsx                   # Entry point with global styles
```

### Technology Stack
- **Framework**: React 18 with hooks
- **Build Tool**: Vite (fast development and building)
- **Styling**: Inline CSS (no external dependencies)
- **State Management**: React useState for component state
- **Deployment**: GitHub Pages ready

## 📊 Content Overview

### Projects (10 total)
- **4 Games**: Roaming Ruins, The Tests, Tactics RPG, etc.
- **3 Graphics**: OpenGL Renderer, PBR, Shader Library
- **2 Tools**: Noise Generator, Pathfinder
- **2 Professional**: ShareChat work, VR applications

### Articles (3 technical posts)
- Motion in Games (technical guide)
- The Tests Devlog (development retrospective)
- Prefabs in Games (technical tutorial)

### Experience
- **ShareChat**: Graphics Engineer Intern
- **Studio Centauri, IITK**: Group Leader
- **Counselling Service**: Student Guide

## 🎯 Key Improvements Over Original

| Aspect | Original Jekyll | New React Version |
|--------|----------------|-------------------|
| **Navigation** | Long vertical scroll | Instant tab switching |
| **Project Discovery** | All projects at once | Filterable categories |
| **Mobile Experience** | Basic responsive | Touch-optimized interface |
| **Interactivity** | Static content | Modals, animations, hover effects |
| **Performance** | Page loads | Fast component switching |
| **Code Organization** | Jekyll templates | Modern React architecture |

## 🛠️ Development Guide

### Adding New Projects
```javascript
// In src/data/projects.js
{
  id: "project-name",
  title: "Project Title",
  type: "Self-project" | "Professional",
  engine: "Unity",
  language: "C#",
  platform: "PC",
  description: "Project description",
  image: "/assets/projects/image.png",
  category: "games" | "graphics" | "tools" | "professional",
  links: {
    build: "https://...",
    source: "https://github.com/..."
  },
  featured: true | false
}
```

### Adding New Articles
```javascript
// In src/data/articles.js
{
  id: "article-slug",
  title: "Article Title",
  author: "Siddhartha",
  date: "Month Year",
  description: "Brief description",
  content: "Markdown content...",
  category: "technical" | "devlog" | "tutorial",
  readTime: "X min read"
}
```

### Customizing Styles
All styling is done through inline CSS objects in components. Key color variables:
- **Primary**: `#4696e1` (blue accent)
- **Background**: `#0a0a0a` (dark)
- **Text**: `white` and `#e0e0e0`
- **Secondary**: `rgba(70, 150, 225, 0.2)` (translucent blue)

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure custom domain if needed

### Manual Deployment
```bash
npm run build
# Upload dist/ contents to your web server
```

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Features**: CSS Grid, Flexbox, ES6+ JavaScript

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs or issues
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

MIT License - feel free to use this code for your own portfolio projects.

---

**Built with ❤️ using React and modern web technologies**