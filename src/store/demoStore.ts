import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { formatTime } from '../utils/formatTime';

interface DemoStats {
  sent: number;
  failed: number;
  pending: number;
  messagesPerHour: number;
  sessionTime: string;
  streak: number;
  comboMultiplier: number;
  tapsInWindow: number;
  bestSpeed: number;
}

interface DemoState {
  isDemoMode: boolean;
  stats: DemoStats;
  startTime: number | null;
  isActive: boolean;
  toggleDemoMode: () => void;
  updateStats: (updates: Partial<DemoStats>) => void;
  startSession: () => void;
  stopSession: () => void;
  simulateTap: () => void;
  reset: () => void;
}

const initialStats: DemoStats = {
  sent: 0,
  failed: 0,
  pending: 1000,
  messagesPerHour: 0,
  sessionTime: '00:00:00',
  streak: 0,
  comboMultiplier: 1,
  tapsInWindow: 0,
  bestSpeed: 0,
};

let sessionTimer: NodeJS.Timer | null = null;
let speedCalculator: NodeJS.Timer | null = null;

// Helper function to add human-like fluctuation
const addHumanFluctuation = (baseSpeed: number): number => {
  // Add random fluctuation between -5% and +5%
  const fluctuation = (Math.random() - 0.5) * 0.1;
  return Math.round(baseSpeed * (1 + fluctuation));
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      isDemoMode: true,
      stats: initialStats,
      startTime: null,
      isActive: false,

      toggleDemoMode: () => set((state) => ({ 
        isDemoMode: !state.isDemoMode,
        stats: initialStats,
        startTime: null,
        isActive: false,
      })),

      updateStats: (updates) => set((state) => ({
        stats: { ...state.stats, ...updates }
      })),

      startSession: () => {
        const startTime = Date.now();
        set({ startTime, isActive: true });

        if (sessionTimer) clearInterval(sessionTimer);
        sessionTimer = setInterval(() => {
          const state = get();
          if (!state.isActive) {
            if (sessionTimer) clearInterval(sessionTimer);
            return;
          }

          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
          set((state) => ({
            stats: {
              ...state.stats,
              sessionTime: formatTime(elapsedSeconds)
            }
          }));
        }, 1000);

        if (speedCalculator) clearInterval(speedCalculator);
        speedCalculator = setInterval(() => {
          const state = get();
          if (!state.isActive) {
            if (speedCalculator) clearInterval(speedCalculator);
            return;
          }

          set((state) => {
            const currentSpeed = state.stats.messagesPerHour;
            return {
              stats: {
                ...state.stats,
                tapsInWindow: Math.max(0, state.stats.tapsInWindow - 1),
                // Add slight fluctuation to decay
                messagesPerHour: Math.max(0, addHumanFluctuation(currentSpeed - (currentSpeed * 0.1)))
              }
            };
          });
        }, 1000);
      },

      stopSession: () => {
        set({ isActive: false });
        if (sessionTimer) clearInterval(sessionTimer);
        if (speedCalculator) clearInterval(speedCalculator);
      },

      simulateTap: () => set((state) => {
        if (!state.isActive) return state;

        const newTapsInWindow = Math.min(state.stats.tapsInWindow + 1, 50);
        
        // Calculate messages per hour based on current performance
        // 50 taps/10s = 300/min = 18,000/hr theoretical max
        // Target sustainable rate: ~12,600/hr (70% of theoretical max)
        const theoreticalMax = 18000;
        const targetRate = 12600;
        const baseRate = Math.min(
          Math.round((newTapsInWindow / 50) * targetRate),
          targetRate
        );

        // Add human-like fluctuation to the rate
        const sustainableRate = addHumanFluctuation(baseRate);

        const shouldFail = Math.random() < 0.02; // 2% failure rate
        const newStreak = shouldFail ? 0 : state.stats.streak + 1;
        const newComboMultiplier = shouldFail ? 1 : Math.min(state.stats.comboMultiplier + 0.1, 5.0);

        // Cap best speed at a realistic maximum
        const maxBestSpeed = 13000; // Slightly higher than target for exceptional performance
        const newBestSpeed = Math.min(
          Math.max(state.stats.bestSpeed, sustainableRate),
          maxBestSpeed
        );

        return {
          stats: {
            ...state.stats,
            sent: shouldFail ? state.stats.sent : state.stats.sent + 1,
            failed: shouldFail ? state.stats.failed + 1 : state.stats.failed,
            pending: state.stats.pending - 1,
            messagesPerHour: sustainableRate,
            streak: newStreak,
            comboMultiplier: newComboMultiplier,
            tapsInWindow: newTapsInWindow,
            bestSpeed: newBestSpeed
          }
        };
      }),

      reset: () => set({ 
        stats: initialStats,
        startTime: null,
        isActive: false
      }),
    }),
    {
      name: 'demo-storage',
    }
  )
);