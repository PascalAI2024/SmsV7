import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  iconColor: string;
  highlight?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, iconColor, highlight }) => {
  return (
    <motion.div
      className={`bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 
                transition-all duration-300 ${highlight ? 'ring-2 ring-yellow-400/50' : ''}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">{title}</p>
          <p className={`text-2xl font-bold font-mono tracking-tight ${highlight ? 'text-yellow-400' : 'text-white'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-gray-700/50 ${highlight ? 'animate-pulse' : ''}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;