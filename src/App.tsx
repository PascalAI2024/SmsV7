import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { useThemeStore } from './store/themeStore';
import { Background } from './components';
import ProtectedRoute from './components/auth/ProtectedRoute';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="text-center">
      <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
      <p className="text-gray-400">{error.message}</p>
    </div>
  </div>
);

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Background />
        <div className="relative z-10">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user/*" element={
                <ProtectedRoute requiredRole="sender">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: isDarkMode ? 'dark' : '',
            style: {
              background: isDarkMode ? '#1f2937' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#1f2937',
              border: '1px solid',
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            },
          }} 
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;