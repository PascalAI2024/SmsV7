import React from 'react';
import { ArrowLeft, Shield, Settings, Users, MessageSquare, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import ProviderConfig from '../../components/admin/ProviderConfig';
import CampaignSettings from '../../components/admin/CampaignSettings';
import ContactManagement from '../../components/admin/ContactManagement';
import MessageTemplates from '../../components/admin/MessageTemplates';
import Analytics from '../../components/Analytics';

type Tab = 'provider' | 'campaign' | 'contacts' | 'templates' | 'analytics';

interface Props {
  onBack: () => void;
}

const AdminDashboard: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = React.useState<Tab>('provider');

  const tabs = [
    { id: 'provider', label: 'SMS Provider', icon: <Shield className="w-4 h-4" /> },
    { id: 'campaign', label: 'Campaign Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'contacts', label: 'Contact Management', icon: <Users className="w-4 h-4" /> },
    { id: 'templates', label: 'Message Templates', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Advanced Analytics', icon: <BarChart className="w-4 h-4" /> },
  ];

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      </div>

      <div className="border-b border-gray-700">
        <nav className="flex space-x-2 p-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'provider' && <ProviderConfig />}
        {activeTab === 'campaign' && <CampaignSettings />}
        {activeTab === 'contacts' && <ContactManagement />}
        {activeTab === 'templates' && <MessageTemplates />}
        {activeTab === 'analytics' && <Analytics showInAdmin />}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;