import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Flame, Gift } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

const milestones = [
  {
    icon: Zap,
    title: 'Speed Demon I',
    requirement: 300,
    type: 'speed',
    description: 'Reach 300 messages per hour'
  },
  {
    icon: Zap,
    title: 'Speed Demon II',
    requirement: 500,
    type: 'speed',
    description: 'Reach 500 messages per hour'
  },
  {
    icon: Flame,
    title: 'Combo Master I',
    requirement: 50,
    type: 'combo',
    description: 'Achieve a 50x combo'
  },
  {
    icon: Flame,
    title: 'Combo Master II',
    requirement: 100,
    type: 'combo',
    description: 'Achieve a 100x combo'
  },
  {
    icon: Trophy,
    title: 'Volume King I',
    requirement: 1000,
    type: 'volume',
    description: 'Send 1,000 messages'
  },
  {
    icon: Trophy,
    title: 'Volume King II',
    requirement: 5000,
    type: 'volume',
    description: 'Send 5,000 messages'
  },
  {
    icon: Star,
    title: 'Perfect Streak I',
    requirement: 100,
    type: 'streak',
    description: 'Maintain a streak for 100 taps'
  },
  {
    icon: Gift,
    title: 'Christmas Spirit',
    requirement: 2000,
    type: 'volume',
    description: 'Send 2,000 Christmas messages'
  }
];

const AchievementPanel: React.FC = () => {
  const stats = useDemoStore(state => state.stats);
  const [showPanel, setShowPanel] = React.useState(false);

  const getProgress = (milestone: typeof milestones[0]) => {
    switch (milestone.type) {
      case 'speed':
        return Math.min(1, stats.messagesPerHour / milestone.requirement);
      case 'combo':
        return Math.min(1, stats.streak / milestone.requirement);
      case 'volume':
        return Math.min(1, stats.sent / milestone.requirement);
      case 'streak':
        return Math.min(1, stats.streak / milestone.requirement);
      default:
        return 0;
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowPanel(true)}
        className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-lg shadow-lg
                 hover:bg-gray-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trophy className="w-6 h-6 text-yellow-400" />
      </motion.button>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="bg-gray-800 rounded-lg w-full max-w-md m-4 p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Milestones</h2>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {milestones.map((milestone) => {
                  const progress = getProgress(milestone);
                  const isCompleted = progress >= 1;

                  return (
                    <motion.div
                      key={milestone.title}
                      className={`p-4 rounded-lg border ${
                        isCompleted
                          ? 'border-yellow-400/50 bg-yellow-400/10'
                          : 'border-gray-700 bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <milestone.icon className={`w-5 h-5 ${
                          isCompleted ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium">{milestone.title}</h3>
                            <span className={`text-sm ${
                              isCompleted ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {(progress * 100).toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                          <div className="mt-3 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                isCompleted ? 'bg-yellow-400' : 'bg-blue-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress * 100}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementPanel;