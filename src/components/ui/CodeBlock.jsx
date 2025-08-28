import React from 'react'
import "@fontsource/fira-mono"; // Defaults to weight 400


const codeBlockStyles = {
  background: 'linear-gradient(90deg, #232a3a 0%, #1a1f2b 100%)',
  border: '1px solid #4696e1',
  boxShadow: '0 4px 24px rgba(70,150,225,0.12), 0 1.5px 0 #4696e1 inset',
  borderRadius: '12px',
  padding: '1rem 1rem',
  overflow: 'auto',
  color: '#e6f1ff',
  margin: '2rem 0',
  whiteSpace: 'pre',
  position: 'relative',
}

const codeStyles={
  fontFamily: 'Fira Mono, Monaco, Menlo, Ubuntu Mono, monospace',
  fontSize: '0.9rem',
}

function CodeBlock({ children }) {
  return (
    <pre style={codeBlockStyles} className="code-block">
      <code style={codeStyles}>{children}</code>
    </pre>
  )
}

export default CodeBlock
