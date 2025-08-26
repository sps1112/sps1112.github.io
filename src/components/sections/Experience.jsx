import React from 'react'
import { workExperience, achievements } from '../../data/experience'

function Experience() {
  const experienceStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 4rem 2rem',
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
    marginBottom: '3rem'
  }

  const sectionStyles = {
    marginBottom: '4rem'
  }

  const sectionTitleStyles = {
    fontSize: '1.8rem',
    color: '#4a9eff',
    marginBottom: '2rem',
    fontWeight: '600'
  }

  const timelineStyles = {
    position: 'relative',
    paddingLeft: '2rem'
  }

  const timelineLineStyles = {
    position: 'absolute',
    left: '15px',
    top: 0,
    bottom: 0,
    width: '3px',
    background: 'linear-gradient(180deg, rgba(74,158,255,0.4), rgba(74,158,255,0))'
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
    left: '-2.4rem',
    top: '2rem',
    width: '12px',
    height: '12px',
    backgroundColor: '#4a9eff',
    borderRadius: '50%',
    border: '3px solid #0a0a0a'
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
    marginBottom: '0.5rem',
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
    marginBottom: '1rem'
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

  return (
    <section style={experienceStyles}>
      <div style={containerStyles}>
        <h2 style={mainTitleStyles}>Experience & Achievements</h2>
        
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Work Experience</h3>
          <div style={timelineStyles}>
            <div style={timelineLineStyles}></div>
            {workExperience.map((experience, index) => (
              <div key={index} style={experienceItemStyles}
                   onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.35)'}}
                   onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 18px rgba(0,0,0,0.25)'}}
              >
                <div style={experienceDotStyles}></div>
                <div style={headerCardStyles}>
                  {experience.logo && (
                    <img src={experience.logo} alt={experience.company} style={logoStyles} onError={(e) => { e.target.style.display = 'none' }} />
                  )}
                  <div style={companyStyles}>{experience.company}</div>
                </div>
                <div style={roleStyles}>{experience.position}</div>
                <div style={periodBadgeStyles}>{experience.timeline}</div>
                <div style={descriptionStyles}>
                  <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
                    {experience.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} style={{marginBottom: '0.6rem'}}>{task}</li>
                    ))}
                  </ul>
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