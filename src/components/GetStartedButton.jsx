import { motion } from 'framer-motion'

const GetStartedButton = ({ onClick, reduceMotion, isHero = false }) => {
  if (isHero) {
    // Hero button - centered under title
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={reduceMotion ? {} : { 
          scale: 1.05,
          boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="px-10 py-3 rounded-full font-inter font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg"
      >
        Get Started
      </motion.button>
    )
  }

  // Original fixed button (hidden now since we have hero button)
  return null
}

export default GetStartedButton
