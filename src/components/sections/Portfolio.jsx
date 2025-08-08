import React, { useState } from 'react'
import { categories, getProjectsByCategory } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'

function Portfolio({ onProjectClick }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredProjects = getProjectsByCategory(activeCategory)

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
    gap: '1rem',
    marginBottom: '3rem'
  }

  const filterButtonStyles = {
    backgroundColor: 'transparent',
    color: '#aaaaaa',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.75rem 1.5rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  }

  const activeFilterButtonStyles = {
    ...filterButtonStyles,
    backgroundColor: '#4a9eff',
    color: '#ffffff',
    borderColor: '#4a9eff'
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
                  e.target.style.borderColor = '#4a9eff'
                  e.target.style.color = '#4a9eff'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.color = '#aaaaaa'
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div style={gridStyles}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio