import React, { useState } from 'react';
import { Settings, X, Save, Key, BarChart, Users, MessageSquare, Shield } from 'lucide-react';
import ProviderConfig from './ProviderConfig';
import CampaignSettings from './admin/CampaignSettings';
import ContactManagement from './admin/ContactManagement';
import MessageTemplates from './admin/MessageTemplates';
import Analytics from './Analytics';
import { useCampaignStore } from '../store/campaignStore';
import toast from 'react-hot-toast';

type Tab = 'provider' | 'campaign' | 'contacts' | 'templates' | 'analytics';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('provider');
  const { sessionConfig, updateSessionConfig } = useCampaignStore();

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
    setIsOpen(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'provider', label: 'SMS Provider', icon: <Shield className="w-4 h-4" /> },
    { id: 'campaign', label: 'Campaign Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'contacts', label: 'Contact Management', icon: <Users className="w-4 h-4" /> },
    { id: 'templates', label: 'Message Templates', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Advanced Analytics', icon: <BarChart className="w-4 h-4" /> },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center p-2 hover:bg-gray-800 rounded-lg"
      >
        <Settings className="w-5 h-5 text-gray-400" />
        <span className="ml-2 text-gray-400">Admin</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Key className="w-5 h-5" />
                Admin Dashboard
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="border-b border-gray-700">
              <nav className="flex space-x-2 p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:bg-gray-700'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {activeTab === 'provider' && <ProviderConfig />}
              {activeTab === 'campaign' && <CampaignSettings />}
              {activeTab === 'contacts' && <ContactManagement />}
              {activeTab === 'templates' && <MessageTemplates />}
              {activeTab === 'analytics' && <Analytics showInAdmin={true} />}
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;