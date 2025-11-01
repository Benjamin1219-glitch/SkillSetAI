import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import BlurText from './BlurText'

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Graduate Student",
    quote: "SkillSet AI transformed my research papers into digestible summaries. I can finally keep up with my reading list!",
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "High School Teacher",
    quote: "My students with dyslexia can now access the same materials as everyone else. This is truly inclusive education.",
    avatar: "MJ"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Accessibility Researcher",
    quote: "The accuracy is impressive. It simplifies without losing the essential meaning—exactly what we need.",
    avatar: "ER"
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Software Engineer",
    quote: "I use it for technical documentation. It makes complex concepts clear without dumbing them down.",
    avatar: "AT"
  }
]

const TestimonialsCarousel = ({ reduceMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { colors, isDark } = useTheme()

  useEffect(() => {
    if (reduceMotion) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [reduceMotion])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)'
    })
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = testimonials.length - 1
      if (next >= testimonials.length) next = 0
      return next
    })
  }

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <BlurText
          text="LOVED BY LEARNERS"
          delay={100}
          animateBy="words"
          direction="top"
          as="h2"
          className="font-sora font-extrabold text-4xl md:text-5xl lg:text-6xl text-center mb-4 uppercase tracking-wide transition-colors duration-500"
          style={{ color: colors.text }}
        />

        <BlurText
          text="See what our community has to say about transforming their learning experience"
          delay={80}
          animateBy="words"
          direction="top"
          as="p"
          className="text-center mb-16 max-w-2xl mx-auto transition-colors duration-500"
          style={{ color: colors.textSecondary }}
        />

        {/* Carousel */}
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                filter: { duration: 0.3 }
              }}
              className="absolute w-full max-w-3xl"
            >
              <div
                className="rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`
                }}
              >
                {/* Quote */}
                <p className="text-lg md:text-xl leading-relaxed mb-8 italic transition-colors duration-500" style={{ color: colors.text }}>
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-cyan to-accent-magenta flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                  
                  {/* Info */}
                  <div>
                    <div className="font-semibold text-lg transition-colors duration-500" style={{ color: colors.text }}>
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm transition-colors duration-500" style={{ color: colors.textSecondary }}>
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
            style={{ 
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)', 
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'}`,
              color: colors.text
            }}
          >
            ←
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
            style={{ 
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)', 
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'}`,
              color: colors.text
            }}
          >
            →
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className="h-2 rounded-full transition-all"
              style={{ 
                background: index === currentIndex 
                  ? colors.text 
                  : (isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'),
                width: index === currentIndex ? '32px' : '8px'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
