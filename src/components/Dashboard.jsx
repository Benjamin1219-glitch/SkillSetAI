import { useEffect, useState } from 'react';
import { getCurrentUser, handleSignOut } from '../services/authService';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
    } else {
      // Redirect to home if not logged in
      window.location.href = '/';
    }
  }, []);

  const handleLogout = async () => {
    const result = await handleSignOut();
    if (result.success) {
      toast.success('Logged out successfully!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      toast.error(result.error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-sora font-bold text-2xl">SkillSet AI</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-inter text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sora font-bold text-4xl mb-4">
            Welcome, {user.displayName || 'User'}!
          </h2>
          <p className="text-gray-400 mb-8">
            Email: {user.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard cards placeholder */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-sora font-bold text-xl mb-2">Learning Progress</h3>
              <p className="text-gray-400 text-sm">Track your learning journey</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-sora font-bold text-xl mb-2">Recent Documents</h3>
              <p className="text-gray-400 text-sm">Access your simplified documents</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-sora font-bold text-xl mb-2">Settings</h3>
              <p className="text-gray-400 text-sm">Customize your experience</p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-accent-cyan/10 to-accent-magenta/10 border border-white/10">
            <h3 className="font-sora font-bold text-2xl mb-4">🎉 Dashboard Coming Soon</h3>
            <p className="text-gray-300">
              Your personalized learning dashboard is under development. 
              Soon you'll be able to upload documents, track progress, and access all your simplified content.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
