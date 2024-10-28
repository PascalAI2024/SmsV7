import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, Zap, Trophy, AlertCircle } from 'lucide-react';
import { StatsCard, GameStats, TapButton, MessageVariants, SessionControls } from '../../components';
import { useDemoStore } from '../../store/demoStore';

const MainDashboard: React.FC = () => {
  const { stats, isActive, isDemoMode, startSession, stopSession } = useDemoStore();
  const [showReport, setShowReport] = useState(false);

  const handleSessionToggle = () => {
    if (isActive) {
      stopSession();
      setShowReport(true);
    } else {
      startSession();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {isDemoMode && (
        <motion.div 
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-yellow-500">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Demo Mode Active - No real messages will be sent</p>
          </div>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <StatsCard
          title="Session Time"
          value={stats.sessionTime}
          Icon={Clock}
          iconColor="text-blue-400"
        />
        <StatsCard
          title="Messages Sent"
          value={stats.sent}
          Icon={MessageSquare}
          iconColor="text-green-400"
          highlight={stats.sent > 0}
        />
        <StatsCard
          title="Messages/Hour"
          value={stats.messagesPerHour}
          Icon={Zap}
          iconColor="text-purple-400"
          highlight={stats.messagesPerHour >= 300}
        />
        <StatsCard
          title="Best Speed"
          value={stats.bestSpeed}
          Icon={Trophy}
          iconColor="text-yellow-400"
          highlight={stats.bestSpeed >= 300}
        />
      </motion.div>

      <GameStats />

      <div className="space-y-4">
        <SessionControls onToggle={handleSessionToggle} isActive={isActive} />
        <TapButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MessageVariants />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;