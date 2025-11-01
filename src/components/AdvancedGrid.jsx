import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import BounceCards from './BounceCards'

const gridItems = [
  { 
    title: 'AI Skill Assessment', 
    icon: '●',
    description: 'Get personalized AI-powered skill evaluations'
  },
  { 
    title: 'Roadmap Generator', 
    icon: '◆',
    description: 'Create custom learning paths tailored to your goals'
  },
  { 
    title: 'Progress Analytics', 
    icon: '■',
    description: 'Track your improvement with detailed insights'
  },
  { 
    title: 'Smart Recommendations', 
    icon: '★',
    description: 'Discover resources that match your learning style'
  },
  { 
    title: 'Skill Gap Detection', 
    icon: '◉',
    description: 'Identify areas where you need to improve'
  }
]

const transformStyles = [
  "rotate(5deg) translate(-260px)",
  "rotate(2deg) translate(-130px)",
  "rotate(-3deg)",
  "rotate(3deg) translate(130px)",
  "rotate(-4deg) translate(260px)"
]

const AdvancedGrid = ({ reduceMotion }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { colors } = useTheme()

  return (
    <section ref={ref} className="relative py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sora font-extrabold text-4xl md:text-5xl lg:text-6xl text-center mb-16 uppercase tracking-wide transition-colors duration-500"
          style={{ color: colors.text }}
        >
          Powerful Features
        </motion.h2>

        {/* BounceCards Animation */}
        <div className="flex justify-center mb-12">
          <BounceCards
            className="custom-bounceCards"
            items={gridItems}
            containerWidth={1400}
            containerHeight={300}
            animationDelay={0.6}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </div>
      </div>
    </section>
  )
}

export default AdvancedGrid
