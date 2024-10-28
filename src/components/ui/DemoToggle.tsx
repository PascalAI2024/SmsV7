import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

const DemoToggle: React.FC = () => {
  const { isDemoMode, toggleDemoMode, isActive, stopSession } = useDemoStore();

  const handleToggle = () => {
    if (isActive) {
      stopSession();
    }
    toggleDemoMode();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isDemoMode 
          ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Gamepad2 className="w-4 h-4" />
      <span className="text-sm font-medium">Demo Mode {isDemoMode ? 'On' : 'Off'}</span>
    </motion.button>
  );
};

export default DemoToggle;