import React from 'react'
import { siteConfig } from '../../data/config'
import { articles } from '../../data/articles'

function About({ onArticleClick }) {
  const aboutStyles = {
    minHeight: '100vh',
    padding: '6rem 2rem 4rem 2rem',
    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 35, 50, 0.8) 100%)'
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const titleStyles = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: '#4a9eff',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: '700',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    letterSpacing: '-0.02em',
    lineHeight: 1.2
  }

  const contentStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    marginBottom: '4rem'
  }

  const leftColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  }

  const rightColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  }

  const sectionStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid rgba(70, 150, 225, 0.2)'
  }

  const sectionTitleStyles = {
    fontSize: '1.5rem',
    color: '#4696e1',
    marginBottom: '1rem',
    fontWeight: '600'
  }

  const paragraphStyles = {
    lineHeight: '1.8',
    color: '#e0e0e0',
    marginBottom: '1rem',
    fontSize: '1rem'
  }

  const skillCategoryStyles = {
    marginBottom: '1.5rem'
  }

  const skillCategoryTitleStyles = {
    fontSize: '1.1rem',
    color: '#4696e1',
    marginBottom: '0.5rem',
    fontWeight: '600'
  }

  const skillListStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  }

  const skillTagStyles = {
    backgroundColor: 'rgba(70, 150, 225, 0.2)',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    border: '1px solid rgba(70, 150, 225, 0.3)'
  }

  const hobbiesStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid rgba(70, 150, 225, 0.2)',
    gridColumn: '1 / -1'
  }

  const hobbyItemStyles = {
    marginBottom: '1rem'
  }

  const hobbyTitleStyles = {
    color: '#4696e1',
    fontWeight: '600',
    marginBottom: '0.5rem'
  }

  const quoteStyles = {
    fontStyle: 'italic',
    fontSize: '1.1rem',
    color: '#4696e1',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'rgba(70, 150, 225, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(70, 150, 225, 0.3)',
    margin: '2rem 0'
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
          </div>
          
          <div style={rightColumnStyles}>
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
        
        <div style={quoteStyles}>
          {siteConfig.quote}
        </div>

        {/* Blog Articles Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Recent Articles</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {articles.slice(0, 3).map(article => (
              <div
                key={article.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid rgba(70, 150, 225, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => onArticleClick && onArticleClick(article)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(70, 150, 225, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <h4 style={{
                  color: '#4696e1',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  {article.title}
                </h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  {article.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#999'
                }}>
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About