import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay } from 'lucide-react';
import { useKioskStore } from '../../store/kioskStore';

const KioskToggle: React.FC = () => {
  const { isKioskMode, toggleKioskMode } = useKioskStore();

  return (
    <motion.button
      onClick={toggleKioskMode}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isKioskMode 
          ? 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MonitorPlay className="w-4 h-4" />
      <span className="text-sm font-medium">Kiosk Mode {isKioskMode ? 'On' : 'Off'}</span>
    </motion.button>
  );
};

export default KioskToggle;