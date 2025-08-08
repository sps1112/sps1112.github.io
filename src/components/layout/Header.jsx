import React, { useState } from 'react'
import { siteConfig } from '../../data/config'

function Header({ activeTab, onTabChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    padding: '1rem 2rem'
  }

  const containerStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: '1rem', // Extra padding to push content left
    gap: '4rem' // Larger gap
  }

  const logoStyles = {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    fontWeight: '700',
    color: '#4a9eff',
    textDecoration: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textShadow: '0 1px 8px rgba(74, 158, 255, 0.15)',
    marginRight: 'auto',
    marginLeft: '0',
    flexShrink: 0,
    lineHeight: 1.2
  }

  const navStyles = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  }

  const navItemStyles = {
    color: 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
    fontWeight: '500',
    padding: '0.6rem 1.2rem',
    borderRadius: '0.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    letterSpacing: '0.025em',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 1.2
  }

  const activeNavItemStyles = {
    ...navItemStyles,
    color: '#ffffff', // White color like hover
    backgroundColor: 'rgba(74, 158, 255, 0.15)',
    fontWeight: '700',
    textShadow: '0 0 8px rgba(74, 158, 255, 0.4)',
    boxShadow: '0 0 15px rgba(74, 158, 255, 0.2)',
    transform: 'translateY(-2px) scale(1.05)' // Same scale as hover
  }

  const mobileMenuButtonStyles = {
    display: 'none',
    flexDirection: 'column',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem'
  }

  const mobileMenuStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.98)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: isMobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    padding: '1rem 2rem'
  }

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'experience', label: 'CV' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <a
          style={logoStyles}
          onClick={() => onTabChange('hero')}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffffff'
            e.target.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.4)'
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#4a9eff'
            e.target.style.textShadow = '0 0 8px rgba(74, 158, 255, 0.2)'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          {siteConfig.name}
        </a>

        <nav style={navStyles} className="desktop-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              style={activeTab === item.id ? activeNavItemStyles : navItemStyles}
              onClick={() => onTabChange(item.id)}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.color = '#ffffff' // White color on hover
                  e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.15)'
                  e.target.style.transform = 'translateY(-2px) scale(1.05)' // Slight size increase
                  e.target.style.textShadow = '0 0 8px rgba(74, 158, 255, 0.4)'
                  e.target.style.fontWeight = '700' // Bold on hover
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)'
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.textShadow = 'none'
                  e.target.style.fontWeight = '500' // Back to normal weight
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          style={mobileMenuButtonStyles}
          className="mobile-nav"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img 
            src={siteConfig.assets.icons.menu} 
            alt="Menu" 
            style={{ width: '24px', height: '24px', filter: 'invert(1)' }}
            onError={(e) => {
              // Fallback to hamburger lines if SVG fails
              e.target.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.innerHTML = `
                <span style="display: block; width: 24px; height: 2px; background: #ffffff; margin: 3px 0;"></span>
                <span style="display: block; width: 24px; height: 2px; background: #ffffff; margin: 3px 0;"></span>
                <span style="display: block; width: 24px; height: 2px; background: #ffffff; margin: 3px 0;"></span>
              `
              e.target.parentNode.appendChild(fallback)
            }}
          />
        </button>
      </div>

      <nav style={mobileMenuStyles} className="mobile-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            style={activeTab === item.id ? activeNavItemStyles : navItemStyles}
            onClick={() => {
              onTabChange(item.id)
              setIsMobileMenuOpen(false)
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header