import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CodeBlock from './CodeBlock'
import MetaBar from './MetaBar'

// attempt to import your generated data modules; shape can vary so we try common exports
import * as ArticlesModule from '../../data/articles'
import * as ProjectsModule from '../../data/projects'

function ContentModal({
  isOpen,
  onClose,
  title,
  typeLabel,
  image,
  zoomFactor = 1,
  meta = {}, // safer default
  description,
  content,
  renderContent,
  details, // optional details grid [{label, value}] for projects
  hideDate = false,
  // Called when a permalink-like internal link is clicked (e.g. "/articles/foo")
  // signature: function(permalinkString) { ... } — may be async
  onNavigatePermalink = null,
  // If true, this modal will call onClose() before navigation handler. Default: true
  shouldCloseOnNavigate = true,
}) {
  // destructure meta safely
  const { date, readTime, tag } = meta

  // local state that may be swapped in-place if we resolve a permalink without a parent handler
  const [localTitle, setLocalTitle] = useState(title)
  const [localTypeLabel, setLocalTypeLabel] = useState(typeLabel)
  const [localImage, setLocalImage] = useState(image)
  const [localMeta, setLocalMeta] = useState(meta)
  const [localDescription, setLocalDescription] = useState(description)
  const [localContent, setLocalContent] = useState(content)
  const [localDetails, setLocalDetails] = useState(details)

  const [readingProgress, setReadingProgress] = useState(0)

  // If parent props change (opening a different modal), sync local state
  useEffect(() => {
    setLocalTitle(title)
    setLocalTypeLabel(typeLabel)
    setLocalImage(image)
    setLocalMeta(meta)
    setLocalDescription(description)
    setLocalContent(content)
    setLocalDetails(details)
  }, [title, typeLabel, image, meta, description, content, details, isOpen])

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

    /* Link styles: no underline normally, underline on hover */
    .content-body a {
      color: #4a9eff;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.15s ease, text-decoration 0.15s ease;
    }
    .content-body a:hover {
      text-decoration: underline;
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

  // helper to flatten children and get text for headings
  const extractTextFromChildren = (children) => {
    if (typeof children === 'string') return children
    if (!children) return ''
    if (Array.isArray(children)) return children.map(c => extractTextFromChildren(c)).join('')
    // if it's a React element
    if (typeof children === 'object' && children.props && 'children' in children.props) {
      return extractTextFromChildren(children.props.children)
    }
    return String(children)
  }

  // --- permalink heuristics ---
  const looksLikePermalink = (href) => {
    if (!href || typeof href !== 'string') return false
    const trimmed = href.trim()
    if (trimmed.startsWith('#')) return false
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return false
    if (!trimmed.startsWith('/')) return false
    if (trimmed.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(trimmed)) return false
    return /^\/[A-Za-z0-9\-\/_]+\/?$/.test(trimmed)
  }

  const normalizePermalinkForLookup = (href) => {
    if (!href) return href
    return href.toString().replace(/\/+$/,'')
  }

  // Get arrays from imported modules (support multiple export shapes)
  const articlesArray = ArticlesModule.articles || ArticlesModule.default || ArticlesModule || []
  const projectsArray = ProjectsModule.projects || ProjectsModule.default || ProjectsModule || []

  // Normalize target keys to string and remove leading slash for id comparisons
  const stripLeadingSlash = (s) => (typeof s === 'string' ? s.replace(/^\/+/,'') : s)

  // Try to find an article or project by permalink/id
  const findByPermalink = (permalink) => {
    if (!permalink) return null
    const normalized = permalink.replace(/\/+$/,'') // no trailing slash
    const lookupKey = stripLeadingSlash(normalized)

    // search articles first
    if (Array.isArray(articlesArray)) {
      const byPermalink = articlesArray.find(a => {
        if (!a) return false
        // check common fields
        if (a.permalink && normalizePermalinkForLookup(a.permalink) === normalized) return true
        if (a.id && (a.id === lookupKey || a.id === normalized || `/${a.id}` === normalized)) return true
        // sometimes frontmatter has 'slug' or 'path'
        if (a.slug && (a.slug === lookupKey || a.slug === normalized)) return true
        if (a.path && (a.path === lookupKey || a.path === normalized)) return true
        return false
      })
      if (byPermalink) return { type: 'article', item: byPermalink }
    }

    if (Array.isArray(projectsArray)) {
      const byPermalink = projectsArray.find(p => {
        if (!p) return false
        if (p.permalink && normalizePermalinkForLookup(p.permalink) === normalized) return true
        if (p.id && (p.id === lookupKey || p.id === normalized || `/${p.id}` === normalized)) return true
        if (p.slug && (p.slug === lookupKey || p.slug === normalized)) return true
        if (p.path && (p.path === lookupKey || p.path === normalized)) return true
        return false
      })
      if (byPermalink) return { type: 'project', item: byPermalink }
    }

    return null
  }

  // If we need to open the found article/project inside this modal (fallback path)
  const openFoundInPlace = (found) => {
    if (!found) return
    const { type, item } = found
    // Map item fields to modal fields (best-effort)
    setLocalTitle(item.title || item.id || 'Untitled')
    setLocalTypeLabel(type === 'project' ? (item.type || 'Project') : (item.categoryLabel || 'Article'))
    setLocalImage(item.image || '')
    setLocalMeta({
      date: item.date || item.time || '',
      readTime: item.readTime || item.read_time || '',
      tag: item.tag || item.category || ''
    })
    setLocalDescription(item.description || '')
    setLocalContent(item.content || item.body || '')
    setLocalDetails(item.details || [])
    // scroll to top of modal content
    const el = document.querySelector('[data-content-scroll]')
    if (el) el.scrollTop = 0
  }

  // Handle navigation to an internal permalink.
  // Behavior:
  // - If onNavigatePermalink is provided: close modal (if shouldCloseOnNavigate) then call handler.
  // - Else: do an in-place swap (replace current modal content with the target).
  const handlePermalinkClick = async (e, href) => {
    e.preventDefault()
    const permalink = normalizePermalinkForLookup(href)

    // prefer parent handler if provided
    if (typeof onNavigatePermalink === 'function') {
      // close first if requested
      if (shouldCloseOnNavigate && typeof onClose === 'function') {
        try { onClose() } catch (err) { console.error('onClose threw:', err) }
      }
      try {
        const maybePromise = onNavigatePermalink(permalink)
        if (maybePromise && typeof maybePromise.then === 'function') await maybePromise
      } catch (err) {
        console.error('onNavigatePermalink threw:', err)
      }
      return
    }

    // fallback: try to resolve locally and swap content in-place
    const found = findByPermalink(permalink)
    if (found) {
      openFoundInPlace(found)
      return
    }

    // nothing found: warn (do not navigate away)
    console.warn('[ContentModal] permalink clicked but no onNavigatePermalink handler provided and target not found locally:', permalink)
  }

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
              /* block code placeholder (visual handled by CodeBlock) */
            }
          `}
        </style>

        <h2 style={titleStyles}>{localTitle}</h2>

        <MetaBar
          date={hideDate ? null : localMeta.date}
          readTime={localMeta.readTime || localMeta.read_time}
          tag={localMeta.tag}
        />

        {localImage && (
          <div style={{position:'relative',width:'100%',height:'220px',marginBottom:'2rem',overflow:'hidden',borderRadius:'12px'}}>
            <img
              src={localImage}
              alt={localTitle}
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
          </div>
        )}

        {localDetails && localDetails.length > 0 && (() => {
          let filteredDetails = localDetails;
          const isPersonal = (localTypeLabel && localTypeLabel.toLowerCase().includes('personal')) ||
            (localDetails && localDetails.some(d => d.label && d.label.toLowerCase() === 'type' && d.value && d.value.toLowerCase() === 'personal'));
          if (isPersonal) {
            filteredDetails = localDetails.filter(d => {
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

        {localDescription && (
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
            <span>{localDescription}</span>
          </div>
        )}

        {localContent && (
          <div className="content-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{

                // handle fenced code blocks by overriding pre
                pre({ node, children, ...props }) {
                  const codeElement = Array.isArray(children) ? children[0] : children
                  const className = codeElement?.props?.className || ''
                  const codeText = codeElement?.props?.children ?? ''
                  return <CodeBlock className={className}>{String(codeText)}</CodeBlock>
                },

                // inline code
                code({ node, className, children, ...props }) {
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

                img({ node, className, ...props }) {
                  if (className && className.includes("article-screenshots")) {
                    return (
                      <img
                        style={{
                          maxWidth: "45%",
                          minWidth: "200px",
                          borderRadius: "8px",
                          border: "1px solid rgba(255,255,255,0.12)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          margin: "0 auto",
                          display: "block"
                        }}
                        {...props}
                      />
                    );
                  }
                  return (
                    <img
                      style={{
                        maxWidth: "85%",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "block",
                        margin: "1.5rem auto",
                      }}
                      {...props}
                    />
                  );
                },

                div({ node, className, children, ...props }) {
                  if (className && className.includes("two-images")) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "1.5rem 0",
                          flexWrap: "wrap",
                        }}
                      >
                        {children}
                      </div>
                    );
                  }
                  return <div {...props}>{children}</div>;
                },

                a({ node, ...props }) {
                  const { href } = props;

                  // in-article anchor
                  if (href && href.startsWith('#')) {
                    return (
                      <a
                        {...props}
                        className="anchor-link"
                        href={href}
                        onClick={e => {
                          e.preventDefault();
                          const el = document.getElementById(href.slice(1));
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      />
                    );
                  }

                  // internal permalink
                  if (looksLikePermalink(href)) {
                    return (
                      <a
                        {...props}
                        className="permalink-link"
                        href={href}
                        onClick={(e) => handlePermalinkClick(e, href)}
                      />
                    );
                  }

                  // external
                  return <a {...props} className="external-link" target="_blank" rel="noopener noreferrer" />;
                },

                // headings with slugs
                h1({ node, ...props }) {
                  const text = extractTextFromChildren(props.children)
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .toLowerCase();
                  return <h1 id={text} {...props} />;
                },
                h2({ node, ...props }) {
                  const text = extractTextFromChildren(props.children)
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .toLowerCase();
                  return <h2 id={text} {...props} />;
                },
                h3({ node, ...props }) {
                  const text = extractTextFromChildren(props.children)
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .toLowerCase();
                  return <h3 id={text} {...props} />;
                },
                h4({ node, ...props }) {
                  const text = extractTextFromChildren(props.children)
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .toLowerCase();
                  return <h4 id={text} {...props} />;
                }

              }}
            >
              {localContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ContentModal
