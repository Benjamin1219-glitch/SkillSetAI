import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  handleSignUp, 
  handleSignIn, 
  handleGoogleSignIn,
  validateEmail, 
  validatePassword,
  getPasswordErrors,
  isUserLoggedIn
} from '../services/authService'
import toast from 'react-hot-toast'
import ForgotPasswordModal from './ForgotPasswordModal'

const Modal = ({ closeModal, reduceMotion }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // Error states
  const [errors, setErrors] = useState({})
  
  // Redirect if already logged in
  useEffect(() => {
    if (isUserLoggedIn()) {
      // User is already logged in, close modal or redirect
      // For now, we'll just close the modal
      toast.success('You are already logged in!')
      closeModal()
    }
  }, [])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  }

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Toggle between sign in and sign up
  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setErrors({})
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Name validation (only for sign up)
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!isLogin && !validatePassword(formData.password)) {
      const passwordErrors = getPasswordErrors(formData.password)
      newErrors.password = passwordErrors.join(', ')
    }

    // Confirm password validation (only for sign up)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      let result

      if (isLogin) {
        // Sign in
        result = await handleSignIn(formData.email, formData.password)
      } else {
        // Sign up
        result = await handleSignUp(formData.name, formData.email, formData.password)
      }

      setIsLoading(false)

      if (result.success) {
        toast.success(isLogin ? 'Signed in successfully!' : 'Account created successfully!')
        
        // Close modal and redirect after 2 seconds
        setTimeout(() => {
          closeModal()
          // TODO: Redirect to dashboard
          // window.location.href = '/dashboard'
        }, 2000)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong. Please try again.')
    }
  }

  // Handle Google sign in
  const handleGoogleAuth = async () => {
    setIsLoading(true)
    
    const result = await handleGoogleSignIn()
    
    setIsLoading(false)

    if (result.success) {
      toast.success('Signed in with Google successfully!')
      
      setTimeout(() => {
        closeModal()
        // TODO: Redirect to dashboard
        // window.location.href = '/dashboard'
      }, 2000)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <>
      {showForgotPassword ? (
        <ForgotPasswordModal 
          closeModal={() => setShowForgotPassword(false)} 
          reduceMotion={reduceMotion} 
        />
      ) : (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop px-6"
        >
          <motion.div
            variants={reduceMotion ? {} : modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl relative"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-2xl text-white hover:text-gray-300 transition-colors"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="font-sora font-bold text-3xl text-white mb-2 text-center">
              {isLogin ? 'Welcome Back' : 'Join SkillSet AI'}
            </h2>
            <p className="font-inter text-sm text-gray-400 mb-8 text-center">
              {isLogin ? 'Sign in to continue your learning journey' : 'Start your personalized learning journey'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      errors.name ? 'border-red-500' : 'border-white/20'
                    } focus:border-white/40 focus:outline-none font-inter text-white placeholder-gray-500 transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 font-inter">{errors.name}</p>
                  )}
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } focus:border-white/40 focus:outline-none font-inter text-white placeholder-gray-500 transition-all`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400 font-inter">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } focus:border-white/40 focus:outline-none font-inter text-white placeholder-gray-500 transition-all`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400 font-inter">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                    } focus:border-white/40 focus:outline-none font-inter text-white placeholder-gray-500 transition-all`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400 font-inter">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Forgot Password Link (only for sign in) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-inter text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-inter font-bold text-black bg-white hover:bg-gray-100 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </motion.button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleAuthMode}
                className="font-inter text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-inter text-xs text-gray-400 text-center mb-4">Or continue with</p>
              <div className="flex gap-3 justify-center">
                <button 
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="px-6 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-inter text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button 
                  type="button"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-inter text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Modal
