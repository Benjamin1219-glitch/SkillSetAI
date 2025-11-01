import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillReport from './components/SkillReport'
import Features from './components/Features'
import AdvancedGrid from './components/AdvancedGrid'
import InteractiveStrip from './components/InteractiveStrip'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import CTABand from './components/CTABand'
import Footer from './components/Footer'
import Modal from './components/Modal'
import DitherBackground from './components/DitherBackground'
import Iridescence from './components/Iridescence'
import ToastProvider from './components/ToastProvider'
import './styles/accessibility.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handleChange = () => setReduceMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <ToastProvider />
        <AppContent 
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          reduceMotion={reduceMotion}
          setReduceMotion={setReduceMotion}
        />
      </AccessibilityProvider>
    </ThemeProvider>
  )
}

function AppContent({ isModalOpen, openModal, closeModal, reduceMotion, setReduceMotion }) {
  const { isDark } = useTheme();
  
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background - Conditional based on theme */}
      {isDark ? (
        <DitherBackground />
      ) : (
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={true}
            amplitude={0.1}
            speed={1.0}
          />
          {/* Black shade overlay for better text contrast */}
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-none" />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero openModal={openModal} reduceMotion={reduceMotion} />
        <SkillReport reduceMotion={reduceMotion} />
        <Features reduceMotion={reduceMotion} />
        <AdvancedGrid reduceMotion={reduceMotion} />
        <InteractiveStrip reduceMotion={reduceMotion} />
        <TestimonialsCarousel reduceMotion={reduceMotion} />
        <CTABand openModal={openModal} />
        <Footer setReduceMotion={setReduceMotion} reduceMotion={reduceMotion} />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && <Modal closeModal={closeModal} reduceMotion={reduceMotion} />}
      </AnimatePresence>
    </div>
  )
}

export default App
