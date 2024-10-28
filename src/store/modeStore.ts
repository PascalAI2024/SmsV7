import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppMode = 'demo' | 'live';

interface ModeState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isDemoMode: boolean;
  isLiveMode: boolean;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'demo',
      isDemoMode: true,
      isLiveMode: false,
      setMode: (mode) => set({
        mode,
        isDemoMode: mode === 'demo',
        isLiveMode: mode === 'live'
      }),
    }),
    {
      name: 'mode-storage',
    }
  )
);