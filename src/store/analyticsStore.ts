import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HourlyStats {
  hour: number;
  sent: number;
  failed: number;
  rate: number;
  timestamp: number;
}

interface AnalyticsStore {
  hourlyStats: HourlyStats[];
  dailyStats: {
    date: string;
    sent: number;
    failed: number;
    rate: number;
  }[];
  addHourlyStat: (stat: Omit<HourlyStats, 'timestamp'>) => void;
  clearStats: () => void;
}

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      hourlyStats: [],
      dailyStats: [],
      
      addHourlyStat: (stat) => {
        set((state) => {
          const newStat = { ...stat, timestamp: Date.now() };
          const currentHour = new Date().getHours();
          
          // Update hourly stats
          const updatedHourlyStats = state.hourlyStats
            .filter(s => s.hour !== currentHour) // Remove old stats for current hour
            .concat(newStat)
            .slice(-24); // Keep last 24 hours
          
          // Update daily stats
          const today = new Date().toISOString().split('T')[0];
          const todayStats = state.dailyStats.find(s => s.date === today);
          
          const updatedDailyStats = todayStats
            ? state.dailyStats.map(s => 
                s.date === today 
                  ? {
                      ...s,
                      sent: s.sent + stat.sent,
                      failed: s.failed + stat.failed,
                      rate: (s.rate + stat.rate) / 2,
                    }
                  : s
              )
            : [...state.dailyStats, { 
                date: today, 
                sent: stat.sent,
                failed: stat.failed,
                rate: stat.rate,
              }];
          
          return {
            hourlyStats: updatedHourlyStats,
            dailyStats: updatedDailyStats.slice(-30), // Keep last 30 days
          };
        });
      },
      
      clearStats: () => set({ hourlyStats: [], dailyStats: [] }),
    }),
    {
      name: 'analytics-storage',
    }
  )
);