import { motion } from 'framer-motion'
import GetStartedButton from './GetStartedButton'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import BlurText from './BlurText'
import DecryptedText from './DecryptedText'

const Hero = ({ openModal, reduceMotion }) => {
  const [isSticky, setIsSticky] = useState(false)
  const { colors, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-24">
      <div className="max-w-7xl mx-auto w-full text-center">
        {/* Main Title */}
        <h1 
          className="font-sora font-extrabold leading-tight uppercase transition-colors duration-500"
          style={{ 
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            ...(isDark 
              ? { color: colors.text }
              : {
                  background: 'linear-gradient(90deg, #000000, #ffffff, #cccccc, #0000ff, #000000)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'rgbGradient 3s linear infinite'
                }
            )
          }}
        >
          <DecryptedText
            text="SKILLSET AI"
            speed={200}
            maxIterations={20}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            loopInterval={8000}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
          />
        </h1>

        <BlurText
          text="Unlock your potential with personalized learning."
          delay={80}
          animateBy="words"
          direction="top"
          as="h2"
          className="font-sora text-lg md:text-xl mt-6 transition-colors duration-500"
          style={{ color: colors.text, opacity: 0.9 }}
        />

        {/* Subtitle */}
        <BlurText
          text="Discover your strengths, close your skill gaps, and grow with AI-driven recommendations tailored for your career path."
          delay={50}
          animateBy="words"
          direction="top"
          as="p"
          className="font-inter text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4 transition-colors duration-500"
          style={{ color: colors.textSecondary }}
        />

        {/* Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 relative"
        >
          {/* Primary Button - Smoothly transitions to sticky */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            animate={isSticky ? {
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              x: '-50%',
              y: [0, -10, 0],
            } : {
              position: 'static',
              x: 0,
              y: 0,
            }}
            transition={isSticky ? {
              position: { type: 'tween', duration: 0.3 },
              bottom: { type: 'tween', duration: 0.3 },
              left: { type: 'tween', duration: 0.3 },
              x: { type: 'tween', duration: 0.3 },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            } : {
              duration: 0.3
            }}
            style={{
              zIndex: isSticky ? 50 : 'auto',
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
              boxShadow: isSticky ? `0 10px 40px ${colors.shadow}` : undefined
            }}
            className="px-8 py-4 rounded-full font-inter font-bold shadow-lg transition-all duration-500"
          >
            Get Started
          </motion.button>

          {/* Secondary Button - Fades out */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: isSticky ? 0 : 1,
              pointerEvents: isSticky ? 'none' : 'auto'
            }}
            transition={{ duration: 0.3 }}
            style={{
              color: colors.text,
              borderColor: colors.cardBorder
            }}
            className="px-8 py-4 rounded-full font-inter font-bold bg-transparent border-2 transition-all duration-500 hover:opacity-80"
          >
            See Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
