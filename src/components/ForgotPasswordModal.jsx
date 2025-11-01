import { motion } from 'framer-motion';
import { useState } from 'react';
import { handlePasswordReset, validateEmail } from '../services/authService';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ closeModal, reduceMotion }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const result = await handlePasswordReset(email);

    setIsLoading(false);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      toast.error(result.error);
    }
  };

  return (
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
          Reset Password
        </h2>
        <p className="font-inter text-sm text-gray-400 mb-8 text-center">
          Enter your email address and we'll send you a password reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.email ? 'border-red-500' : 'border-white/20'
              } focus:border-white/40 focus:outline-none font-inter text-white placeholder-gray-500 transition-all`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 font-inter">{errors.email}</p>
            )}
          </div>

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
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </motion.button>
        </form>

        {/* Back to Sign In */}
        <div className="mt-6 text-center">
          <button
            onClick={closeModal}
            className="font-inter text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordModal;
