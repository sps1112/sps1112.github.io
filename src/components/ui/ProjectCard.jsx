import React, { useState } from 'react'

function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  const cardStyles = {
    backgroundColor: '#1a1a1a',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 12px 24px rgba(0, 0, 0, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.2)'
  }

  const imageContainerStyles = {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#2a2a2a'
  }

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  }

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease'
  }

  const overlayTextStyles = {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600'
  }

  const contentStyles = {
    padding: '1.5rem'
  }

  const titleStyles = {
    fontSize: '1.25rem',
    color: '#ffffff',
    marginBottom: '0.5rem',
    fontWeight: '600'
  }

  const descriptionStyles = {
    color: '#aaaaaa',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  }

  const metaStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem'
  }

  const categoryStyles = {
    color: '#4a9eff',
    fontWeight: '500'
  }

  const yearStyles = {
    color: '#666666'
  }

  const placeholderStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    color: '#666666',
    fontSize: '3rem'
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(project)
    }
  }

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div style={imageContainerStyles}>
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              style={imageStyles}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div style={placeholderStyles} className="placeholder">
              📂
            </div>
            <div style={overlayStyles}>
              <span style={overlayTextStyles}>View Project</span>
            </div>
          </>
        ) : (
          <div style={placeholderStyles}>
            📂
          </div>
        )}
      </div>
      
      <div style={contentStyles}>
        <h3 style={titleStyles}>{project.title}</h3>
        <p style={descriptionStyles}>{project.description}</p>
        <div style={metaStyles}>
          <span style={categoryStyles}>{project.category}</span>
          <span style={yearStyles}>{project.year}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard