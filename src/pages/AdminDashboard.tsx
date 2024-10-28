import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Settings, Users, MessageSquare, BarChart2, 
  Bell, ArrowLeft 
} from 'lucide-react';
import ProviderConfig from '../components/admin/ProviderConfig';
import CampaignSettings from '../components/admin/CampaignSettings';
import ContactManagement from '../components/admin/ContactManagement';
import MessageTemplates from '../components/admin/MessageTemplates';
import Analytics from '../components/Analytics';
import Notifications from '../components/admin/Notifications';
import SystemSettings from '../components/admin/SystemSettings';

const AdminDashboard: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: 'provider', label: 'SMS Provider', icon: Shield },
    { path: 'campaign', label: 'Campaign Settings', icon: Settings },
    { path: 'contacts', label: 'Contact Management', icon: Users },
    { path: 'templates', label: 'Message Templates', icon: MessageSquare },
    { path: 'analytics', label: 'Analytics', icon: BarChart2 },
    { path: 'notifications', label: 'Notifications', icon: Bell },
    { path: 'system', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Landing
            </Link>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <nav className="w-64 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname.includes(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <main className="flex-1 bg-gray-800 rounded-lg p-6">
            <Routes>
              <Route path="/" element={<Navigate to="provider" replace />} />
              <Route path="provider" element={<ProviderConfig />} />
              <Route path="campaign" element={<CampaignSettings />} />
              <Route path="contacts" element={<ContactManagement />} />
              <Route path="templates" element={<MessageTemplates />} />
              <Route path="analytics" element={<Analytics showInAdmin />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="system" element={<SystemSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;