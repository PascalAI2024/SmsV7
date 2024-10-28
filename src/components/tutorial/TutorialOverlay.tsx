import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, MonitorPlay, Play, Zap, Activity, Trophy, MessageSquare } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorialStore {
  hasSeenTutorial: boolean;
  isOpen: boolean;
  setHasSeenTutorial: () => void;
  openTutorial: () => void;
  closeTutorial: () => void;
}

const useTutorialStore = create<TutorialStore>()(
  persist(
    (set) => ({
      hasSeenTutorial: false,
      isOpen: false,
      setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
      openTutorial: () => set({ isOpen: true }),
      closeTutorial: () => set({ isOpen: false }),
    }),
    {
      name: 'tutorial-storage',
    }
  )
);

const TutorialOverlay: React.FC = () => {
  const { isOpen, closeTutorial, setHasSeenTutorial } = useTutorialStore();

  const handleClose = () => {
    closeTutorial();
    setHasSeenTutorial();
  };

  const sections = [
    {
      title: 'Operating Modes',
      items: [
        {
          icon: Play,
          color: 'text-emerald-400',
          title: 'Live Mode',
          description: "Send real messages to your contacts. Use this mode when you are ready to start your campaign."
        },
        {
          icon: Gamepad2,
          color: 'text-yellow-400',
          title: 'Demo Mode',
          description: 'Practice and test features without sending real messages. Perfect for learning the system.'
        },
        {
          icon: MonitorPlay,
          color: 'text-purple-400',
          title: 'Kiosk Mode',
          description: 'Watch automated demonstrations of different features and techniques.'
        }
      ]
    },
    {
      title: 'Key Features',
      items: [
        {
          icon: Activity,
          color: 'text-blue-400',
          title: 'Rhythm Guide',
          description: 'Follow the beat for optimal sending speed.'
        },
        {
          icon: Zap,
          color: 'text-yellow-400',
          title: 'Combo System',
          description: 'Maintain consistent timing to build combos and increase your efficiency multiplier.'
        },
        {
          icon: Trophy,
          color: 'text-green-400',
          title: 'Achievements',
          description: 'Unlock achievements by reaching speed and volume milestones.'
        },
        {
          icon: MessageSquare,
          color: 'text-purple-400',
          title: 'Message Variants',
          description: 'Use different message templates to test effectiveness and maintain variety.'
        }
      ]
    }
  ];

  return (
    <>
      <button
        onClick={() => useTutorialStore.getState().openTutorial()}
        className="fixed right-4 bottom-4 p-3 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 
                 text-gray-300 hover:text-white transition-colors z-50"
      >
        <Activity className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl"
            >
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">How to Use SMS Campaign Manager</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="space-y-8">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item) => (
                          <div
                            key={item.title}
                            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 
                                     transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg bg-gray-800 ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{item.title}</h4>
                                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-700 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TutorialOverlay;