import React from 'react';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../store/demoStore';
import useSound from 'use-sound';

const TapButton: React.FC = () => {
  const { stats, isActive, simulateTap } = useDemoStore();
  const [particles, setParticles] = React.useState<{ id: number; x: number; y: number }[]>([]);
  const [playTap] = useSound('/sounds/tap.mp3', { volume: 0.5 });
  const [playCombo] = useSound('/sounds/combo.mp3', { volume: 0.7 });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setParticles(prev => [...prev, { id: Date.now(), x, y }]);

    if (stats.streak > 0 && stats.streak % 10 === 0) {
      playCombo();
    } else {
      playTap();
    }

    simulateTap();
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.button
      onClick={handleClick}
      disabled={!isActive}
      className={`relative w-full h-28 rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl shadow-blue-500/20 cursor-pointer hover:shadow-blue-500/30' 
          : 'bg-gray-700 cursor-not-allowed opacity-75'
      }`}
      whileHover={isActive ? { scale: 1.02 } : undefined}
      whileTap={isActive ? { scale: 0.98 } : undefined}
    >
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
            initial={{ x: particle.x, y: particle.y, scale: 0, opacity: 1 }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y - 100,
              scale: 2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      <div className="relative flex flex-col items-center justify-center h-full">
        <Zap className={`w-10 h-10 mb-2 ${isActive ? 'text-white animate-pulse' : 'text-gray-400'}`} />
        <span className="font-mono text-xl font-bold text-white tracking-wide">
          {isActive ? 'Click to Send Message' : 'Start Session to Begin'}
        </span>
      </div>

      {stats.streak > 0 && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 
                   px-4 py-2 rounded-full font-mono font-bold text-white"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {stats.streak}x
        </motion.div>
      )}
    </motion.button>
  );
};

export default TapButton;