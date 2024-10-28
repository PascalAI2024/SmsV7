import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';

interface Props {
  showInAdmin?: boolean;
}

const Analytics: React.FC<Props> = ({ showInAdmin }) => {
  const { campaignStats } = useCampaignStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-medium text-white">Campaign Analytics</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-medium text-white">Message Status</h4>
          </div>
          <div className="space-y-4">
            <StatusBar 
              label="Sent" 
              value={campaignStats?.sent || 0} 
              total={campaignStats?.totalContacts || 0} 
              color="bg-green-500" 
            />
            <StatusBar 
              label="Failed" 
              value={campaignStats?.failed || 0} 
              total={campaignStats?.totalContacts || 0} 
              color="bg-red-500" 
            />
            <StatusBar 
              label="Pending" 
              value={campaignStats?.pending || 0} 
              total={campaignStats?.totalContacts || 0} 
              color="bg-yellow-500" 
            />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-medium text-white">Performance</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Messages/Hour</span>
              <span className="text-white">{campaignStats?.messagesPerHour || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-white">
                {campaignStats?.sent > 0
                  ? `${((campaignStats.sent / (campaignStats.sent + campaignStats.failed)) * 100).toFixed(1)}%`
                  : '0%'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Campaign Progress</span>
              <span className="text-white">
                {campaignStats?.totalContacts > 0
                  ? `${((campaignStats.sent / campaignStats.totalContacts) * 100).toFixed(1)}%`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{
  label: string;
  value: number;
  total: number;
  color: string;
}> = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Analytics;