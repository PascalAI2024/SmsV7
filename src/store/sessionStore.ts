import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  isSessionActive: boolean;
  startTime: number | null;
  setSessionActive: (active: boolean) => void;
  setStartTime: (time: number | null) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isSessionActive: false,
      startTime: null,
      setSessionActive: (active) => set({ isSessionActive: active }),
      setStartTime: (time) => set({ startTime: time }),
    }),
    {
      name: 'session-storage',
    }
  )
);