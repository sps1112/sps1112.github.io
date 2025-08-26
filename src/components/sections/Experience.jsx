import React, { useEffect, useRef, useState } from 'react'
import { workExperience, achievements } from '../../data/experience'
import { siteConfig } from '../../data/config'
import { useViewport } from '../../hooks/useViewport'

function Experience() {
  const { isMobile } = useViewport()
  const [activeIndex, setActiveIndex] = useState(0)
  const [progressPct, setProgressPct] = useState(0)
  const [dotPercents, setDotPercents] = useState([])
  const itemRefs = useRef([])
  const timelineRef = useRef(null)
  const experienceStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 2rem 2rem',
    backgroundColor: '#0a0a0a'
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const mainTitleStyles = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '3rem',
  }

  const topActionsStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  }

  const resumeBtnStyles = {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#4696e1',
    color: 'white', padding: '0.7rem 1.2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700,
    border: '1px solid rgba(70,150,225,0.4)'
  }

  const sectionStyles = {
    marginBottom: '2.5rem'
  }

  const sectionTitleStyles = {
    fontSize: '1.8rem',
    color: '#ffffff',
    marginBottom: '2rem',
    fontWeight: '700'
  }

  const timelineStyles = {
    position: 'relative',
    paddingLeft: '2rem'
  }

  const timelineLineStyles = {
    position: 'absolute',
    left: '18px',
    top: 0,
    bottom: 0,
    width: '5px',
    background: 'transparent'
  }

  const experienceItemStyles = {
    position: 'relative',
    backgroundColor: '#101214',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '2rem',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  }

  const getAlternatingContainerStyles = (index) => {
    if (isMobile) {
      return { display: 'flex', justifyContent: 'flex-start', paddingLeft: '2rem' }
    }
    const isRight = index % 2 === 1
    return {
      display: 'flex',
      justifyContent: isRight ? 'flex-end' : 'flex-start',
      paddingLeft: isRight ? '2rem' : '0',
    }
  }

  const headerCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: '10px',
    padding: '0.8rem 1rem'
  }

  const experienceDotStyles = {
    position: 'absolute',
    left: '10px',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '4px solid #0a0a0a',
    backgroundColor: 'rgba(255,255,255,0.12)',
    boxShadow: '0 0 0 2px rgba(255,255,255,0.18) inset'
  }

  const companyRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9rem',
    marginBottom: '0.5rem'
  }

  const logoStyles = {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.06)'
  }

  const companyStyles = {
    fontSize: '1.35rem',
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 0
  }

  const roleStyles = {
    fontSize: '1.1rem',
    color: '#4a9eff',
    marginBottom: 0,
    fontWeight: '600'
  }

  const periodBadgeStyles = {
    display: 'inline-block',
    padding: '0.25rem 0.6rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#cccccc',
    fontSize: '0.9rem',
    marginBottom: 0
  }

  const descriptionStyles = {
    color: '#aaaaaa',
    lineHeight: '1.6'
  }

  const achievementsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  }

  const achievementCardStyles = {
    backgroundColor: '#1a1a1a',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }

  const achievementTitleStyles = {
    fontSize: '1.1rem',
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '0.5rem'
  }

  const achievementDescStyles = {
    color: '#aaaaaa',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  }

  // Precompute dot positions along the timeline
  useEffect(() => {
    const calc = () => {
      const tl = timelineRef.current
      if (!tl) return
      const rect = tl.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const height = rect.height || 1
      const percents = itemRefs.current.map((el) => {
        if (!el) return 0
        const r = el.getBoundingClientRect()
        const center = r.top + window.scrollY + r.height / 2
        const p = ((center - top) / height) * 100
        return Math.max(0, Math.min(100, p))
      })
      setDotPercents(percents)
    }
    calc()
    window.addEventListener('resize', calc)
    window.addEventListener('load', calc)
    setTimeout(calc, 100)
    return () => {
      window.removeEventListener('resize', calc)
      window.removeEventListener('load', calc)
    }
  }, [])

  // Active item nearest to viewport center and line fill to that dot
  useEffect(() => {
    const onScroll = () => {
      const centerY = window.scrollY + window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      itemRefs.current.forEach((el, idx) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const c = r.top + window.scrollY + r.height / 2
        const d = Math.abs(c - centerY)
        if (d < bestDist) { best = idx; bestDist = d }
      })
      setActiveIndex(best)
      const p = dotPercents[best] ?? 0
      setProgressPct(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dotPercents])

  return (
    <section style={experienceStyles}>
      <div style={containerStyles}>
        <h2 style={mainTitleStyles}>Experience & Achievements</h2>
        <div style={topActionsStyles}>
          <a href="https://drive.google.com/file/d/1AgiAlDvl5ems-fJYHPCRZOufYjAImQjm/view" target="_blank" rel="noopener noreferrer" style={resumeBtnStyles}>📄 View Resume</a>
        </div>
        
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Work Experience</h3>
          <div style={timelineStyles} ref={timelineRef}>
            <div style={timelineLineStyles}>
              {/* Static base track from first to last dot */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: `${(dotPercents.length ? Math.min(...dotPercents) : 0)}%`,
                height: `${(dotPercents.length ? (Math.max(...dotPercents) - Math.min(...dotPercents)) : 0)}%`,
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.16)',
                borderRadius: '3px'
              }}></div>
              {/* Animated fill from first dot to active dot */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: `${(dotPercents.length ? Math.min(...dotPercents) : 0)}%`,
                height: `${(dotPercents.length ? Math.max(0, Math.min(progressPct, Math.max(...dotPercents)) - Math.min(...dotPercents)) : 0)}%`,
                width: '100%',
                backgroundColor: '#5aa3ff',
                borderRadius: '3px',
                transition: 'height 0.25s ease'
              }}></div>
            </div>
            {dotPercents.map((p, i) => (
              <div key={i} style={{
                ...experienceDotStyles,
                top: `${p}%`,
                backgroundColor: i <= activeIndex ? '#5aa3ff' : 'rgba(255,255,255,0.12)',
                boxShadow: i <= activeIndex ? '0 0 0 2px rgba(90,163,255,0.6), 0 0 8px rgba(90,163,255,0.45)' : experienceDotStyles.boxShadow
              }}></div>
            ))}
            {workExperience.map((experience, index) => (
              <div key={index} style={getAlternatingContainerStyles(index)}>
                <div
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-exp-idx={index}
                  style={{
                    ...experienceItemStyles,
                    maxWidth: '760px',
                    transform: index === activeIndex ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: index === activeIndex
                      ? '0 12px 28px rgba(0,0,0,0.35)'
                      : '0 6px 18px rgba(0,0,0,0.25)',
                    opacity: index === activeIndex ? 1 : 0.55,
                    filter: index === activeIndex ? 'none' : 'grayscale(0.2)'
                  }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'}}
                  onMouseLeave={(e)=>{ e.currentTarget.style.transform= index === activeIndex ? 'translateY(-3px)' : 'translateY(0)'}}
                >
                <div style={headerCardStyles}>
                  {experience.logo && (
                    <a href={experience.url || '#'} target="_blank" rel="noopener noreferrer"
                       style={{ display: 'inline-flex', alignItems: 'center' }}
                       onMouseEnter={(e)=>{ const img=e.currentTarget.querySelector('img'); if(img){ img.style.transform='scale(1.03)' } }}
                       onMouseLeave={(e)=>{ const img=e.currentTarget.querySelector('img'); if(img){ img.style.transform='scale(1)' } }}
                    >
                      <img src={experience.logo} alt={experience.company} style={{...logoStyles, transition: 'transform 0.2s ease'}} onError={(e) => { e.target.style.display = 'none' }} />
                    </a>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <a href={experience.url || '#'} target="_blank" rel="noopener noreferrer"
                       style={{ ...companyStyles, textDecoration: 'none', color: '#ffffff' }}
                       onMouseEnter={(e)=>{ e.currentTarget.style.color = '#5aa3ff' }}
                       onMouseLeave={(e)=>{ e.currentTarget.style.color = '#ffffff' }}
                    >{experience.company}</a>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={roleStyles}>{experience.position}</div>
                      <div style={periodBadgeStyles}>{experience.timeline}</div>
                    </div>
                  </div>
                </div>
                <div style={descriptionStyles}>
                  <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
                    {experience.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} style={{marginBottom: '0.6rem'}}>{task}</li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Achievements</h3>
          <div style={achievementsGridStyles}>
            {achievements.map((achievement, index) => (
              <div key={index} style={achievementCardStyles}>
                <div style={achievementTitleStyles}>{achievement.type}</div>
                <div style={achievementDescStyles}>
                  <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
                    {achievement.list.map((item, itemIndex) => (
                      <li key={itemIndex} style={{marginBottom: '0.5rem'}}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience