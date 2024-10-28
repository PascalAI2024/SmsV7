import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, X, Award, Zap, MessageSquare, Clock } from 'lucide-react';

interface SessionReportProps {
  stats: {
    sessionTime: string;
    sent: number;
    messagesPerHour: number;
    bestSpeed: number;
    streak: number;
  };
  onClose: () => void;
}

const SessionReport: React.FC<SessionReportProps> = ({ stats, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Session Summary</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <StatItem
              icon={<Clock className="w-5 h-5 text-blue-400" />}
              label="Session Duration"
              value={stats.sessionTime}
            />
            <StatItem
              icon={<MessageSquare className="w-5 h-5 text-green-400" />}
              label="Messages Sent"
              value={stats.sent.toString()}
            />
            <StatItem
              icon={<Zap className="w-5 h-5 text-purple-400" />}
              label="Best Speed"
              value={`${stats.bestSpeed}/hr`}
            />
            <StatItem
              icon={<Award className="w-5 h-5 text-yellow-400" />}
              label="Best Streak"
              value={stats.streak.toString()}
            />
          </div>

          {stats.messagesPerHour >= 300 && (
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <p className="text-yellow-400 font-medium">
                  Achievement Unlocked: Speed Demon!
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                You've reached the impressive speed of {stats.messagesPerHour} messages per hour!
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                     transition-colors"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-gray-700/50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <span className="text-xl font-bold text-white">{value}</span>
  </div>
);

export default SessionReport;