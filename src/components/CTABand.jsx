import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import BlurText from './BlurText'

const CTABand = ({ openModal }) => {
  const { colors, isDark } = useTheme()
  
  return (
    <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Aurora Glow Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Glass Overlay Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden transition-all duration-500"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`
          }}
        >
          {/* Heading */}
          <BlurText
            text="READY TO MAKE EVERY RESOURCE ACCESSIBLE?"
            delay={80}
            animateBy="words"
            direction="top"
            as="h2"
            className="font-sora font-extrabold text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight uppercase tracking-wide transition-colors duration-500"
            style={{ color: colors.text }}
          />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="px-10 py-4 rounded-full font-inter font-bold text-black bg-white shadow-lg transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-magenta opacity-0 group-hover:opacity-20 transition-opacity"
              />
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-inter font-bold border-2 transition-all relative overflow-hidden group"
              style={{
                color: colors.text,
                background: 'transparent',
                borderImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5)) 1'
              }}
            >
              <span className="relative z-10">Request Demo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTABand
