import React from 'react';
import { Sun, Moon, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import ModeToggle from './ui/ModeToggle';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.header 
      className={`flex justify-between items-center p-4 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      } backdrop-blur-sm transition-colors duration-200 shadow-sm`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Activity className="w-6 h-6 text-blue-500 mr-2" />
        <h1 className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Stuck On Traffic
        </h1>
      </motion.div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <motion.button 
          onClick={toggleTheme}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;