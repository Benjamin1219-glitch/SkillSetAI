import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const TransformSection = ({ reduceMotion }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative px-6 lg:px-12" style={{ marginTop: '80px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-inter font-bold text-center text-white"
          style={{ 
            fontSize: 'clamp(28px, 4vw, 36px)',
          }}
        >
          Transform Your Learning Journey
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="font-inter text-center text-gray-400 mx-auto"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '16px auto 0 auto'
          }}
        >
          SkillSet AI reimagines how you access and understand knowledge. Upload any material—PDFs, videos, or slides—and watch it transform into an adaptive, accessible format that fits your learning style.
        </motion.p>
      </div>
    </section>
  )
}

export default TransformSection
