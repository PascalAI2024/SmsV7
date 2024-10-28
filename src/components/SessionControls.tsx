import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

interface SessionControlsProps {
  onToggle: () => void;
  isActive: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = ({ onToggle, isActive }) => {
  const { stats, isDemoMode } = useDemoStore();

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Clock className="w-6 h-6 text-blue-400" />
          <span className="text-white font-medium">Session Controls</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold font-mono text-white">
            {stats.sessionTime}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
          >
            {isActive ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {isDemoMode && (
        <div className="mt-2 px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded text-yellow-400 text-xs">
          Demo Mode Active - No messages will be sent
        </div>
      )}
    </motion.div>
  );
};

export default SessionControls;