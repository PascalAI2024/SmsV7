import React from 'react';
import { Clock, MessageSquare, Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import StatsCard from '../../components/StatsCard';

const StatsCards: React.FC = () => {
  const { campaignStats } = useCampaignStore();

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      <StatsCard
        title="Session Time"
        value={campaignStats.sessionTime}
        Icon={Clock}
        iconColor="text-blue-400"
      />
      <StatsCard
        title="Messages Sent"
        value={campaignStats.sent}
        Icon={MessageSquare}
        iconColor="text-green-400"
        highlight={campaignStats.sent > 0}
      />
      <StatsCard
        title="Messages/Hour"
        value={campaignStats.messagesPerHour}
        Icon={Users}
        iconColor="text-purple-400"
        highlight={campaignStats.messagesPerHour >= 300}
      />
      <StatsCard
        title="Status"
        value="Ready"
        Icon={Check}
        iconColor="text-green-400"
      />
    </motion.div>
  );
};

export default StatsCards;