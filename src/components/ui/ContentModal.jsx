import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CodeBlock from './CodeBlock'
import MetaBar from './MetaBar'

function ContentModal({
  isOpen,
  onClose,
  title,
  typeLabel,
  image,
  zoomFactor = 1,
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
  backgroundColor: '#232a3a',
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
    color: '#e0e0e0',
    background: 'rgba(24, 24, 24, 0.98)',
    borderRadius: '16px',
    boxShadow: '0 2px 24px rgba(70,150,225,0.08)',
    scrollbarWidth: 'thin',
  scrollbarColor: '#444 #232a3a',
  }

  const titleStyles = {
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  color: '#b0b0b0',
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
  border: '1px solid rgba(70, 150, 225, 0.2)',
  transform: `scale(${zoomFactor})`,
  transition: 'transform 0.2s cubic-bezier(.4,2,.3,1)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
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
  color: '#b0b0b0',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }

  const detailValueStyles = {
    fontSize: '1rem',
    color: 'white',
    fontWeight: '500'
  }


  const injectedCss = `
    [data-content-scroll]::-webkit-scrollbar {
      width: 8px;
      background: #232a3a;
      border-radius: 8px;
    }
    [data-content-scroll]::-webkit-scrollbar-thumb {
    background: #444;
      border-radius: 8px;
      min-height: 24px;
    }
    [data-content-scroll]::-webkit-scrollbar-thumb:hover {
    background: #666;
    }
    .rendered-code {
      background: linear-gradient(90deg, #232a3a 0%, #1a1f2b 100%);
  border: 2px solid #444;
  box-shadow: 0 4px 24px rgba(44,44,44,0.12), 0 1.5px 0 #444 inset;
      border-radius: 12px;
      padding: 1.25rem 1rem;
      overflow: auto;
      color: #e6f1ff;
      font-family: 'Fira Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 1.05rem;
      line-height: 1.6;
      margin: 2rem 0;
      position: relative;
    }
    .rendered-code code {
      background: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      padding: 0;
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
  color: #b0b0b0; 
      text-decoration: underline; 
      transition: color 0.2s ease;
    }
    .content-body a:hover { 
  color: #e0e0e0; 
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
  border-left: 4px solid #444; 
      padding-left: 1rem; 
      margin: 1.5rem 0; 
      font-style: italic; 
      color: #b0b0b0;
    }
  `

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="1200px">
      <div style={progressBarStyles}></div>
      <div style={contentStyles} data-content-scroll>
        <style>{injectedCss}
          {`
            .inline-tag {
              font-style: italic;
              font-family: inherit;
              font-size: 1em;
              background: none !important;
              border: none !important;
              color: inherit !important;
              padding: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              margin: 0 !important;
              white-space: normal !important;
              position: static !important;
              display: inline !important;
            }
            pre > code {
              /* Your block code styling here */
            }
          `}
        </style>
        <h2 style={titleStyles}>{title}</h2>
  {typeLabel && !details && <div style={typeStyles}>{typeLabel}</div>}
        <MetaBar
          date={hideDate ? null : date}
          readTime={readTime}
          tag={tag}
        />

        {image && (
          <div style={{position:'relative',width:'100%',height:'220px',marginBottom:'2rem',overflow:'hidden',borderRadius:'12px'}}>
            <img
              src={image}
              alt={title}
              style={{
                ...heroImageStyles,
                position:'absolute',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                objectFit:'cover',
                zIndex:1
              }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {/* Mask removed, image displays with no overlay */}
          </div>
        )}

        {details && details.length > 0 && (() => {
          // Hide Organization and Role for Personal projects
          let filteredDetails = details;
          // Check if type is Personal (from typeLabel or details)
          const isPersonal = (typeLabel && typeLabel.toLowerCase().includes('personal')) ||
            details.some(d => d.label && d.label.toLowerCase() === 'type' && d.value && d.value.toLowerCase() === 'personal');
          if (isPersonal) {
            filteredDetails = details.filter(d => {
              const label = d.label && d.label.toLowerCase();
              return label !== 'organization' && label !== 'role';
            });
          }
          return (
            <div style={detailsGridStyles}>
              {filteredDetails.map((d, i) => (
                <div key={i} style={detailItemStyles}>
                  <span style={detailLabelStyles}>{d.label}</span>
                  <span style={detailValueStyles}>{d.value}</span>
                </div>
              ))}
            </div>
          );
        })()}

        {description && (
          <div
            style={{
              background: 'rgba(44,44,44,0.85)',
              border: '1.5px solid rgba(255,255,255,0.10)',
              borderRadius: '10px',
              padding: '1rem 1.5rem',
              marginBottom: '2rem',
              fontStyle: 'italic',
              fontWeight: 500,
              color: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
            }}
          >
            <span style={{fontSize:'1.3rem',opacity:0.7}}>📝</span>
            <span>{description}</span>
          </div>
        )}

        {content && (
          <div className="content-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                 // handle fenced code blocks
pre({ node, children, ...props }) {
      return <CodeBlock {...props}>{children.props.children}</CodeBlock>
    },
    // handle inline code
    code({ node, className, children, ...props }) {
      // if className exists, it's probably already handled by <pre> above
      if (className) {
        return <code className={className} {...props}>{children}</code>
      }
      return (
        <code
          className="inline-code"
          style={{
            backgroundColor: 'rgba(70, 150, 225, 0.18)',
            color: '#e1a340',
            fontFamily: 'Fira Mono, Monaco, Menlo, Ubuntu Mono, monospace',
            fontSize: '0.97em',
            padding: '0.1em 0.1em',
            borderRadius: '4px',
            margin: '0 2px',
          }}
          {...props}
        >
          {children}
        </code>
      )
    },
                img({node, ...props}) {
                  return <img style={{maxWidth:'100%',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.12)',boxShadow:'0 4px 12px rgba(0,0,0,0.3)',display:'block',margin:'1.5rem auto'}} {...props} />;
                },
                a({node, ...props}) {
                  const { href } = props;
                  if (href && href.startsWith('#')) {
                    return (
                      <a
                        style={{color:'#4a9eff',textDecoration:'none', cursor:'pointer'}}
                        href={href}
                        onClick={e => {
                          e.preventDefault();
                          const el = document.getElementById(href.slice(1));
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {props.children}
                      </a>
                    );
                  }
                  return <a style={{color:'#4a9eff',textDecoration:'underline'}} target="_blank" rel="noopener noreferrer" {...props} />;
                },
                h1({node, ...props}) {
                  const text = String(props.children).replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
                  return <h1 id={text} {...props} />;
                },
                h2({node, ...props}) {
                  const text = String(props.children).replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
                  return <h2 id={text} {...props} />;
                },
                h3({node, ...props}) {
                  const text = String(props.children).replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
                  return <h3 id={text} {...props} />;
                },
                h4({node, ...props}) {
                  const text = String(props.children).replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
                  return <h4 id={text} {...props} />;
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ContentModal


