import React from 'react'
import { siteConfig } from '../../data/config'

function Contact() {
  const contactStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 4rem 2rem',
    backgroundColor: '#0a0a0a'
  }

  const containerStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  }

  const titleStyles = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem'
  }

  const subtitleStyles = {
    fontSize: '1.2rem',
    color: '#aaaaaa',
    marginBottom: '3rem',
    lineHeight: '1.6'
  }

  const statusStyles = {
    backgroundColor: '#1a1a1a',
    padding: '2rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '3rem'
  }

  const statusIndicatorStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '1rem'
  }

  const statusDotStyles = {
    width: '8px',
    height: '8px',
    backgroundColor: '#22c55e',
    borderRadius: '50%'
  }

  const statusMessageStyles = {
    color: '#aaaaaa',
    lineHeight: '1.6'
  }

  const socialLinksStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const socialLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#111315',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'all 0.25s ease',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(0,0,0,0.25)'
  }

  const iconStyles = {
    width: '22px',
    height: '22px',
    filter: 'brightness(0) saturate(100%) invert(72%) sepia(16%) saturate(1399%) hue-rotate(183deg) brightness(102%) contrast(96%)'
  }

  return (
    <section style={contactStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>Let's Connect</h2>
        <p style={subtitleStyles}>
          I'm always open to discussing new opportunities, collaborations, and interesting projects.
        </p>

        <div style={statusStyles}>
          <div style={statusIndicatorStyles}>
            <span style={statusDotStyles}></span>
            Available for opportunities
          </div>
          <div style={statusMessageStyles}>
            Currently seeking full-time opportunities in game development, graphics programming, 
            or related technical roles. Open to remote work and relocation.
          </div>
        </div>

        <div style={socialLinksStyles}>
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              style={socialLinkStyles}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(74, 158, 255, 0.12)'
                e.currentTarget.style.borderColor = '#4a9eff'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,158,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111315'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.25)'
              }}
            >
              {social.icon && (
                <img
                  src={social.icon}
                  alt={social.name}
                  style={iconStyles}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact