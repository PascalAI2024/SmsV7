import React from 'react';
import { motion } from 'framer-motion';
import { Send, Gamepad2, MonitorPlay } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useKioskStore } from '../../store/kioskStore';

type Mode = 'live' | 'demo' | 'kiosk';

const ModeSelector: React.FC = () => {
  const { isDemoMode, toggleDemoMode } = useDemoStore();
  const { isKioskMode, toggleKioskMode } = useKioskStore();

  const currentMode: Mode = isKioskMode ? 'kiosk' : isDemoMode ? 'demo' : 'live';

  const modes = [
    {
      id: 'live' as Mode,
      label: 'Live Mode',
      icon: Send,
      color: 'emerald',
      description: 'Production mode - Send real messages via API'
    },
    {
      id: 'demo' as Mode,
      label: 'Demo Mode',
      icon: Gamepad2,
      color: 'yellow',
      description: 'Practice mode - Test features with real interaction'
    },
    {
      id: 'kiosk' as Mode,
      label: 'Kiosk Mode',
      icon: MonitorPlay,
      color: 'purple',
      description: 'Auto-demonstration of system capabilities'
    }
  ];

  const handleModeChange = (mode: Mode) => {
    switch (mode) {
      case 'live':
        if (isKioskMode) toggleKioskMode();
        if (isDemoMode) toggleDemoMode();
        break;
      case 'demo':
        if (isKioskMode) toggleKioskMode();
        if (!isDemoMode) toggleDemoMode();
        break;
      case 'kiosk':
        if (!isKioskMode) toggleKioskMode();
        if (!isDemoMode) toggleDemoMode();
        break;
    }
  };

  return (
    <div className="flex bg-gray-800 rounded-lg p-1">
      {modes.map(({ id, label, icon: Icon, color, description }) => (
        <motion.button
          key={id}
          onClick={() => handleModeChange(id)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentMode === id
              ? `bg-${color}-500/20 text-${color}-400`
              : 'text-gray-400 hover:text-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
          {currentMode === id && (
            <motion.div
              className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-current"
              layoutId="mode-indicator"
            />
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 
                     bg-gray-800 text-gray-300 text-xs rounded whitespace-nowrap z-50"
          >
            {description}
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};

export default ModeSelector;