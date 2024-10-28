import React from 'react';
import { Trophy, Star, Zap, Target, Award, Flame } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';

const Achievements: React.FC = () => {
  const { campaignStats } = useCampaignStore();
  
  const achievements = [
    {
      icon: Zap,
      title: "Speed Demon",
      description: "50+ taps in 10 seconds",
      progress: Math.min(campaignStats.messagesPerHour / 300, 1),
      unlocked: campaignStats.messagesPerHour >= 300,
    },
    {
      icon: Flame,
      title: "Combo Master",
      description: "Maintain a 50x combo streak",
      progress: Math.min(campaignStats.sent / 1000, 1),
      unlocked: campaignStats.sent >= 1000,
    },
    {
      icon: Trophy,
      title: "Volume King",
      description: "Send 10,000 messages in one session",
      progress: Math.min(campaignStats.sent / 10000, 1),
      unlocked: campaignStats.sent >= 10000,
    },
    {
      icon: Star,
      title: "Perfect Rhythm",
      description: "Maintain 300+ messages per minute",
      progress: Math.min(campaignStats.messagesPerHour / 18000, 1), // 300 * 60 = 18000/hour
      unlocked: campaignStats.messagesPerHour >= 18000,
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h2 className="text-lg font-semibold text-white">Achievements</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              achievement.unlocked
                ? 'border-yellow-400/50 bg-yellow-400/10'
                : 'border-gray-700 bg-gray-700/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <achievement.icon className={`w-5 h-5 ${
                achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  {achievement.description}
                </p>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      achievement.unlocked
                        ? 'bg-yellow-400'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${achievement.progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;