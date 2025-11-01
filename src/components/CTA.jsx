import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const CTA = ({ openModal }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-sora font-bold text-4xl md:text-6xl text-white mb-12 leading-tight"
        >
          Unlock Your Potential with SkillSet AI
        </motion.h2>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="px-8 py-4 rounded-full font-inter font-bold text-black bg-white hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Now
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-inter font-bold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
