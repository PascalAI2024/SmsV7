import React from 'react';
import { Cog, Database, Shield, Download, Upload, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SystemSettings: React.FC = () => {
  const handleExportData = () => {
    toast.success('Data exported successfully');
  };

  const handleImportData = () => {
    toast.success('Data imported successfully');
  };

  const handleClearData = () => {
    toast.success('Data cleared successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Cog className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-medium text-white">System Settings</h3>
      </div>

      <div className="grid gap-6">
        <section className="space-y-4">
          <h4 className="text-sm font-medium text-gray-300">Data Management</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={handleExportData}
              className="flex items-center gap-2 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 
                       transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Export Data</p>
                <p className="text-xs text-gray-400">Download all campaign data</p>
              </div>
            </motion.button>

            <motion.button
              onClick={handleImportData}
              className="flex items-center gap-2 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 
                       transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Import Data</p>
                <p className="text-xs text-gray-400">Restore from backup</p>
              </div>
            </motion.button>

            <motion.button
              onClick={handleClearData}
              className="flex items-center gap-2 p-4 bg-gray-700 rounded-lg hover:bg-red-900/50 
                       transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Clear Data</p>
                <p className="text-xs text-gray-400">Reset all settings</p>
              </div>
            </motion.button>
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-sm font-medium text-gray-300">Security Settings</h4>
          
          <div className="grid gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-medium text-white">API Rate Limiting</p>
                </div>
                <motion.button
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Configure
                </motion.button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Max requests per minute</span>
                  <span className="text-white">100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Burst limit</span>
                  <span className="text-white">150</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-medium text-white">Data Retention</p>
                </div>
                <motion.button
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Configure
                </motion.button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Campaign history</span>
                  <span className="text-white">30 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Analytics data</span>
                  <span className="text-white">90 days</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemSettings;