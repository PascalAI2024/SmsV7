import React from 'react';
import { Bell, BellOff, Settings, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Notifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-medium text-white">Notification Settings</h3>
      </div>

      <div className="grid gap-4">
        <NotificationSetting
          title="Campaign Completion"
          description="Get notified when your campaign finishes"
          icon={Mail}
          defaultEnabled={true}
        />
        
        <NotificationSetting
          title="Rate Limit Warnings"
          description="Receive alerts when approaching message limits"
          icon={BellOff}
          defaultEnabled={true}
        />
        
        <NotificationSetting
          title="Error Notifications"
          description="Get notified about sending failures"
          icon={Settings}
          defaultEnabled={true}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300 mb-4">Notification Channels</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-gray-400">Receive updates via email</p>
              </div>
            </div>
            <motion.button
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configure
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">Browser Notifications</p>
                <p className="text-xs text-gray-400">Get desktop notifications</p>
              </div>
            </div>
            <motion.button
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configure
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSetting: React.FC<{
  title: string;
  description: string;
  icon: React.FC<any>;
  defaultEnabled: boolean;
}> = ({ title, description, icon: Icon, defaultEnabled }) => {
  const [enabled, setEnabled] = React.useState(defaultEnabled);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-600 rounded-lg">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <motion.button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-blue-600' : 'bg-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          animate={{ x: enabled ? 12 : 2 }}
        />
      </motion.button>
    </div>
  );
};

export default Notifications;