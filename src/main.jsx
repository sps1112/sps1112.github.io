import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { siteConfig } from './data/config'

// Apply professional typography-focused global styles
document.body.style.cssText = `
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #0a0a0a;
  color: #ffffff;
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: -0.01em;
  text-rendering: optimizeLegibility;
`;

// Simple global styles
const globalStyle = document.createElement('style');
const mobileMax = (siteConfig && siteConfig.breakpoints && siteConfig.breakpoints.mobileMax) || 700
const tabletMax = (siteConfig && siteConfig.breakpoints && siteConfig.breakpoints.tabletMax) || 1150
globalStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Professional Typography System */
  h1, h2, h3, h4, h5, h6 {
    font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin: 0;
  }
  
  h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; }
  h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; }
  h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 600; }
  h4 { font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 500; }
  
  p, body {
    font-family: "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: -0.005em;
    font-feature-settings: "kern" 1, "liga" 1;
  }
  
  /* Button Typography */
  button {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  
  /* Link Typography */
  a {
    font-family: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  

  
  @keyframes bannerEntry {
    0% {
      opacity: 0;
      transform: scale(1.1) translateX(-20px) translateY(-10px);
    }
    100% {
      opacity: 0.85;
      transform: scale(1.05) translateX(0) translateY(0);
    }
  }
  
  @keyframes bannerFloat {
    0%, 100% {
      transform: scale(1.05) translateX(0) translateY(0);
    }
    50% {
      transform: scale(1.08) translateX(5px) translateY(-3px);
    }
  }
  


  /* Global responsive nav synced with siteConfig breakpoints */
  .mobile-nav { display: none; }

  @media (max-width: ${mobileMax}px) {
    .desktop-nav {
      display: none !important;
    }
    .mobile-nav {
      display: flex !important;
    }
    /* About mobile order */
    .about-grid { grid-template-columns: 1fr !important; }
    .about-photo { order: 1; }
    .about-name { order: 2; }
    .about-intro { order: 3; }
    .about-status { order: 4; }
    .about-skills { order: 5; }
    .about-hobbies { order: 6; }
    .about-quote { order: 7; grid-column: auto !important; }
  }

  @media (min-width: ${mobileMax + 1}px) {
    .mobile-nav {
      display: none !important;
    }
  }
`;
document.head.appendChild(globalStyle);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)