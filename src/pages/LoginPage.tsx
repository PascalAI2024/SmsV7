import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Background from '../components/Background';

const LoginPage: React.FC = () => {
  const { isAuthenticated, user, loginWithRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const autoLogin = async () => {
      const role = location.pathname.includes('admin') ? 'admin' : 'sender';
      await loginWithRole(role);
      navigate(role === 'admin' ? '/admin' : '/user');
    };

    if (!isAuthenticated) {
      autoLogin();
    }
  }, [isAuthenticated, location.pathname, loginWithRole, navigate]);

  if (isAuthenticated && user) {
    navigate(user.role === 'admin' ? '/admin' : '/user');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Background />
      <div className="relative z-10">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Logging in...</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;