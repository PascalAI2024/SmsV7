import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageCircle } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';

const CampaignSettings: React.FC = () => {
  const { duration, messagesPerHour, setDuration, setMessagesPerHour } = useCampaignStore();

  const durationOptions = [
    { value: 30, label: '30 Minutes' },
    { value: 60, label: '1 Hour' },
    { value: 120, label: '2 Hours' },
    { value: 240, label: '4 Hours' },
  ];

  const rateOptions = [
    { value: 30, label: '30/hour' },
    { value: 45, label: '45/hour' },
    { value: 60, label: '60/hour' },
    { value: 75, label: '75/hour' },
  ];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Campaign Settings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <Clock className="w-5 h-5" />
            Session Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <MessageCircle className="w-5 h-5" />
            Messages per Hour
          </label>
          <select
            value={messagesPerHour}
            onChange={(e) => setMessagesPerHour(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {rateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-2">
            Campaign Summary
          </h3>
          <p className="text-blue-600 dark:text-blue-300">
            Will send approximately{' '}
            <span className="font-bold">
              {Math.floor((messagesPerHour * duration) / 60)}
            </span>{' '}
            messages over{' '}
            <span className="font-bold">{duration}</span> minutes.
          </p>
          <p className="text-sm text-blue-500 dark:text-blue-400 mt-2">
            That's about {Math.round(60 / messagesPerHour)} seconds between each message,
            allowing time for proper personalization and review.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignSettings;