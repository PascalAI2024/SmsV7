import React, { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Phone, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const providers = [
  { id: 'skyetel', name: 'Skyetel' },
  { id: 'textus', name: 'TextUs' },
  { id: 'commio', name: 'Commio' },
];

const ProviderConfig: React.FC = () => {
  const { sessionConfig, updateSessionConfig } = useCampaignStore();
  const [apiKey, setApiKey] = useState(sessionConfig.provider.apiKey || '');

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      updateSessionConfig({
        provider: { ...provider, apiKey },
      });
      toast.success(`Provider updated to ${provider.name}`);
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    updateSessionConfig({
      provider: { ...sessionConfig.provider, apiKey: e.target.value },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Phone className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-medium text-white">SMS Provider Configuration</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Provider
          </label>
          <select
            value={sessionConfig.provider.id}
            onChange={(e) => handleProviderChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                       pr-10"
              placeholder="Enter API key"
            />
            <Shield className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-2">
        Your API key is securely stored and encrypted. Never share your API key with others.
      </p>
    </div>
  );
};

export default ProviderConfig;