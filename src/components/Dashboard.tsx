import React from 'react';
import { Clock, MessageSquare, Users, AlertCircle, Check } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';

/**
 * Main dashboard component displaying campaign statistics
 */
const Dashboard: React.FC = () => {
  const { campaignStats } = useCampaignStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Session Time */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Session Time</p>
            <h2 className="text-2xl font-bold text-white">{campaignStats.sessionTime}</h2>
          </div>
          <Clock className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Messages Sent */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Messages Sent</p>
            <h2 className="text-2xl font-bold text-white">{campaignStats.sent}</h2>
          </div>
          <MessageSquare className="w-8 h-8 text-green-400" />
        </div>
      </div>

      {/* Messages/Hour */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Messages/Hour</p>
            <h2 className="text-2xl font-bold text-white">{campaignStats.messagesPerHour}</h2>
          </div>
          <Users className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Status */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Status</p>
            <h2 className="text-2xl font-bold text-white">Ready</h2>
          </div>
          <Check className="w-8 h-8 text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;