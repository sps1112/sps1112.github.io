import React, { useState, useEffect, useRef } from 'react'
import { siteConfig } from '../../data/config'
import { useViewport } from '../../hooks/useViewport'

function Hero({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [bannerState, setBannerState] = useState('entry') // 'entry', 'active', 'exit'
  const bannerRef = useRef(null)
  const [currentTransform, setCurrentTransform] = useState('scale(1.05) translateX(0) translateY(0)')
  const [isExiting, setIsExiting] = useState(false)
  const { isMobile } = useViewport()

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
    // Banner state management
    const entryTimer = setTimeout(() => {
      setBannerState('active')
    }, 2000) // 2s for entry animation

    const activeTimer = setTimeout(() => {
      // Capture current transform before transitioning to exit
      if (bannerRef.current) {
        const computedStyle = window.getComputedStyle(bannerRef.current)
        const transform = computedStyle.transform
        if (transform && transform !== 'none') {
          setCurrentTransform(transform)
        }
      }
      setIsExiting(true)
      setBannerState('exit')
    }, 6000) // 6s active time (8s total - 2s entry)

    const exitTimer = setTimeout(() => {
      // Change to next image
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
      setBannerState('entry')
    }, 7500) // 7.5s total (8s - 0.5s exit)

    return () => {
      clearTimeout(entryTimer)
      clearTimeout(activeTimer)
      clearTimeout(exitTimer)
    }
  }, [shuffledIndices, currentBannerIndex])

  // Handle exit animation after state change
  useEffect(() => {
    if (bannerState === 'exit' && bannerRef.current) {
      // Apply exit animation after a brief delay to ensure current state is rendered
      const exitAnimationTimer = setTimeout(() => {
        if (bannerRef.current) {
          bannerRef.current.style.opacity = '0'
          bannerRef.current.style.transform = 'scale(1.1) translateX(20px) translateY(10px)'
        }
      }, 50)

      return () => clearTimeout(exitAnimationTimer)
    }
  }, [bannerState])

  // Reset exiting state when transitioning to entry
  useEffect(() => {
    if (bannerState === 'entry') {
      setIsExiting(false)
    }
  }, [bannerState])

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
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    opacity: 0,
    transition: 'opacity 2s ease-in-out, transform 2s ease-in-out',
    filter: 'none',
    transform: 'scale(1.1) translateX(-20px) translateY(-10px)',
    animation: 'bannerEntry 2s ease-out forwards'
  }

  const bannerImageActiveStyles = {
    ...bannerImageStyles,
     opacity: 0.85,
    transform: 'scale(1.05) translateX(0) translateY(0)',
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
    animation: 'bannerFloat 8s ease-in-out infinite'
  }

  const bannerImageExitStyles = {
    ...bannerImageStyles,
    opacity: 0,
    transform: 'scale(1.1) translateX(20px) translateY(10px)',
    transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
    animation: 'none'
  }

  // Get current banner styles based on state
  const getCurrentBannerStyles = () => {
    switch (bannerState) {
      case 'entry':
        return bannerImageStyles
      case 'active':
        return bannerImageActiveStyles
      case 'exit':
        // For exit, start from the current active position to prevent black flash
        if (isExiting) {
          return {
            ...bannerImageStyles,
            opacity: 0.85, // Start from current opacity
            transform: currentTransform, // Start from current transform
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            animation: 'none' // Stop the floating animation
          }
        }
        return bannerImageStyles
      default:
        return bannerImageStyles
    }
  }

  // Handle state transitions more smoothly
  const handleBannerStateChange = (newState) => {
    if (newState === 'exit' && bannerRef.current) {
      // When transitioning to exit, ensure we start from current position
      const currentTransform = bannerRef.current.style.transform
      // Apply current transform as starting point for exit animation
    }
    setBannerState(newState)
  }

  const bannerOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(10,10,10,0.4)',
    backdropFilter: 'none',
    zIndex: 2
  }

  const contentContainerStyles = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '800px',
    margin: '1rem',
    padding: isMobile? '1.5rem 1rem' : '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(145deg, rgba(10,10,10,0.1) 0%, rgba(26,26,26,0.08) 50%, rgba(10,10,10,0.12) 100%)',
    borderRadius: '24px',
    backdropFilter: 'blur(8px) saturate(120%)',
    border: '2px solid rgba(255,255,255,0.05)',
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
    width: isMobile? '160px' : '240px',
    height: isMobile? '160px' : '240px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.8)',
    background: 'transparent',
    padding: '2px',
    marginBottom: '2rem',
    objectFit: 'cover',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
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
    fontSize: 'clamp(1.8rem, 5vw, 4rem)',
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
    fontSize: 'clamp(1rem, 3vw, 1.6rem)',
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
    fontSize: 'clamp(0.9rem, 2.7vw, 1.4rem)',
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
    padding: isMobile? '0.6rem 0.7rem':'1rem 2rem',
    fontSize: 'clamp(0.9rem, 2.7vw, 1.4rem)',
    fontWeight: '600',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  }

  const secondaryButtonStyles = {
    ...primaryButtonStyles
  }

  return (
    <section style={heroStyles}>
      {/* Banner Carousel Background */}
      <div style={bannerContainerStyles}>
        <img
          ref={bannerRef}
          src={bannerImages[currentBannerIndex]}
          alt="Background banner"
          style={getCurrentBannerStyles()}
          key={currentBannerIndex} // Force re-render for transition
        />
        <div style={bannerOverlayStyles}></div>
      </div>

      {/* Main Content */}
      <div style={contentContainerStyles}>
        <div
          style={profileImageStyles}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)'
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
            About Me
          </button>
        </div>


      </div>
    </section>
  )
}

export default Hero