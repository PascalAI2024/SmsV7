import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Send } from 'lucide-react';
import { useModeStore } from '../../store/modeStore';
import type { AppMode } from '../../store/modeStore';

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useModeStore();

  const modes: Array<{
    id: AppMode;
    label: string;
    icon: typeof Gamepad2 | typeof Send;
    color: string;
    description: string;
  }> = [
    {
      id: 'demo',
      label: 'Demo Mode',
      icon: Gamepad2,
      color: 'yellow',
      description: 'Practice and test without sending real messages'
    },
    {
      id: 'live',
      label: 'Live Mode',
      icon: Send,
      color: 'green',
      description: 'Send real messages through the API'
    }
  ];

  return (
    <div className="flex gap-2">
      {modes.map(({ id, label, icon: Icon, color, description }) => (
        <motion.button
          key={id}
          onClick={() => setMode(id)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            mode === id
              ? `bg-${color}-500/20 text-${color}-400`
              : 'bg-gray-700 text-gray-400 hover:text-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
          {mode === id && (
            <motion.div
              className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-current"
              layoutId="mode-indicator"
            />
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 
                     bg-gray-800 text-gray-300 text-xs rounded whitespace-nowrap"
          >
            {description}
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};

export default ModeToggle;