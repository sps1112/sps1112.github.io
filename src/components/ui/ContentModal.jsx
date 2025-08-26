import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import MetaBar from './MetaBar'

function ContentModal({
  isOpen,
  onClose,
  title,
  typeLabel,
  image,
  meta: { date, readTime, tag } = {},
  description,
  content,
  renderContent,
  details, // optional details grid [{label, value}] for projects
  hideDate = false
}) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.querySelector('[data-content-scroll]')
      if (!el) return
      const top = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      const p = total > 0 ? (top / total) * 100 : 0
      setReadingProgress(Math.min(100, Math.max(0, p)))
    }
    const el = document.querySelector('[data-content-scroll]')
    if (el) {
      el.addEventListener('scroll', update)
      return () => el.removeEventListener('scroll', update)
    }
  }, [isOpen])

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
    overflowX: 'hidden',
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#e0e0e0'
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
    height: '260px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(70, 150, 225, 0.2)'
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

  const renderHtmlContent = (raw) => {
    // Normalize CRLF
    let html = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    
    // Convert <code-container>/<code-block> to pre/code blocks
    html = html.replace(/<div class="code-container">[\s\S]*?<pre class="code-block">([\s\S]*?)<\/pre>[\s\S]*?<\/div>/g,
      (m, code) => `<pre class="rendered-code"><code>${code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    
    // Convert article-screenshot images to centered responsive images
    html = html.replace(/<img class="article-screenshot"[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g,
      (m, src, alt) => `<div class="rendered-image"><img src="${src}" alt="${alt}"/></div>`)
    
    // two-images container -> flex row of images
    html = html.replace(/<div class="two-images">([\s\S]*?)<\/div>/g, (m, inner) => {
      const imgs = Array.from(inner.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g))
      return `<div class="rendered-two-images">${imgs.map(([_, s, a])=>`<img src="${s}" alt="${a}"/>`).join('')}</div>`
    })
    
    return html
  }

  const injectedCss = `
    .rendered-code { 
      background: rgba(0,0,0,0.5); 
      border: 1px solid rgba(70,150,225,0.2); 
      border-radius: 8px; 
      padding: 1rem; 
      overflow: auto; 
      color: #e6e6e6; 
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 1.5rem 0;
    }
    .rendered-image { 
      text-align: center; 
      margin: 1.5rem 0; 
    }
    .rendered-image img { 
      max-width: 100%; 
      height: auto; 
      border-radius: 8px; 
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .rendered-two-images { 
      display: flex; 
      gap: 1rem; 
      align-items: center; 
      justify-content: center; 
      margin: 1.5rem 0;
      flex-wrap: wrap;
    }
    .rendered-two-images img { 
      max-width: 48%; 
      min-width: 200px;
      height: auto; 
      border-radius: 8px; 
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .content-body { 
      font-size: 1rem; 
      line-height: 1.7; 
      color: #e0e0e0;
    }
    .content-body a { 
      color: #5aa3ff; 
      text-decoration: underline; 
      transition: color 0.2s ease;
    }
    .content-body a:hover { 
      color: #7bb8ff; 
    }
    .content-body p { 
      margin-bottom: 1.2rem; 
    }
    .content-body h1, .content-body h2, .content-body h3, .content-body h4 { 
      color: #ffffff; 
      margin: 2rem 0 1rem 0; 
      font-weight: 600;
    }
    .content-body h1 { font-size: 1.8rem; }
    .content-body h2 { font-size: 1.5rem; }
    .content-body h3 { font-size: 1.3rem; }
    .content-body h4 { font-size: 1.1rem; }
    .content-body ul, .content-body ol { 
      margin: 1rem 0 1rem 1.5rem; 
    }
    .content-body li { 
      margin-bottom: 0.5rem; 
    }
    .content-body blockquote { 
      border-left: 4px solid #4696e1; 
      padding-left: 1rem; 
      margin: 1.5rem 0; 
      font-style: italic; 
      color: #b0b0b0;
    }
  `

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="900px">
      <div style={progressBarStyles}></div>
      <div style={contentStyles} data-content-scroll>
        <style>{injectedCss}</style>
        <h2 style={titleStyles}>{title}</h2>
        {typeLabel && <div style={typeStyles}>{typeLabel}</div>}
        <MetaBar date={hideDate ? null : date} readTime={readTime} tag={tag} />

        {image && (
          <img
            src={image}
            alt={title}
            style={heroImageStyles}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}

        {details && details.length > 0 && (
          <div style={detailsGridStyles}>
            {details.map((d, i) => (
              <div key={i} style={detailItemStyles}>
                <span style={detailLabelStyles}>{d.label}</span>
                <span style={detailValueStyles}>{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {description && (
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#e0e0e0', marginBottom: '2rem' }}>{description}</p>
        )}

        {content && (
          renderContent ? (
            renderContent(content)
          ) : (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: renderHtmlContent(content) }} />
          )
        )}
      </div>
    </Modal>
  )
}

export default ContentModal


