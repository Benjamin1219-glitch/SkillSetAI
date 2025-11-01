import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const LovedSection = ({ reduceMotion }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative px-6 lg:px-12" style={{ marginTop: '100px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.7, 
            delay: 0.1,
            ease: 'easeOut',
            type: reduceMotion ? 'tween' : 'spring',
            bounce: reduceMotion ? 0 : 0.3
          }}
          className="font-inter font-bold text-center text-white"
          style={{ 
            fontSize: 'clamp(28px, 4vw, 36px)',
          }}
        >
          Loved by Learners.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="font-inter text-center text-gray-400 mx-auto"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '16px auto 0 auto'
          }}
        >
          Students, educators, and researchers trust SkillSet AI to make their materials clearer, simpler, and more engaging—without losing accuracy. It's accessibility, intelligence, and design working together.
        </motion.p>
      </div>
    </section>
  )
}

export default LovedSection
