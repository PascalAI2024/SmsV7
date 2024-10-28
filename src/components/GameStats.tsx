import React from 'react';
import { Activity, Trophy, Flame, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../store/demoStore';

const GameStats: React.FC = () => {
  const { stats } = useDemoStore();

  return (
    <motion.div 
      className="grid grid-cols-4 gap-2 bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <StatItem
        icon={<Activity className="w-4 h-4 text-blue-400" />}
        label="Current Speed"
        value={`${stats.messagesPerHour}/hr`}
        isHighlighted={stats.messagesPerHour >= 300}
      />
      <StatItem
        icon={<Trophy className="w-4 h-4 text-yellow-400" />}
        label="Best Speed"
        value={`${stats.bestSpeed}/hr`}
        isHighlighted={stats.bestSpeed >= 300}
      />
      <StatItem
        icon={<Flame className="w-4 h-4 text-red-400" />}
        label={`Combo (${stats.comboMultiplier.toFixed(1)}x)`}
        value={stats.streak.toString()}
        isHighlighted={stats.streak >= 50}
      />
      <StatItem
        icon={<Zap className="w-4 h-4 text-purple-400" />}
        label="Burst Speed"
        value={`${stats.tapsInWindow}/10s`}
        isHighlighted={stats.tapsInWindow >= 50}
      />
    </motion.div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isHighlighted: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, isHighlighted }) => (
  <motion.div 
    className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
      isHighlighted ? 'bg-gradient-to-r from-yellow-400/20 to-purple-400/20' : ''
    }`}
    whileHover={{ scale: 1.02 }}
    animate={isHighlighted ? {
      scale: [1, 1.02, 1],
      transition: { repeat: Infinity, duration: 2 }
    } : {}}
  >
    <motion.div 
      className={`p-1.5 rounded-lg ${isHighlighted ? 'bg-gray-800/50' : ''}`}
      animate={isHighlighted ? {
        y: [-2, 2, -2],
        transition: { repeat: Infinity, duration: 1 }
      } : {}}
    >
      {icon}
    </motion.div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <motion.p 
        className={`font-bold ${
          isHighlighted ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400' 
          : 'text-white'
        }`}
        animate={isHighlighted ? {
          opacity: [1, 0.8, 1],
          transition: { repeat: Infinity, duration: 1.5 }
        } : {}}
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

export default GameStats;