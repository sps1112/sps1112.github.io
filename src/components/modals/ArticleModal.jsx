import React, { useState, useEffect } from 'react'
import ContentModal from '../ui/ContentModal'

function ArticleModal({ article, isOpen, onClose }) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (!isOpen) return
      
      const scrollContainer = document.querySelector('[data-article-content]')
      if (!scrollContainer) return

      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    if (isOpen) {
      const scrollContainer = document.querySelector('[data-article-content]')
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateProgress)
        return () => scrollContainer.removeEventListener('scroll', updateProgress)
      }
    }
  }, [isOpen])

  if (!article) return null

  const progressBarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: `${readingProgress}%`,
    height: '3px',
    backgroundColor: '#4696e1',
    zIndex: 10002,
    transition: 'width 0.1s ease'
  }

  const contentStyles = {
    padding: '2rem',
    maxHeight: 'calc(90vh - 3px)',
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  const headerStyles = {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(70, 150, 225, 0.2)'
  }

  const titleStyles = {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    color: '#4696e1',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.2'
  }

  const metaStyles = {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '1rem'
  }

  const metaItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#ccc',
    fontSize: '0.9rem'
  }

  const categoryBadgeStyles = {
    backgroundColor: 'rgba(70, 150, 225, 0.2)',
    color: '#4696e1',
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid rgba(70, 150, 225, 0.3)'
  }

  const heroImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(70, 150, 225, 0.2)'
  }

  const placeholderImageStyles = {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 150, 225, 0.1)',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(70, 150, 225, 0.2)',
    color: '#4696e1',
    fontSize: '3rem'
  }

  const articleContentStyles = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#e0e0e0'
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'gamedev':
        return '📄'
      case 'devlog':
        return '📝'
      case 'tutorial':
        return '📚'
      default:
        return '📄'
    }
  }

  const renderMarkdownContent = (content) => {
    // Enhanced markdown-like rendering for article content
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

      // Inline code
      if (line.includes('`')) {
        const parts = line.split('`')
        return (
          <p key={index} style={{ marginBottom: '1rem' }}>
            {parts.map((part, i) => 
              i % 2 === 1 ? (
                <code key={i} style={{
                  backgroundColor: 'rgba(70, 150, 225, 0.2)',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  color: '#40e658'
                }}>
                  {part}
                </code>
              ) : part
            )}
          </p>
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
    <ContentModal
      isOpen={isOpen}
      onClose={onClose}
      title={article.title}
      typeLabel={null}
      image={article.image}
      meta={{ date: article.date, readTime: article.readTime, tag: `${getCategoryIcon(article.category)} ${(article.categoryLabel || (article.category ? (article.category.charAt(0).toUpperCase() + article.category.slice(1)) : ''))}` }}
      description={article.description}
      content={article.content}
      renderContent={(c) => (
        <div style={articleContentStyles}>
          {renderMarkdownContent(c)}
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(70, 150, 225, 0.2)',
            textAlign: 'center',
            color: '#ccc'
          }}>
            <p>Thank you for reading! 🎉</p>
          </div>
        </div>
      )}
    />
  )
}

export default ArticleModal