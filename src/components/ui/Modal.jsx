import React, { useEffect, useState } from 'react'
import { useViewport } from '../../hooks/useViewport'

function Modal({ isOpen, onClose, children, maxWidth = '1250px' }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useViewport();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
      setIsHovered(false); // <-- reset hover when modal unmounts / closes
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(36, 36, 36, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: isMobile? '0rem' : '2rem',
    backdropFilter: 'blur(16px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.2)'
  };

  const modalStyles = {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: isMobile?'0px':'12px',
    maxWidth: maxWidth,
    width: '100%',
    maxHeight: 'auto',
    overflow: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-out',
    margin: isMobile? '0rem' : '1rem',
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '0.5rem',
    left: '0.4rem',
    background: isHovered ? '#4696e1' : 'rgba(36, 36, 36, 0.55)',
    borderRadius: '50%',
    width: '39px',
    height: '39px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: isHovered ? '#fff' : '#4696e1',
    fontSize: '1.35rem',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(70,150,225,0.10)',
    border: isHovered ? '1.5px solid #4696e1' : '1.5px solid #2a3444',
    transition: 'all 0.2s cubic-bezier(.4,2,.3,1)',
    zIndex: 10001
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4.5" y1="4.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="13.5" y1="4.5" x2="4.5" y2="13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
