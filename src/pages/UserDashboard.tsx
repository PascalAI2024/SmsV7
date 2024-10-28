import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../components';
import MainDashboard from '../features/dashboard/MainDashboard';
import KioskOverlay from '../components/kiosk/KioskOverlay';
import { useKioskStore } from '../store/kioskStore';

const UserDashboard: React.FC = () => {
  const { isKioskMode } = useKioskStore();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<MainDashboard />} />
        </Routes>
      </main>
      {isKioskMode && <KioskOverlay />}
    </div>
  );
};

export default UserDashboard;