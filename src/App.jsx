import React, { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Portfolio from './components/sections/Portfolio'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import ProjectModal from './components/modals/ProjectModal'
import ArticleModal from './components/modals/ArticleModal'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Blogs from './components/sections/Blogs'

function App() {
  const [activeTab, setActiveTab] = useState('hero')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)

  const appStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0a0a0a',
    color: '#ffffff'
  }

  const mainStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleArticleClick = (article) => {
    setSelectedArticle(article)
    setIsArticleModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsProjectModalOpen(false)
    setSelectedProject(null)
  }

  const closeArticleModal = () => {
    setIsArticleModalOpen(false)
    setSelectedArticle(null)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <Hero onNavigate={setActiveTab} />
      case 'about':
        return <About onArticleClick={handleArticleClick} />
      case 'portfolio':
        return <Portfolio onProjectClick={handleProjectClick} />
      case 'experience':
        return <Experience />
      case 'blogs':
        return <Blogs onArticleClick={handleArticleClick} />
      case 'contact':
        return <Contact />
      default:
        return <Hero onNavigate={setActiveTab} />
    }
  }

  return (
    <ErrorBoundary>
      <div style={appStyles}>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main style={mainStyles}>
          <ErrorBoundary>
            {renderContent()}
          </ErrorBoundary>
        </main>
        <Footer activeTab={activeTab} />
        
        <ErrorBoundary>
          <ProjectModal 
            project={selectedProject}
            isOpen={isProjectModalOpen}
            onClose={closeProjectModal}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ArticleModal 
            article={selectedArticle}
            isOpen={isArticleModalOpen}
            onClose={closeArticleModal}
          />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}

export default App