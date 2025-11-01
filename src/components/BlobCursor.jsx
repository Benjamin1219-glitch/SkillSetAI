import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const BlobCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor blob */}
      <motion.div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          background: 'radial-gradient(circle, rgba(6,182,212,0.6), rgba(168,85,247,0.6))',
          filter: 'blur(8px)',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-50 bg-white"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: 16,
          y: 16,
        }}
      />
    </>
  )
}

export default BlobCursor
