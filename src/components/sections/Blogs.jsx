import React, { useState } from 'react'
import { articles as initialArticles } from '../../data/articles'
import ContentCard from '../ui/ContentCard'
import { useViewport } from '../../hooks/useViewport'

function Blogs({ onArticleClick }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [articlesList, setArticlesList] = useState(initialArticles)
  const { isMobile, isTablet } = useViewport()

  const filteredArticles = articlesList.filter(a => {
    if (activeCategory === 'all') return true
    return a.category === activeCategory
  }).reverse()

  if (import.meta && import.meta.hot) {
    import.meta.hot.accept('../../data/articles', async () => {
      const mod = await import('../../data/articles.js?ts=' + Date.now())
      setArticlesList(mod.articles)
    })
  }

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'gamedev', label: 'GameDev' },
  ]

  const sectionStyles = {
    minHeight: '100vh',
    padding: isMobile? '6rem 1rem 3rem 1rem' : '6rem 2rem 3rem 2rem',
    backgroundColor: '#0a0a0a'
  }

  const containerStyles = {
    maxWidth: '1250px',
    margin: '0 auto',
    paddingTop: isTablet? '2rem':'0',
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
    display: isMobile? 'grid':'flex',
    justifyContent: 'center',
    gridTemplateColumns: isMobile? '1fr 1fr':'none',
    flexWrap: 'wrap',
    gap: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: isMobile?'1.5rem':'3rem',
    padding: '0 1rem',
    alignItems: 'center'
  }

  const filterButtonStyles = {
    backgroundColor: 'transparent',
    color: '#aaaaaa',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: isMobile? '0.75rem' : '1rem 2rem',
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
    gridTemplateColumns: isMobile? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem'
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
          {filteredArticles.map((article, idx) => (
            <ContentCard
              key={article.id}
              item={{
                id: article.id,
                title: article.title,
                image: article.image,
                description: article.description,
                date: article.date,
                readTime: article.readTime,
                tagLabel: article.categoryLabel || (article.category ? (article.category.charAt(0).toUpperCase() + article.category.slice(1)) : ''),
              }}
              onClick={() => onArticleClick && onArticleClick(article)}
              staggerIndex={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blogs
