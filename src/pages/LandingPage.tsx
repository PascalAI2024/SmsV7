import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Activity, ArrowRight, Zap, Shield, Gamepad2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRole, isDevelopment } = useAuthStore();

  const handleCampaignManager = async () => {
    await loginWithRole('admin');
    navigate('/admin');
  };

  const handleMessageSender = async () => {
    await loginWithRole('sender');
    navigate('/user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {isDevelopment && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-yellow-500/10 border-2 border-yellow-500/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="w-6 h-6 text-yellow-400" />
              <h2 className="text-lg font-semibold text-yellow-400">Development Mode Active</h2>
            </div>
            <p className="text-gray-400">
              In production, users would need to authenticate with their organization credentials.
              For development, you can access any role directly.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Activity className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Stuck On Traffic
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            High-performance SMS campaign management with manual sending for maximum control and compliance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={handleCampaignManager}
              className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700
                       hover:from-purple-700 hover:via-purple-800 hover:to-blue-800
                       p-8 rounded-xl shadow-lg group transition-all relative overflow-hidden"
            >
              {isDevelopment && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400/20 rounded-full">
                  <span className="text-xs font-medium text-yellow-400">Dev Mode: Direct Access</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <Settings className="w-8 h-8 text-purple-200" />
                <ArrowRight className="w-6 h-6 text-purple-200 transform group-hover:translate-x-2 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold text-white text-left mb-2">
                Campaign Manager
              </h2>
              <p className="text-purple-200 text-left">
                Configure campaigns, manage contacts, and analyze performance
              </p>
              {!isDevelopment && (
                <div className="mt-4 text-sm text-purple-300 text-left">
                  Requires admin authentication
                </div>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleMessageSender}
              className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 
                       hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 
                       p-8 rounded-xl shadow-lg group transition-all relative overflow-hidden"
            >
              {isDevelopment && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400/20 rounded-full">
                  <span className="text-xs font-medium text-yellow-400">Dev Mode: Direct Access</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-blue-200" />
                <ArrowRight className="w-6 h-6 text-blue-200 transform group-hover:translate-x-2 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold text-white text-left mb-2">
                Message Sender
              </h2>
              <p className="text-blue-200 text-left">
                Send messages with our optimized rhythm-based system
              </p>
              {!isDevelopment && (
                <div className="mt-4 text-sm text-blue-300 text-left">
                  Requires sender authentication
                </div>
              )}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
            <Zap className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
            <p className="text-gray-400">Achieve up to 12,600 messages per hour with our optimized system</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
            <Activity className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Rhythm Guide</h3>
            <p className="text-gray-400">Follow our intelligent rhythm system for consistent performance</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
            <Shield className="w-6 h-6 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Full Compliance</h3>
            <p className="text-gray-400">Manual sending ensures complete control and regulatory compliance</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;