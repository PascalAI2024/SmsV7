import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Activity, MessageSquare, Clock } from 'lucide-react';
import { useKioskStore } from '../../store/kioskStore';
import { useDemoStore } from '../../store/demoStore';

const demos = [
  {
    id: 'rhythm',
    title: '10-Second Rhythm Pattern',
    description: 'Optimal rhythm: 50 taps per 10-second interval',
    icon: Activity,
    color: 'text-green-400',
    duration: 10000, // 10 seconds
    tapInterval: 200, // 200ms = 5 taps per second = 50 taps in 10s
    metrics: {
      interval: '50 taps/10s',
      minute: '300 msgs/min',
      hour: '12,600 msgs/hr'
    }
  },
  {
    id: 'speed',
    title: 'Sustained Performance',
    description: '6 intervals of 50 taps per minute',
    icon: Zap,
    color: 'text-blue-400',
    duration: 60000, // 60 seconds
    tapInterval: 200,
    metrics: {
      intervals: '6 × 50 taps',
      perMinute: '300 msgs/min',
      perHour: '12,600 msgs/hr'
    }
  },
  {
    id: 'volume',
    title: 'Hourly Capacity',
    description: '42 minutes active sending with breaks',
    icon: Clock,
    color: 'text-purple-400',
    duration: 30000,
    tapInterval: 200,
    metrics: {
      active: '42 mins/hr',
      breaks: '18 mins rest',
      target: '~10,000 msgs/hr'
    }
  },
  {
    id: 'combo',
    title: 'Combo System',
    description: 'Maintain rhythm to build multipliers',
    icon: Flame,
    color: 'text-orange-400',
    duration: 20000,
    tapInterval: 200,
    metrics: {
      timing: '200ms taps',
      multiplier: '5x max',
      chain: '50+ streak'
    }
  }
] as const;

const KioskOverlay: React.FC = () => {
  const { isKioskMode, isPlaying, currentDemo, startDemo, stopDemo } = useKioskStore();
  const { startSession, stopSession, simulateTap } = useDemoStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isKioskMode) return;

    const demo = demos[currentIndex];
    startDemo(demo.id as any);
    startSession();

    let tapCount = 0;
    const maxTaps = Math.floor(demo.duration / demo.tapInterval);

    const tapInterval = setInterval(() => {
      if (tapCount < maxTaps) {
        simulateTap();
        tapCount++;
      }
    }, demo.tapInterval);

    const demoTimer = setTimeout(() => {
      clearInterval(tapInterval);
      stopSession();
      setCurrentIndex((prev) => (prev + 1) % demos.length);
    }, demo.duration);

    return () => {
      clearInterval(tapInterval);
      clearTimeout(demoTimer);
    };
  }, [currentIndex, isKioskMode]);

  if (!isKioskMode) return null;

  const currentDemoInfo = demos[currentIndex];

  return (
    <AnimatePresence>
      {isKioskMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
        >
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 p-6 rounded-lg shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gray-700 ${currentDemoInfo.color}`}>
                  <currentDemoInfo.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {currentDemoInfo.title}
                  </h3>
                  <p className="text-gray-300">
                    {currentDemoInfo.description}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {Object.entries(currentDemoInfo.metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-sm text-gray-400">{key}</div>
                        <div className="text-white font-mono text-sm">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ 
                    duration: currentDemoInfo.duration / 1000,
                    ease: 'linear'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KioskOverlay;