import React from 'react';
import { useCampaignStore } from '../store/campaignStore';

const ContactStats: React.FC = () => {
  const { campaignStats } = useCampaignStore();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Total Contacts</span>
        <span>{campaignStats.totalContacts}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Pending</span>
        <span>{campaignStats.pending}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Sent</span>
        <span>{campaignStats.sent}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Failed</span>
        <span>{campaignStats.failed}</span>
      </div>
    </div>
  );
};

export default ContactStats;