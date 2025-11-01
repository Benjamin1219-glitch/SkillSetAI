import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import BlurText from './BlurText';

const SkillReport = ({ reduceMotion }) => {
  const { colors, isDark } = useTheme();
  
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <BlurText
            text="TRACK YOUR PROGRESS"
            delay={100}
            animateBy="words"
            direction="top"
            as="h2"
            className="font-sora text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide transition-colors duration-500"
            style={{ color: colors.text }}
          />
          <BlurText
            text="Get real-time insights into your skill development with AI-powered analytics that help you understand your strengths and identify areas for improvement."
            delay={50}
            animateBy="words"
            direction="top"
            as="p"
            className="font-inter text-lg md:text-xl max-w-3xl mx-auto transition-colors duration-500"
            style={{ color: colors.textSecondary }}
          />
        </div>

        {/* Skill Report Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Floating Glass Card */}
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500"
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`,
              boxShadow: isDark ? '0 20px 60px rgba(0, 0, 0, 0.3)' : '0 20px 60px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Card Header */}
            <div className="mb-8">
              <h3 className="font-sora font-bold text-2xl md:text-3xl mb-2 transition-colors duration-500" style={{ color: colors.text }}>Your Skill Report</h3>
              <p className="text-base transition-colors duration-500" style={{ color: colors.textSecondary }}>AI-powered insights</p>
            </div>

            {/* Progress Rings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              {[
                { label: 'React', value: 85 },
                { label: 'Node.js', value: 72 },
                { label: 'Python', value: 68 }
              ].map((skill, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-3">
                    <svg className="transform -rotate-90 w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke={colors.text}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * (window.innerWidth < 768 ? 48 : 56)}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * (window.innerWidth < 768 ? 48 : 56) }}
                        whileInView={{ strokeDashoffset: 2 * Math.PI * (window.innerWidth < 768 ? 48 : 56) * (1 - skill.value / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + index * 0.2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl md:text-2xl transition-colors duration-500" style={{ color: colors.text }}>
                      {skill.value}%
                    </div>
                  </div>
                  <p className="text-sm md:text-base font-medium transition-colors duration-500" style={{ color: colors.textSecondary }}>{skill.label}</p>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base md:text-lg transition-colors duration-500" style={{ color: colors.textSecondary }}>Overall Progress</span>
                <span className="font-semibold text-xl md:text-2xl transition-colors duration-500" style={{ color: colors.text }}>75%</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden transition-colors duration-500" style={{ background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                <motion.div
                  className="h-full rounded-full transition-colors duration-500"
                  style={{ background: colors.text }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 rounded-3xl blur-3xl -z-10 transition-colors duration-500" style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }} />
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        >
          {[
            { icon: '▶', text: 'AI skill analysis' },
            { icon: '◆', text: 'Personalized learning roadmap' },
            { icon: '■', text: 'Career progress tracking' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl transition-all duration-500"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`
              }}
            >
              <span className="text-2xl transition-colors duration-500" style={{ color: colors.text }}>{feature.icon}</span>
              <span className="font-inter transition-colors duration-500" style={{ color: colors.textSecondary }}>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillReport;
