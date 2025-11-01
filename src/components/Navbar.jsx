import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme, colors } = useTheme()

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex justify-center pt-6 px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-4xl"
      >
        <div 
          className="backdrop-blur-2xl rounded-full px-8 py-4 flex items-center justify-between shadow-xl transition-colors duration-500"
          style={{
            background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.6)',
            borderColor: isDark ? colors.glassBorder : 'rgba(0, 0, 0, 0.15)',
            border: '1px solid',
            boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Logo */}
          <div className="font-sora font-bold text-lg flex items-center gap-2" style={{ color: colors.text }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SkillSet AI
          </div>

          {/* Nav Links + Theme Toggle */}
          <div className="flex items-center gap-8">
            <a
              href="#home"
              className="font-inter text-sm font-medium transition-colors"
              style={{ color: colors.text }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Home
            </a>
            <a
              href="#docs"
              className="font-inter text-sm font-medium transition-colors"
              style={{ color: colors.text }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Docs
            </a>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`
              }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                // Sun icon for light mode
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" stroke={colors.text} strokeWidth="2"/>
                  <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.49 3.51L19.07 4.93M4.93 19.07L3.51 20.49M20.49 20.49L19.07 19.07M4.93 4.93L3.51 3.51" stroke={colors.text} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar
