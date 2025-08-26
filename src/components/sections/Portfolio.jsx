import React, { useState } from 'react'
import { categories, projects as initialProjects } from '../../data/projects'
import ContentCard from '../ui/ContentCard'

function Portfolio({ onProjectClick }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [projectsList, setProjectsList] = useState(initialProjects)

  const filteredProjects = projectsList.filter(p => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'professional') return p.type === 'Professional'
    if (activeCategory === 'personal') return p.type === 'Personal'
    if (activeCategory === 'games') return p.category === 'Games'
    if (activeCategory === 'graphics') return p.category === 'Graphics'
    if (activeCategory === 'other') return p.category === 'Other'
    return true
  }).reverse()

  if (import.meta && import.meta.hot) {
    import.meta.hot.accept('../../data/projects', async () => {
      const mod = await import('../../data/projects.js?ts=' + Date.now())
      setProjectsList(mod.projects)
    })
  }

  const portfolioStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 4rem 2rem',
    backgroundColor: '#0a0a0a'
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const titleStyles = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '2rem',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    letterSpacing: '-0.02em',
    lineHeight: 1.2
  }

  const filterContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '3rem',
    padding: '0 1rem',
    alignItems: 'center'
  }

  const filterButtonStyles = {
    backgroundColor: 'transparent',
    color: '#aaaaaa',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: '1rem 2rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    minWidth: 'clamp(100px, 20vw, 140px)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontFamily: '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif'
  }

  const activeFilterButtonStyles = {
    ...filterButtonStyles,
    backgroundColor: '#4a9eff',
    color: '#ffffff',
    borderColor: '#4a9eff',
    boxShadow: '0 4px 20px rgba(74, 158, 255, 0.3)'
  }

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem'
  }

  return (
    <section style={portfolioStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>My Portfolio</h2>
        
        <div style={filterContainerStyles}>
          {categories.map((category) => (
            <button
              key={category.id}
              style={activeCategory === category.id ? activeFilterButtonStyles : filterButtonStyles}
              onClick={() => setActiveCategory(category.id)}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  const t = e.currentTarget
                  t.style.borderColor = '#4a9eff'
                  t.style.color = '#4a9eff'
                  t.style.backgroundColor = 'transparent'
                  t.style.transform = 'translateY(-2px)'
                  t.style.boxShadow = '0 6px 25px rgba(74, 158, 255, 0.2)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  const t = e.currentTarget
                  t.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  t.style.color = '#aaaaaa'
                  t.style.backgroundColor = 'transparent'
                  t.style.transform = 'translateY(0)'
                  t.style.boxShadow = 'none'
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div style={gridStyles}>
          {filteredProjects.map((project, index) => (
            <ContentCard
              key={project.id}
              item={{
                id: project.id,
                title: project.title,
                image: project.image,
                description: project.description,
                date: project.date,
                readTime: project.readTime,
                tagLabel: project.categoryLabel || (project.category ? (project.category.charAt(0).toUpperCase() + project.category.slice(1)) : ''),
                organization: project.organization,
                role: project.role,
                engine: project.engine,
                languages: project.language
              }}
              onClick={() => onProjectClick && onProjectClick(project)}
              staggerIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio