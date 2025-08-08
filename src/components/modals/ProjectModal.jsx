import React, { useState } from 'react'
import Modal from '../ui/Modal'

function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) return null

  const contentStyles = {
    padding: '3rem 2rem 2rem 2rem'
  }

  const headerStyles = {
    marginBottom: '2rem'
  }

  const titleStyles = {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    color: '#4696e1',
    fontWeight: '700',
    marginBottom: '0.5rem'
  }

  const typeStyles = {
    fontSize: '1rem',
    color: '#ccc',
    fontWeight: '500',
    marginBottom: '1rem'
  }

  const heroImageStyles = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(70, 150, 225, 0.2)'
  }

  const placeholderImageStyles = {
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 150, 225, 0.1)',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(70, 150, 225, 0.2)',
    color: '#4696e1',
    fontSize: '4rem'
  }

  const detailsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(70, 150, 225, 0.2)'
  }

  const detailItemStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  }

  const detailLabelStyles = {
    fontSize: '0.9rem',
    color: '#4696e1',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }

  const detailValueStyles = {
    fontSize: '1rem',
    color: 'white',
    fontWeight: '500'
  }

  const descriptionStyles = {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#e0e0e0',
    marginBottom: '2rem'
  }

  const linksContainerStyles = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  }

  const linkButtonStyles = {
    backgroundColor: '#4696e1',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const secondaryLinkStyles = {
    ...linkButtonStyles,
    backgroundColor: 'transparent',
    border: '2px solid #4696e1',
    color: '#4696e1'
  }

  const technicalDetailsStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(70, 150, 225, 0.2)',
    marginBottom: '2rem'
  }

  const sectionTitleStyles = {
    fontSize: '1.3rem',
    color: '#4696e1',
    fontWeight: '600',
    marginBottom: '1rem'
  }

  const featureListStyles = {
    listStyle: 'none',
    padding: 0
  }

  const featureItemStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
    marginBottom: '0.8rem',
    color: '#e0e0e0',
    lineHeight: '1.6'
  }

  const bulletStyles = {
    color: '#4696e1',
    fontSize: '1.2rem',
    marginTop: '0.2rem'
  }

  const getProjectIcon = (category) => {
    switch (category) {
      case 'games':
        return '🎮'
      case 'graphics':
        return '🎨'
      case 'tools':
        return '🛠️'
      default:
        return '💻'
    }
  }

  const getTechnicalFeatures = (project) => {
    // Generate technical features based on project data
    const features = []
    
    if (project.engine === 'Unity') {
      features.push('Unity Engine implementation with C# scripting')
      features.push('Custom component architecture and game systems')
    } else if (project.engine === 'Custom') {
      features.push('Built from scratch using modern C++ standards')
      features.push('Custom rendering pipeline and optimization techniques')
    }

    if (project.category === 'games') {
      features.push('Game mechanics and player interaction systems')
      features.push('Level design and gameplay balancing')
    } else if (project.category === 'graphics') {
      features.push('Advanced rendering techniques and shader programming')
      features.push('Performance optimization and GPU utilization')
    } else if (project.category === 'tools') {
      features.push('Algorithm implementation and data structure optimization')
      features.push('User interface design and interactive visualization')
    }

    features.push(`Cross-platform compatibility for ${project.platform}`)
    features.push('Comprehensive testing and debugging procedures')

    return features
  }

  const renderProjectContent = (content) => {
    // Enhanced markdown-like rendering for project content
    const cleanContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    
    return cleanContent.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} style={{
            fontSize: '2rem',
            color: '#4696e1',
            fontWeight: '700',
            marginTop: '2rem',
            marginBottom: '1rem'
          }}>
            {line.substring(2)}
          </h1>
        )
      }
      
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} style={{
            fontSize: '1.5rem',
            color: '#4696e1',
            fontWeight: '600',
            marginTop: '1.5rem',
            marginBottom: '0.8rem'
          }}>
            {line.substring(3)}
          </h2>
        )
      }
      
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} style={{
            fontSize: '1.2rem',
            color: '#4696e1',
            fontWeight: '600',
            marginTop: '1rem',
            marginBottom: '0.5rem'
          }}>
            {line.substring(4)}
          </h3>
        )
      }

      // Code blocks
      if (line.startsWith('```')) {
        return (
          <div key={index} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(70, 150, 225, 0.2)',
            borderRadius: '8px',
            padding: '1rem',
            margin: '1rem 0',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: '#40e658',
            overflow: 'auto'
          }}>
            <code>{line.substring(3)}</code>
          </div>
        )
      }

      // Images
      if (line.includes('<img')) {
        return (
          <div key={index} style={{
            textAlign: 'center',
            margin: '1.5rem 0'
          }}>
            <div
              dangerouslySetInnerHTML={{ __html: line }}
              style={{
                display: 'inline-block',
                maxWidth: '100%'
              }}
            />
          </div>
        )
      }

      // Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={index} style={{
            marginBottom: '0.5rem',
            color: '#e0e0e0',
            listStyleType: 'none',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#4696e1'
            }}>•</span>
            {line.substring(2)}
          </li>
        )
      }

      // Regular paragraphs
      if (line.trim() && !line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*')) {
        return (
          <p key={index} style={{ marginBottom: '1rem' }}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </p>
        )
      }

      // Empty lines
      if (!line.trim()) {
        return <br key={index} />
      }

      return null
    }).filter(Boolean)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="900px">
      <div style={contentStyles}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>{project.title}</h2>
          <div style={typeStyles}>
            {project.type} • {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </div>
        </div>

        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              style={heroImageStyles}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div style={{...placeholderImageStyles, display: 'none'}}>
              {getProjectIcon(project.category)}
            </div>
          </>
        ) : (
          <div style={placeholderImageStyles}>
            {getProjectIcon(project.category)}
          </div>
        )}

        <div style={detailsGridStyles}>
          <div style={detailItemStyles}>
            <span style={detailLabelStyles}>Engine</span>
            <span style={detailValueStyles}>{project.engine}</span>
          </div>
          <div style={detailItemStyles}>
            <span style={detailLabelStyles}>Language</span>
            <span style={detailValueStyles}>{project.language}</span>
          </div>
          <div style={detailItemStyles}>
            <span style={detailLabelStyles}>Platform</span>
            <span style={detailValueStyles}>{project.platform}</span>
          </div>
          <div style={detailItemStyles}>
            <span style={detailLabelStyles}>Type</span>
            <span style={detailValueStyles}>{project.type}</span>
          </div>
        </div>

        <p style={descriptionStyles}>{project.description}</p>
        
        {/* Full Project Content */}
        {project.content && (
          <div style={{
            marginTop: '2rem',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#e0e0e0'
          }}>
            {renderProjectContent(project.content)}
          </div>
        )}

        {project.links && (
          <div style={linksContainerStyles}>
            {project.links.build && (
              <a
                href={project.links.build}
                target="_blank"
                rel="noopener noreferrer"
                style={linkButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3a7bc8'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4696e1'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                🚀 Live Demo
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                style={secondaryLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#4696e1'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#4696e1'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                📁 Source Code
              </a>
            )}
          </div>
        )}


      </div>
    </Modal>
  )
}

export default ProjectModal