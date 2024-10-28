import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import ModeSelector from '../ui/ModeSelector';
import { useThemeStore } from '../../store/themeStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.header 
      className={`flex justify-between items-center p-4 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      } backdrop-blur-sm transition-colors duration-200 shadow-sm`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Activity className="w-6 h-6 text-blue-500" />
        <h1 className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Stuck On Traffic
        </h1>
      </motion.div>

      <div className="flex items-center gap-4">
        <ModeSelector />
        <motion.button 
          onClick={toggleTheme}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
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