import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';

const MessageVariants: React.FC = () => {
  const { messageVariants, updateMessageVariant } = useCampaignStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Message Templates</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['A', 'B', 'C'].map((variant) => (
          <div
            key={variant}
            className="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Template {variant}</span>
            </div>
            
            <textarea
              value={messageVariants?.[`variant${variant}`] || ''}
              onChange={(e) => updateMessageVariant(`variant${variant}`, e.target.value)}
              className="w-full h-24 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your message..."
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageVariants;