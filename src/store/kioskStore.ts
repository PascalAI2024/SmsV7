import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KioskState {
  isKioskMode: boolean;
  isPlaying: boolean;
  currentDemo: 'speed' | 'combo' | 'rhythm' | 'volume' | null;
  toggleKioskMode: () => void;
  startDemo: (demo: 'speed' | 'combo' | 'rhythm' | 'volume') => void;
  stopDemo: () => void;
}

export const useKioskStore = create<KioskState>()(
  persist(
    (set) => ({
      isKioskMode: false,
      isPlaying: false,
      currentDemo: null,
      toggleKioskMode: () => set((state) => ({ 
        isKioskMode: !state.isKioskMode,
        isPlaying: false,
        currentDemo: null
      })),
      startDemo: (demo) => set({ 
        isPlaying: true,
        currentDemo: demo 
      }),
      stopDemo: () => set({ 
        isPlaying: false,
        currentDemo: null 
      }),
    }),
    {
      name: 'kiosk-storage',
    }
  )
);