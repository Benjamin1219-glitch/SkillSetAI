import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

const FloatingCTA = ({ openModal }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        opacity: { duration: 0.3 }
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.button
        whileHover={{ 
          scale: 1.1, 
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)' 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
        className="px-10 py-4 rounded-full font-inter font-bold text-black bg-white shadow-2xl hover:bg-gray-100 transition-all backdrop-blur-xl"
        style={{
          boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2)'
        }}
      >
        Get Started
      </motion.button>
    </motion.div>
  )
}

export default FloatingCTA
