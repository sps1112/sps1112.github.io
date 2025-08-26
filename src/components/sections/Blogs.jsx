import React, { useState } from 'react'
import { getArticlesByCategory } from '../../data/articles'

function Blogs({ onArticleClick }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredArticles = getArticlesByCategory(activeCategory)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'gamedev', label: 'GameDev' },
  ]

  const sectionStyles = {
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

  const cardStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  }

  const imageStyles = {
    width: '100%',
    height: '180px',
    objectFit: 'cover'
  }

  const cardBodyStyles = {
    padding: '1rem 1.25rem'
  }

  const cardTitleStyles = {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem'
  }

  const cardMetaStyles = {
    color: '#aaaaaa',
    fontSize: '0.85rem',
    marginBottom: '0.5rem'
  }

  const cardDescStyles = {
    color: '#cccccc',
    fontSize: '0.95rem'
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>My Articles</h2>

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
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              style={cardStyles}
              onClick={() => onArticleClick && onArticleClick(article)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(74,158,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {article.image && (
                <img src={article.image} alt={article.title} style={imageStyles} />
              )}
              <div style={cardBodyStyles}>
                <div style={cardTitleStyles}>{article.title}</div>
                <div style={cardMetaStyles}>{article.date} • {article.readTime}</div>
                <div style={cardDescStyles}>{article.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blogs
