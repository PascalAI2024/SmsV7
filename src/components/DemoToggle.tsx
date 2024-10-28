import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

const DemoToggle = () => {
  const { isDemoMode, toggleDemo } = useDemoStore();

  return (
    <motion.button
      onClick={toggleDemo}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
        isDemoMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Gamepad2 className="w-4 h-4" />
      <span className="text-sm">Demo Mode</span>
    </motion.button>
  );
};

export default DemoToggle;