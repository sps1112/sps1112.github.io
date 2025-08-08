import React, { useState, useEffect } from 'react'
import { siteConfig } from '../../data/config'

function Hero({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  // ===== EASY-TO-EDIT BANNER IMAGE LIST =====
  // Add, remove, or modify images here:
  const bannerImages = [
    '/assets/banner2.png',
    '/assets/banner.png',
    '/assets/projects/gs5.png',
    '/assets/projects/noise9.png',
    // Add more images here in the format: '/assets/your-image.jpg'
  ]
  // ==========================================

  // Generate shuffled order for random cycling
  const [shuffledIndices, setShuffledIndices] = useState([])
  const [currentShuffleIndex, setCurrentShuffleIndex] = useState(0)

  useEffect(() => {
    // Component loaded state
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Initialize shuffled array
    const indices = Array.from({ length: bannerImages.length }, (_, i) => i)
    const shuffled = [...indices].sort(() => Math.random() - 0.5)
    setShuffledIndices(shuffled)
    setCurrentBannerIndex(shuffled[0])
  }, [bannerImages.length])

  useEffect(() => {
    // Banner carousel auto-rotation with random order
    const bannerInterval = setInterval(() => {
      setCurrentShuffleIndex((prevShuffleIndex) => {
        const nextShuffleIndex = (prevShuffleIndex + 1) % shuffledIndices.length

        // If we completed a full cycle, reshuffle
        if (nextShuffleIndex === 0) {
          const newShuffled = [...shuffledIndices].sort(() => Math.random() - 0.5)
          setShuffledIndices(newShuffled)
          setCurrentBannerIndex(newShuffled[0])
        } else {
          setCurrentBannerIndex(shuffledIndices[nextShuffleIndex])
        }

        return nextShuffleIndex
      })
    }, 8000) // Change every 8 seconds

    return () => clearInterval(bannerInterval)
  }, [shuffledIndices])

  const heroStyles = {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0a0a0a',
    overflow: 'hidden'
  }

  const bannerContainerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden'
  }

  const bannerImageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Normal size to show full content
    height: '100%',
    objectFit: 'cover',
    opacity: 0.8, // More visible banner
    transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
    filter: 'blur(1px)', // Minimal blur
    transform: 'scale(1) translateX(0)', // No zoom by default
    animation: `bannerSlide 2s ease-in-out`
  }

  const bannerImageExitStyles = {
    ...bannerImageStyles,
    opacity: 0,
    transform: 'scale(1.1) translateX(-100px)', // Slide out effect
    transition: 'all 1s ease-in-out'
  }

  const bannerOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(10,10,10,0.3)', // Much more transparent overlay
    backdropFilter: 'blur(1px)', // Blur overlay instead of dark overlay
    zIndex: 2
  }

  const contentContainerStyles = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '800px',
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(145deg, rgba(10,10,10,0.1) 0%, rgba(26,26,26,0.08) 50%, rgba(10,10,10,0.12) 100%)',
    borderRadius: '24px',
    backdropFilter: 'blur(8px) saturate(120%)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    marginTop: '80px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
    overflow: 'hidden',
    // Add subtle geometric pattern
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 80%, rgba(74,158,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74,158,255,0.03) 0%, transparent 50%)',
      pointerEvents: 'none'
    }
  }

  const profileImageStyles = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '4px solid transparent',
    background: 'linear-gradient(135deg, #4a9eff, #64b5f6, #4a9eff)',
    padding: '4px',
    marginBottom: '2rem',
    objectFit: 'cover',
    boxShadow: '0 0 30px rgba(74, 158, 255, 0.3), inset 0 0 20px rgba(74, 158, 255, 0.1)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden'
  }

  const profileImageInnerStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'block',
    backgroundColor: '#0a0a0a'
  }

  const nameStyles = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.8rem',
    letterSpacing: '-0.03em', // Modern tight spacing
    textShadow: '0 2px 20px rgba(255,255,255,0.1)',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
    lineHeight: 1.1
  }

  const roleStyles = {
    fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
    color: '#4a9eff',
    marginBottom: '2rem',
    fontWeight: '500',
    letterSpacing: '0.02em',
    textShadow: '0 1px 10px rgba(74,158,255,0.2)',
    fontFamily: '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
    lineHeight: 1.4
  }

  const descriptionStyles = {
    fontSize: '1rem',
    color: '#aaaaaa',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.6'
  }

  const buttonContainerStyles = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }

  const primaryButtonStyles = {
    backgroundColor: '#4a9eff',
    color: '#ffffff',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  }

  const secondaryButtonStyles = {
    backgroundColor: 'transparent',
    color: '#4a9eff',
    border: '2px solid #4a9eff',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  }

  return (
    <section style={heroStyles}>
      {/* Banner Carousel Background */}
      <div style={bannerContainerStyles}>
        <img
          src={bannerImages[currentBannerIndex]}
          alt="Background banner"
          style={bannerImageStyles}
          key={currentBannerIndex} // Force re-render for transition
        />
        <div style={bannerOverlayStyles}></div>
      </div>

      {/* Main Content */}
      <div style={contentContainerStyles}>
        <div
          style={profileImageStyles}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05) rotate(1deg)'
            e.target.style.boxShadow = '0 0 40px rgba(74, 158, 255, 0.5), inset 0 0 25px rgba(74, 158, 255, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = '0 0 30px rgba(74, 158, 255, 0.3), inset 0 0 20px rgba(74, 158, 255, 0.1)'
          }}
        >
          <img
            src={siteConfig.assets.profileImg}
            alt={siteConfig.name}
            style={profileImageInnerStyles}
            onError={(e) => {
              e.target.src = siteConfig.assets.profileImgAlt
            }}
          />
        </div>

        <h1 style={nameStyles}>{siteConfig.name}</h1>
        <p style={roleStyles}>{siteConfig.role}</p>
        <p style={descriptionStyles}>{siteConfig.description}</p>

        <div style={buttonContainerStyles}>
          <button
            style={primaryButtonStyles}
            onClick={() => onNavigate('portfolio')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3a8eef'
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 10px 25px rgba(74,158,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4a9eff'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            View My Work
          </button>

          <button
            style={secondaryButtonStyles}
            onClick={() => onNavigate('about')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4a9eff'
              e.target.style.color = '#ffffff'
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 10px 25px rgba(74,158,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#4a9eff'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            About Me
          </button>
        </div>


      </div>
    </section>
  )
}

export default Hero