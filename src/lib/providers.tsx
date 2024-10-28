import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '../store/themeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

const ErrorFallback = ({ error }: { error: Error }) => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={`flex min-h-screen items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h1>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                   transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export function Providers({ children }: ProvidersProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <Toaster 
          position="top-right"
          toastOptions={{
            className: isDarkMode ? 'dark' : '',
            duration: 3000,
            style: {
              background: isDarkMode ? '#1f2937' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#1f2937',
              border: '1px solid',
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}