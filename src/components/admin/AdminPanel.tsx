import React, { useState } from 'react';
import { Settings, X, Save, Key, BarChart, Users, MessageSquare, Shield } from 'lucide-react';
import ProviderConfig from './ProviderConfig';
import CampaignSettings from './CampaignSettings';
import ContactManagement from './ContactManagement';
import MessageTemplates from './MessageTemplates';
import Analytics from '../Analytics';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

type Tab = 'provider' | 'campaign' | 'contacts' | 'templates' | 'analytics';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('provider');

  const tabs = [
    { id: 'provider', label: 'SMS Provider', icon: <Shield className="w-4 h-4" /> },
    { id: 'campaign', label: 'Campaign Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'contacts', label: 'Contact Management', icon: <Users className="w-4 h-4" /> },
    { id: 'templates', label: 'Message Templates', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Advanced Analytics', icon: <BarChart className="w-4 h-4" /> },
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white 
                 hover:bg-gray-800 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5" />
        Admin
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="absolute inset-8 bg-gray-900 rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Admin Dashboard
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="border-b border-gray-800">
                <nav className="flex gap-1 p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700/50'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
                {activeTab === 'provider' && <ProviderConfig />}
                {activeTab === 'campaign' && <CampaignSettings />}
                {activeTab === 'contacts' && <ContactManagement />}
                {activeTab === 'templates' && <MessageTemplates />}
                {activeTab === 'analytics' && <Analytics showInAdmin />}
              </div>

              <div className="flex justify-end gap-2 p-4 border-t border-gray-800">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Settings saved successfully');
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                           text-white rounded-lg"
                >
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;