import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import BlurText from './BlurText'

const features = [
  {
    title: 'Analyze',
    description: 'Evaluate your current skill set using AI insights and comprehensive assessments.',
    icon: '◉'
  },
  {
    title: 'Learn',
    description: 'Get curated resources and personalized learning paths tailored to your goals.',
    icon: '◆'
  },
  {
    title: 'Grow',
    description: 'Track performance, measure progress, and reach your career goals faster.',
    icon: '▲'
  }
]

const Features = ({ reduceMotion }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { colors, isDark } = useTheme()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section ref={ref} className="relative py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <BlurText
            text="WHY SKILLSET AI"
            delay={100}
            animateBy="words"
            direction="top"
            as="h2"
            className="font-sora font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 uppercase tracking-wide transition-colors duration-500"
            style={{ color: colors.text }}
          />
          <div className="w-24 h-1 mx-auto rounded-full transition-colors duration-500" style={{ background: colors.text }} />
        </div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={reduceMotion ? {} : { 
                y: -8, 
                scale: 1.02
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-2xl p-8 shadow-lg transition-all duration-500"
              style={{ 
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)', 
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
                border: '1px solid',
                boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 transition-colors duration-500" style={{ color: colors.text }}>{feature.icon}</div>
              
              {/* Title */}
              <h3 className="font-sora font-bold text-2xl mb-3 transition-colors duration-500" style={{ color: colors.text }}>
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="font-inter leading-relaxed transition-colors duration-500" style={{ color: colors.textSecondary }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
