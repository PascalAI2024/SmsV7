import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

const RhythmGuide: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const isActive = useDemoStore(state => state.isActive);
  const tapsInWindow = useDemoStore(state => state.stats.tapsInWindow);
  const [lastTapTime, setLastTapTime] = useState(Date.now());

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 100); // Complete cycle every 10 seconds

    return () => clearInterval(interval);
  }, [isActive]);

  const isPerfectRhythm = tapsInWindow >= 45 && tapsInWindow <= 55;
  const timeSinceLastTap = Date.now() - lastTapTime;
  const rhythmStatus = isPerfectRhythm ? 'perfect' : timeSinceLastTap > 250 ? 'slow' : timeSinceLastTap < 150 ? 'fast' : 'good';

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 ${
            rhythmStatus === 'perfect' ? 'text-green-400' :
            rhythmStatus === 'good' ? 'text-blue-400' :
            rhythmStatus === 'slow' ? 'text-yellow-400' :
            'text-red-400'
          }`} />
          <span className="text-lg font-medium text-white">Rhythm Guide</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-400">Maintain Rhythm</span>
        </div>
      </div>

      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 w-full"
          style={{
            translateX: `${progress - 100}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-y-0 w-1 bg-white"
          style={{ left: '50%' }}
          animate={{
            opacity: isActive ? [0.8, 0.3] : 0,
            scale: isActive ? [1, 1.5, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className={`px-4 py-2 rounded-lg ${
          rhythmStatus === 'perfect' ? 'bg-green-500/20 text-green-400' :
          rhythmStatus === 'good' ? 'bg-blue-500/20 text-blue-400' :
          rhythmStatus === 'slow' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          <span className="text-sm font-medium">
            {rhythmStatus === 'perfect' ? 'Perfect Rhythm!' :
             rhythmStatus === 'good' ? 'Good Pace' :
             rhythmStatus === 'slow' ? 'Speed Up' :
             'Slow Down'}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-400">Speed</div>
            <div className="font-mono text-white">{tapsInWindow}/10s</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Timing</div>
            <div className="font-mono text-white">{timeSinceLastTap}ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RhythmGuide;