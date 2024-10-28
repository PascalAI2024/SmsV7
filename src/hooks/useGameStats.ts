import { useState, useEffect } from 'react';
import { useDemoStore } from '../store/demoStore';
import { useCampaignStore } from '../store/campaignStore';

export function useGameStats() {
  const isDemoMode = useDemoStore((state) => state.isDemoMode);
  const demoStats = useDemoStore((state) => state.stats);
  const simulateTap = useDemoStore((state) => state.simulateTap);
  const campaignStats = useCampaignStore((state) => state.campaignStats);
  
  const [lastTapTime, setLastTapTime] = useState(Date.now());
  const [recentTaps, setRecentTaps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      // Clean up taps older than 60 seconds
      setRecentTaps(prev => prev.filter(t => now - t < 60000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    const now = Date.now();
    setLastTapTime(now);
    setRecentTaps(prev => [...prev, now]);

    if (isDemoMode) {
      simulateTap();
    } else {
      // Handle real message sending here
    }
  };

  const stats = isDemoMode ? {
    speedStats: {
      current: demoStats.messagesPerHour,
      best: demoStats.bestSpeed,
    },
    streak: demoStats.streak,
    tapsInWindow: demoStats.tapsInWindow,
    comboMultiplier: demoStats.comboMultiplier,
    sent: demoStats.sent,
    failed: demoStats.failed,
    pending: demoStats.pending,
    sessionTime: demoStats.sessionTime,
  } : {
    speedStats: {
      current: campaignStats.messagesPerHour,
      best: 0, // Implement this in campaign store if needed
    },
    streak: 0, // Implement in campaign store
    tapsInWindow: 0,
    comboMultiplier: 1,
    sent: campaignStats.sent,
    failed: campaignStats.failed,
    pending: campaignStats.pending,
    sessionTime: campaignStats.sessionTime,
  };

  return {
    stats,
    handleTap,
    lastTapTime,
    isDemoMode,
  };
}