import React, { useState } from 'react';
import { MessageSquare, TrendingUp, BarChart2, RefreshCw } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';

const MessageTemplates: React.FC = () => {
  const { messageVariants, updateMessageVariant, variantStats } = useCampaignStore();
  const [activeTab, setActiveTab] = useState<'edit' | 'performance'>('edit');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Message Templates</h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'edit' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Edit Variants
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'performance' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Performance
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <div className="grid gap-4">
          {['A', 'B', 'C'].map((variant) => (
            <div key={variant} className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Template {variant}
                </label>
                {variantStats?.[`variant${variant}`] && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">
                      {((variantStats[`variant${variant}`].success / 
                         variantStats[`variant${variant}`].sent) * 100).toFixed(1)}% Success
                    </span>
                  </div>
                )}
              </div>
              <textarea
                value={messageVariants?.[`variant${variant}`] || ''}
                onChange={(e) => updateMessageVariant(`variant${variant}`, e.target.value)}
                className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter template ${variant} content`}
              />
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Variables:</h4>
                <div className="flex flex-wrap gap-2">
                  {['{{name}}', '{{phone}}', '{{date}}'].map((variable) => (
                    <button
                      key={variable}
                      onClick={() => {
                        const textarea = document.querySelector(`textarea[placeholder="Enter template ${variant} content"]`);
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const current = messageVariants?.[`variant${variant}`] || '';
                          const newText = current.substring(0, start) + variable + current.substring(end);
                          updateMessageVariant(`variant${variant}`, newText);
                        }
                      }}
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['A', 'B', 'C'].map((variant) => {
              const stats = variantStats?.[`variant${variant}`] || { sent: 0, success: 0, rate: 0 };
              const successRate = stats.sent > 0 ? (stats.success / stats.sent) * 100 : 0;
              
              return (
                <div key={variant} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-white">Variant {variant}</h4>
                    <span className={`text-lg font-bold ${
                      successRate >= 70 ? 'text-green-400' :
                      successRate >= 40 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {successRate.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Messages Sent</span>
                        <span>{stats.sent}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600"
                          style={{ width: `${(stats.sent / Math.max(...Object.values(variantStats || {}).map(s => s.sent))) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Successful</span>
                        <span>{stats.success}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600"
                          style={{ width: `${(stats.success / stats.sent) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Response Rate</span>
                        <span>{stats.rate.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600"
                          style={{ width: `${stats.rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTemplates;