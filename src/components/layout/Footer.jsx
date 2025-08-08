import React from 'react'
import { siteConfig } from '../../data/config'

function Footer({ activeTab }) {
  const footerStyles = {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2rem',
    textAlign: 'center'
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const socialLinksStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  }

  const socialLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#4a9eff',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '500',
    letterSpacing: '0.01em',
    lineHeight: 1.3
  }

  const iconStyles = {
    width: '20px',
    height: '20px',
    filter: 'brightness(0) saturate(100%) invert(40%) sepia(99%) saturate(1447%) hue-rotate(198deg) brightness(96%) contrast(91%)'
  }

  const copyrightStyles = {
    color: '#aaaaaa',
    fontSize: '0.9rem',
    marginTop: '1rem'
  }

  // Use social links from config 
  const socialLinks = siteConfig.socialLinks || []

  // Conditional display - don't show on hero page (like original)
  if (activeTab === 'hero') {
    return null
  }

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={socialLinksStyles}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyles}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.1)'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#4a9eff'
              }}
            >
              <img 
                src={link.icon} 
                alt={`${link.name} icon`}
                style={iconStyles}
                onError={(e) => {
                  // Fallback if SVG doesn't load
                  e.target.style.display = 'none'
                }}
              />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <div style={copyrightStyles}>
          Copyright © {new Date().getFullYear()} • {siteConfig.name}
        </div>
      </div>
    </footer>
  )
}

export default Footer