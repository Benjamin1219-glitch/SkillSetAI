import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useAccessibility } from '../context/AccessibilityContext'

const Footer = ({ setReduceMotion, reduceMotion }) => {
  const { colors, isDark } = useTheme()
  const { 
    highContrast, 
    dyslexiaFont, 
    reduceMotion: reduceMotionAccessibility,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleReduceMotion: toggleReduceMotionAccessibility
  } = useAccessibility()
  
  // Sync with parent component's reduceMotion if it exists
  const handleReduceMotionToggle = () => {
    toggleReduceMotionAccessibility()
    if (setReduceMotion) {
      setReduceMotion(!reduceMotionAccessibility)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e, toggleFunction) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleFunction()
    }
  }

  return (
    <footer 
      className="relative border-t mt-24 transition-all duration-500" 
      id="contact" 
      style={{ 
        background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.5)', 
        backdropFilter: 'blur(20px)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-sora font-bold text-xl transition-colors duration-500" style={{ color: colors.text }}>
                SkillSet AI
              </h3>
            </div>
            <p className="font-inter text-sm leading-relaxed transition-colors duration-500" style={{ color: colors.textSecondary }}>
              Making knowledge accessible for everyone through AI-powered simplification and adaptive learning.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-sora font-semibold mb-6 transition-colors duration-500" style={{ color: colors.text }}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="font-inter text-sm transition-colors flex items-center gap-2 group" style={{ color: colors.textSecondary }}>
                  <span 
                    className="w-1 h-1 rounded-full transition-colors" 
                    style={{ background: colors.textSecondary }}
                  ></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="font-inter text-sm transition-colors flex items-center gap-2 group" style={{ color: colors.textSecondary }}>
                  <span 
                    className="w-1 h-1 rounded-full transition-colors" 
                    style={{ background: colors.textSecondary }}
                  ></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#accessibility" className="font-inter text-sm transition-colors flex items-center gap-2 group" style={{ color: colors.textSecondary }}>
                  <span 
                    className="w-1 h-1 rounded-full transition-colors" 
                    style={{ background: colors.textSecondary }}
                  ></span>
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#contact" className="font-inter text-sm transition-colors flex items-center gap-2 group" style={{ color: colors.textSecondary }}>
                  <span 
                    className="w-1 h-1 rounded-full transition-colors" 
                    style={{ background: colors.textSecondary }}
                  ></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Accessibility Toggles */}
          <div>
            <h4 className="font-sora font-semibold mb-6 transition-colors duration-500" style={{ color: colors.text }}>Accessibility</h4>
            <div className="space-y-4">
              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>High Contrast</span>
                <button 
                  onClick={toggleHighContrast}
                  onKeyDown={(e) => handleKeyDown(e, toggleHighContrast)}
                  className="accessibility-toggle relative w-12 h-6 rounded-full transition-all"
                  style={{ 
                    background: highContrast 
                      ? 'rgba(6, 182, 212, 0.3)' 
                      : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'), 
                    border: `1px solid ${highContrast ? '#06b6d4' : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')}`
                  }}
                  aria-label={`High contrast mode ${highContrast ? 'enabled' : 'disabled'}`}
                  aria-pressed={highContrast}
                  role="switch"
                  tabIndex={0}
                >
                  <span 
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300"
                    style={{ 
                      background: colors.text,
                      transform: highContrast ? 'translateX(1.5rem)' : 'translateX(0)'
                    }}
                  ></span>
                </button>
              </div>

              {/* Dyslexia Font Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>Dyslexia Font</span>
                <button 
                  onClick={toggleDyslexiaFont}
                  onKeyDown={(e) => handleKeyDown(e, toggleDyslexiaFont)}
                  className="accessibility-toggle relative w-12 h-6 rounded-full transition-all"
                  style={{ 
                    background: dyslexiaFont 
                      ? 'rgba(6, 182, 212, 0.3)' 
                      : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'), 
                    border: `1px solid ${dyslexiaFont ? '#06b6d4' : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')}`
                  }}
                  aria-label={`Dyslexia-friendly font ${dyslexiaFont ? 'enabled' : 'disabled'}`}
                  aria-pressed={dyslexiaFont}
                  role="switch"
                  tabIndex={0}
                >
                  <span 
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300"
                    style={{ 
                      background: colors.text,
                      transform: dyslexiaFont ? 'translateX(1.5rem)' : 'translateX(0)'
                    }}
                  ></span>
                </button>
              </div>

              {/* Reduce Motion Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>Reduce Motion</span>
                <button 
                  onClick={handleReduceMotionToggle}
                  onKeyDown={(e) => handleKeyDown(e, handleReduceMotionToggle)}
                  className="accessibility-toggle relative w-12 h-6 rounded-full border transition-all"
                  style={{
                    background: reduceMotionAccessibility 
                      ? 'rgba(6, 182, 212, 0.3)' 
                      : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
                    borderColor: reduceMotionAccessibility 
                      ? '#06b6d4' 
                      : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                  }}
                  aria-label={`Reduce motion ${reduceMotionAccessibility ? 'enabled' : 'disabled'}`}
                  aria-pressed={reduceMotionAccessibility}
                  role="switch"
                  tabIndex={0}
                >
                  <span 
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300"
                    style={{ 
                      background: colors.text,
                      transform: reduceMotionAccessibility ? 'translateX(1.5rem)' : 'translateX(0)'
                    }}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)' }}
        >
          <p className="font-inter text-sm text-center md:text-left transition-colors duration-500" style={{ color: colors.textSecondary }}>
            © SkillSet AI 2025 — All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ 
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)', 
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                color: colors.textSecondary
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ 
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)', 
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                color: colors.textSecondary
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ 
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)', 
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                color: colors.textSecondary
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
