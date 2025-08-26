import React from 'react'
import { siteConfig } from '../../data/config'
import { articles } from '../../data/articles'

function About({ onArticleClick }) {
  const aboutStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 4rem 2rem',
    backgroundColor: '#0a0a0a'
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const titleStyles = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: '700',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    letterSpacing: '-0.02em',
    lineHeight: 1.2
  }

  const contentStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  }

  const sectionStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
  }

  const sectionTitleStyles = {
    fontSize: '1.35rem',
    color: '#ffffff',
    marginBottom: '0.85rem',
    fontWeight: '700'
  }

  const paragraphStyles = {
    lineHeight: '1.8',
    color: '#d6d6d6',
    marginBottom: '0.85rem',
    fontSize: '1rem'
  }

  const skillCategoryStyles = {
    marginBottom: '1.25rem'
  }

  const skillCategoryTitleStyles = {
    fontSize: '1rem',
    color: '#ffffff',
    marginBottom: '0.4rem',
    fontWeight: '600'
  }

  const skillListStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  }

  const skillTagStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: 'white',
    padding: '0.35rem 0.75rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    border: '1px solid rgba(255, 255, 255, 0.12)'
  }

  const hobbiesStyles = {
    ...sectionStyles,
    gridColumn: 'auto'
  }

  const hobbyItemStyles = {
    marginBottom: '0.75rem'
  }

  const hobbyTitleStyles = {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '0.35rem'
  }

  const quoteStyles = {
    fontStyle: 'italic',
    fontSize: '1.1rem',
    color: '#ffffff',
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    margin: '1rem 0',
    gridColumn: '1 / -1',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
  }

  const leftColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }

  const rightColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }

  const photoCardStyles = {
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const photoStyles = {
    width: '80%',
    height: 'auto',
    maxHeight: '380px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '3px solid rgba(255,255,255,0.25)'
  }

  const introduction = [
    "Hello! I am Siddhartha Pratap Singh, a Game and Graphics Programmer from India.",
    "I studied at the Indian Institute of Technology, Kanpur, India with a B.S. in Chemistry as my major. I was the Group Leader of IITK's game development club: Studio Centauri.",
    "My introduction to Game Development was in early 2020. Since then, I have developed various games using Unity and Godot, gaining specialization in Game and Graphics Programming.",
    "I also did a summer internship at ShareChat in 2022 as a Graphics Engineer Intern. I have now graduated from IITK in 2024 and I'm currently looking for job opportunities."
  ]

  const skills = {
    "Languages": ["C", "C++", "C#", "Java", "Python", "GLSL", "HTML/CSS", "JavaScript"],
    "Engines & Software": ["Unity", "Godot", "Blender", "ShaderToy", "Android Studio"],
    "Utilities & Libraries": ["Linux", "Git/Github", "CMake", "OpenGL", "WebGL", "ImGUI", "Jekyll"],
    "Fields": ["Game Programming", "Graphics Programming", "Shader Writing", "Game Design", "Worldbuilding"]
  }

  return (
    <section style={aboutStyles}>
      <div style={containerStyles}>
        <h2 style={titleStyles}>About Me</h2>
        
        <div style={contentStyles}>
          {/* Left Column */}
          <div style={leftColumnStyles}>
            <div style={sectionStyles}>
              <h3 style={sectionTitleStyles}>Introduction</h3>
              {introduction.map((paragraph, index) => (
                <p key={index} style={paragraphStyles}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div style={sectionStyles}>
              <h3 style={sectionTitleStyles}>Current Status</h3>
              <p style={paragraphStyles}>
                {siteConfig.workStatus}
              </p>
            </div>

            <div style={hobbiesStyles}>
              <h3 style={sectionTitleStyles}>Interests & Hobbies</h3>
              <div style={hobbyItemStyles}>
                <div style={hobbyTitleStyles}>Favorite Games:</div>
                <p style={paragraphStyles}>{siteConfig.games}</p>
              </div>
              <div style={hobbyItemStyles}>
                <div style={hobbyTitleStyles}>Other Interests:</div>
                <p style={paragraphStyles}>{siteConfig.likes}</p>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div style={rightColumnStyles}>
            <div style={photoCardStyles}>
              <img src={siteConfig.assets.profileImg} alt={siteConfig.name} style={photoStyles} onError={(e) => { e.target.src = siteConfig.assets.profileImgAlt }} />
              <div style={{ color: '#e8e8e8', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>{siteConfig.name}</div>
            </div>

            <div style={sectionStyles}>
              <h3 style={sectionTitleStyles}>Technical Skills</h3>
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} style={skillCategoryStyles}>
                  <h4 style={skillCategoryTitleStyles}>{category}</h4>
                  <div style={skillListStyles}>
                    {skillList.map((skill, index) => (
                      <span key={index} style={skillTagStyles}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quote spanning both columns */}
        <div style={quoteStyles}>
          {siteConfig.quote}
        </div>

        {/* Removed Recent Articles section */}
      </div>
    </section>
  )
}

export default About