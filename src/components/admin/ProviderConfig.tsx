import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import toast from 'react-hot-toast';

const providers = [
  { id: 'skyetel', name: 'Skyetel' },
  { id: 'textus', name: 'TextUs' },
  { id: 'commio', name: 'Commio' },
];

const ProviderConfig: React.FC = () => {
  const { provider, updateProvider } = useCampaignStore();
  const [apiKey, setApiKey] = useState(provider?.apiKey || '');

  const handleSave = () => {
    if (!apiKey) {
      toast.error('API Key is required');
      return;
    }
    updateProvider({ ...provider, apiKey });
    toast.success('API Key saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-white">SMS Provider Configuration</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Provider
          </label>
          <select
            value={provider?.id || 'skyetel'}
            onChange={(e) => updateProvider({ ...provider, id: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                     text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {providers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                     text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your API key"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Your API key is securely stored and encrypted. Never share your API key with others.
      </p>
    </div>
  );
};

export default ProviderConfig;