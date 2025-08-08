import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const errorStyles = {
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 107, 107, 0.3)',
        margin: '2rem auto',
        maxWidth: '500px'
      }

      const titleStyles = {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#ff6b6b',
        fontWeight: '600'
      }

      const messageStyles = {
        marginBottom: '1.5rem',
        color: '#aaaaaa',
        lineHeight: '1.6'
      }

      const buttonStyles = {
        backgroundColor: '#4a9eff',
        color: '#ffffff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600'
      }

      return (
        <div style={errorStyles}>
          <h2 style={titleStyles}>Something went wrong</h2>
          <p style={messageStyles}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button 
            style={buttonStyles}
            onClick={() => window.location.reload()}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3a8eef'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4a9eff'
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary