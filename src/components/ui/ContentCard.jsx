import React from 'react'

function ContentCard({
  item, // { organization, role, engine, languages }
  onClick,
  staggerIndex = 0,
}) {
  const cardStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    boxShadow: '0 10px 22px rgba(0,0,0,0.28)',
    outline: 'none',
    transform: 'translateY(0)',
    opacity: 1,
    animation: `fadeUp 400ms ease ${Math.min(staggerIndex * 40, 400)}ms both`
  }

  const mediaWrapStyles = {
    position: 'relative',
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
  }

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  }

  const gradientOverlayStyles = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)',
    pointerEvents: 'none'
  }

  const cardBodyStyles = {
    padding: '1.1rem 1.25rem 1.25rem 1.25rem'
  }

  const titleStyles = {
    color: '#ffffff',
    fontSize: 'clamp(1.05rem, 2.8vw, 1.2rem)',
    fontWeight: '800',
    marginBottom: '0.55rem',
    letterSpacing: '-0.01em'
  }

  const metaStyles = {
    color: '#bcbcbc',
    fontSize: 'clamp(0.82rem, 2.5vw, 0.92rem)',
    marginBottom: '0.65rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap'
  }

  const tagBadgeStyles = {
    display: 'inline-block',
    backgroundColor: 'rgba(74, 158, 255, 0.18)',
    border: '1px solid rgba(74, 158, 255, 0.38)',
    color: '#63adff',
    padding: '0.22rem 0.65rem',
    borderRadius: '999px',
    fontSize: '0.72rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  }

  const descStyles = {
    color: '#d8d8d8',
    fontSize: 'clamp(0.92rem, 2.6vw, 0.98rem)',
    lineHeight: 1.55
  }



  return (
    <div
      style={cardStyles}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
      onClick={() => onClick && onClick()}
      onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onClick && onClick() } }}
      onMouseEnter={(e)=>{
        e.currentTarget.style.transform='translateY(-7px)';
        e.currentTarget.style.boxShadow='0 18px 34px rgba(0,0,0,0.38)';
        e.currentTarget.style.borderColor='rgba(98, 165, 255, 0.45)';
        const img=e.currentTarget.querySelector('img'); if(img){ img.style.transform='scale(1.07)'}
      }}
      onMouseLeave={(e)=>{
        e.currentTarget.style.transform='translateY(0)';
        e.currentTarget.style.boxShadow='0 10px 22px rgba(0,0,0,0.28)';
        e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';
        const img=e.currentTarget.querySelector('img'); if(img){ img.style.transform='scale(1)'}
      }}
    >
      <div style={mediaWrapStyles}>
        {item.image && (
          <img src={item.image} alt={item.title} style={imageStyles} />
        )}
        <div style={gradientOverlayStyles}></div>
      </div>
      <div style={cardBodyStyles}>
        <div style={titleStyles}>{item.title}</div>
        {/* Line 2: Date • Time to Read */}
        <div style={metaStyles}>
          {item.date && <span>{item.date}</span>}
          <span>•</span>
          {item.readTime && <span>{item.readTime}</span>}
        </div>
        {/* Line 3: Organization • Role (only for professional projects) */}
        {item.organization && item.organization !== 'Self' && (
          <div style={metaStyles}>
            <span>{item.organization}</span>
            {item.role && (
              <>
                <span>•</span>
                <span>{item.role}</span>
              </>
            )}
          </div>
        )}
        {/* Line 4: Category • Engine • Languages */}
        <div style={metaStyles}>
          <span style={tagBadgeStyles}>{item.tagLabel}</span>
          {item.engine && item.engine !== 'NA' && (
            <>
              <span>•</span>
              <span style={tagBadgeStyles}>{item.engine}</span>
            </>
          )}
          {Array.isArray(item.languages) ? item.languages.map((lang, i) => (
            <>
              <span key={i}>•</span>
              <span key={`lang-${i}`} style={tagBadgeStyles}>{lang}</span>
            </>
          )) : (item.languages && item.languages !== 'NA' ? item.languages.split(',').map((lang, i) => (
            <>
              <span key={i}>•</span>
              <span key={`lang-${i}`} style={tagBadgeStyles}>{lang.trim()}</span>
            </>
          )) : null)}
        </div>
        {item.description && (
          <div style={descStyles}>{item.description}</div>
        )}
      </div>
    </div>
  )
}

export default ContentCard


