import React, { useEffect } from 'react'

function Modal({ isOpen, onClose, children, maxWidth = '800px' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  }

  const modalStyles = {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    maxWidth: maxWidth,
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-out',
    margin: '1rem'
  }

  const closeButtonStyles = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    zIndex: 10001
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      style={overlayStyles} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div style={modalStyles}>
        <button
          style={closeButtonStyles}
          onClick={onClose}
          aria-label="Close modal"
          title="Close modal (Esc)"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal