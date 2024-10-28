import React, { useState, useEffect } from 'react';
import { Clock, MessageSquare, Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import SessionControls from './SessionControls';
import MessageVariants from './MessageVariants';
import GameStats from './GameStats';
import TapButton from './TapButton';
import useSound from 'use-sound';

function MainDashboard() {
  const { campaignStats, sendNextMessage } = useCampaignStore();
  const [streak, setStreak] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [speedStats, setSpeedStats] = useState({ current: 0, best: 0 });
  const [tapsInWindow, setTapsInWindow] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(Date.now());
  const [recentTaps, setRecentTaps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update current speed based on recent taps
      const now = Date.now();
      const recentTapsInLastMinute = recentTaps.filter(t => now - t < 60000).length;
      setSpeedStats(prev => ({
        ...prev,
        current: recentTapsInLastMinute,
        best: Math.max(prev.best, recentTapsInLastMinute)
      }));

      // Update taps in 10-second window
      const tapsInLast10Seconds = recentTaps.filter(t => now - t < 10000).length;
      setTapsInWindow(tapsInLast10Seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [recentTaps]);

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    // Update recent taps
    setRecentTaps(prev => [...prev, now].filter(t => now - t < 60000));
    setLastTapTime(now);

    // Update streak and combo multiplier
    if (timeSinceLastTap < 1000) {
      setStreak(prev => prev + 1);
      setComboMultiplier(prev => Math.min(prev + 0.1, 5.0));
    } else {
      setStreak(1);
      setComboMultiplier(1);
    }

    sendNextMessage();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Session Time"
          value={campaignStats.sessionTime}
          Icon={Clock}
          color="text-blue-400"
        />
        <StatsCard
          title="Messages Sent"
          value={campaignStats.sent}
          Icon={MessageSquare}
          color="text-green-400"
        />
        <StatsCard
          title="Messages/Hour"
          value={campaignStats.messagesPerHour}
          Icon={Users}
          color="text-purple-400"
        />
        <StatsCard
          title="Status"
          value="ready"
          Icon={Check}
          color="text-green-400"
        />
      </div>

      <GameStats
        speedStats={speedStats}
        streak={streak}
        tapsInWindow={tapsInWindow}
        comboMultiplier={comboMultiplier}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SessionControls />
        </div>
        <div>
          <MessageVariants />
        </div>
      </div>

      <TapButton
        onTap={handleTap}
        streak={streak}
        comboMultiplier={comboMultiplier}
      />
    </div>
  );
}

const StatsCard = ({ title, value, Icon, color }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold text-white">{value}</h2>
      </div>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </div>
);

export default MainDashboard;