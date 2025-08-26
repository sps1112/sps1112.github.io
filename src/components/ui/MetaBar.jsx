import React from 'react'

function MetaBar({ date, readTime, tag }) {
  const containerStyles = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0.5rem 0 1rem 0'
  }

  const metaItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#ccc',
    fontSize: '0.9rem'
  }

  const tagBadgeStyles = {
    backgroundColor: 'rgba(70, 150, 225, 0.2)',
    color: '#4696e1',
    padding: '0.25rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(70, 150, 225, 0.3)'
  }

  const parts = []
  if (date) parts.push(<div key="date" style={metaItemStyles}><span>📅</span><span>{date}</span></div>)
  if (readTime) parts.push(<div key="time" style={metaItemStyles}><span>⏱️</span><span>{readTime}</span></div>)
  if (tag) parts.push(<div key="tag" style={tagBadgeStyles}>{tag}</div>)

  return (
    <div style={containerStyles}>
      {parts.map((node, idx) => (
        <span key={`meta-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          {idx > 0 && <span key={`sep-${idx}`}>•</span>}
          {node}
        </span>
      ))}
    </div>
  )
}

export default MetaBar


