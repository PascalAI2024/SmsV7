import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trophy, Star, Zap, Target, Award, Flame } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy | typeof Star | typeof Zap | typeof Target | typeof Award | typeof Flame;
  progress: number;
  unlocked: boolean;
  requirement: number;
  type: 'speed' | 'combo' | 'volume' | 'streak';
}

interface AchievementStore {
  achievements: {
    list: Achievement[];
    showPanel: boolean;
  };
  latestUnlock: Achievement | null;
  updateProgress: (type: Achievement['type'], value: number) => void;
  checkAchievements: () => void;
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: {
        showPanel: false,
        list: [
          {
            id: 'speed-demon',
            title: 'Speed Demon',
            description: 'Reach 300 messages per hour',
            icon: Zap,
            progress: 0,
            unlocked: false,
            requirement: 300,
            type: 'speed'
          },
          {
            id: 'combo-master',
            title: 'Combo Master',
            description: 'Achieve a 50x combo',
            icon: Flame,
            progress: 0,
            unlocked: false,
            requirement: 50,
            type: 'combo'
          },
          {
            id: 'volume-king',
            title: 'Volume King',
            description: 'Send 10,000 messages in one session',
            icon: Trophy,
            progress: 0,
            unlocked: false,
            requirement: 10000,
            type: 'volume'
          },
          {
            id: 'perfect-streak',
            title: 'Perfect Streak',
            description: 'Maintain a streak for 5 minutes',
            icon: Star,
            progress: 0,
            unlocked: false,
            requirement: 300,
            type: 'streak'
          }
        ]
      },
      latestUnlock: null,
      updateProgress: (type, value) => {
        set((state) => ({
          achievements: {
            ...state.achievements,
            list: state.achievements.list.map((achievement) => {
              if (achievement.type === type) {
                const progress = value / achievement.requirement;
                return {
                  ...achievement,
                  progress: Math.min(1, progress)
                };
              }
              return achievement;
            })
          }
        }));
        get().checkAchievements();
      },
      checkAchievements: () => {
        const { achievements } = get();
        let newUnlock: Achievement | null = null;

        const updatedList = achievements.list.map((achievement) => {
          if (!achievement.unlocked && achievement.progress >= 1) {
            newUnlock = achievement;
            return { ...achievement, unlocked: true };
          }
          return achievement;
        });

        if (newUnlock) {
          set({
            achievements: { ...achievements, list: updatedList },
            latestUnlock: newUnlock
          });

          // Clear latest unlock after 3 seconds
          setTimeout(() => {
            set({ latestUnlock: null });
          }, 3000);
        }
      }
    }),
    {
      name: 'achievements-storage'
    }
  )
);