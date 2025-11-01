import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import BlurText from './BlurText'

const InteractiveStrip = ({ reduceMotion }) => {
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 30 }
  const xSpring = useSpring(x, springConfig)
  const { colors, isDark } = useTheme()
  
  const [readingTimeSaved, setReadingTimeSaved] = useState(45)
  const [accessibilityScore, setAccessibilityScore] = useState(92)

  // Transform x position to percentage (0 to 100)
  const percentage = useTransform(xSpring, [0, 300], [0, 100])

  useEffect(() => {
    return percentage.onChange(latest => {
      setReadingTimeSaved(Math.round(45 + (latest / 100) * 20))
      setAccessibilityScore(Math.round(75 + (latest / 100) * 25))
    })
  }, [percentage])

  const originalText = "The implementation of advanced machine learning algorithms in natural language processing has revolutionized the way we interact with technology, enabling more sophisticated understanding of human communication patterns."

  const simplifiedText = "AI helps computers understand how people talk, making technology easier to use."

  return (
    <section className="relative py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <BlurText
          text="SEE THE DIFFERENCE"
          delay={100}
          animateBy="words"
          direction="top"
          as="h2"
          className="font-sora font-extrabold text-4xl md:text-5xl text-center mb-4 uppercase tracking-wide transition-colors duration-500"
          style={{ color: colors.text }}
        />
        
        <BlurText
          text="Drag the slider to compare original text with our AI-simplified version"
          delay={80}
          animateBy="words"
          direction="top"
          as="p"
          className="text-center mb-12 max-w-2xl mx-auto transition-colors duration-500"
          style={{ color: colors.textSecondary }}
        />

        {/* Interactive Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
          style={{ 
            background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)', 
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`
          }}
        >
          <div ref={constraintsRef} className="relative h-64 md:h-80">
            {/* Original Text Side - Clipped from the right as slider moves right */}
            <motion.div 
              style={{ 
                clipPath: useTransform(percentage, (p) => `inset(0 0 0 ${p}%)`)
              }}
              className="absolute inset-0 p-8 flex items-center justify-center"
            >
              <div className="text-center max-w-md">
                <span className="text-xs font-semibold text-red-400 mb-4 uppercase tracking-wider block">ORIGINAL</span>
                <p className="text-sm md:text-base leading-relaxed transition-colors duration-500" style={{ color: colors.textSecondary, opacity: 0.8 }}>{originalText}</p>
              </div>
            </motion.div>

            {/* Simplified Text Side - Revealed from the left as slider moves right */}
            <motion.div
              style={{ 
                clipPath: useTransform(percentage, (p) => `inset(0 ${100 - p}% 0 0)`),
                background: isDark ? 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05))' : 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.02))'
              }}
              className="absolute inset-0 p-8 flex items-center justify-center transition-all duration-500"
            >
              <div className="text-center max-w-md">
                <span className="text-xs font-semibold text-green-400 mb-4 uppercase tracking-wider block">SIMPLIFIED</span>
                <p className="text-sm md:text-base leading-relaxed font-medium transition-colors duration-500" style={{ color: colors.text }}>{simplifiedText}</p>
              </div>
            </motion.div>

            {/* Draggable Handle */}
            <motion.div
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              style={{ x: xSpring }}
              className="absolute top-0 bottom-0 cursor-ew-resize z-10"
              initial={{ left: '50%' }}
            >
              {/* Vertical Line */}
              <div className="absolute inset-0 w-1 bg-white/60 backdrop-blur-sm shadow-lg" />
              
              {/* Handle Circle */}
              <motion.div
                animate={{ scale: isDragging ? 1.2 : 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L3 10L7 16M13 4L17 10L13 16" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {/* Reading Time Saved */}
          <div 
            className="rounded-2xl p-6 text-center transition-all duration-500" 
            style={{ 
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)', 
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              key={readingTimeSaved}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold mb-2 transition-colors duration-500"
              style={{ color: colors.text }}
            >
              {readingTimeSaved}%
            </motion.div>
            <div className="text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>Reading Time Saved</div>
          </div>

          {/* Accessibility Score */}
          <div 
            className="rounded-2xl p-6 text-center transition-all duration-500" 
            style={{ 
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)', 
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              key={accessibilityScore}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-green-400 mb-2"
            >
              {accessibilityScore}
            </motion.div>
            <div className="text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>Accessibility Score</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveStrip
