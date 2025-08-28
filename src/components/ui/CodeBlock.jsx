import React from 'react'
import "@fontsource/fira-mono"; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeBlockStyles = {
  background: 'linear-gradient(90deg, #232a3a 0%, #1a1f2b 100%)',
  border: '1px solid #4696e1',
  boxShadow: '0 4px 24px rgba(70,150,225,0.12), 0 1.5px 0 #4696e1 inset',
  borderRadius: '12px',
  margin: '2rem 0',
  position: 'relative',
  overflow: 'hidden',
}

const codeStyles = {
  fontFamily: 'Fira Mono, Monaco, Menlo, Ubuntu Mono, monospace',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  padding: '1rem',
  margin: 0,
}

function CodeBlock({ children }) {
  // Always highlight as C++
  const language = "cpp"

  return (
    <div style={codeBlockStyles} className="code-block">
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={codeStyles}
        wrapLongLines={true}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
