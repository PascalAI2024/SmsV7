import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  isDevelopment: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  loginWithRole: (role: 'admin' | 'sender') => Promise<void>;
}

// Development mode credentials
const devUsers = {
  admin: {
    id: 'admin-dev',
    email: 'admin@stuckontraffic.com',
    name: 'Admin User',
    role: 'admin' as const,
    active: true,
    createdAt: new Date().toISOString(),
  },
  sender: {
    id: 'sender-dev',
    email: 'sender@stuckontraffic.com',
    name: 'Message Sender',
    role: 'sender' as const,
    active: true,
    createdAt: new Date().toISOString(),
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      isDevelopment: process.env.NODE_ENV === 'development',

      login: async (credentials) => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In development, auto-login based on email
          if (process.env.NODE_ENV === 'development') {
            const role = credentials.email.includes('admin') ? 'admin' : 'sender';
            const user = devUsers[role];
            set({
              user,
              token: 'dev-token',
              isAuthenticated: true,
              loading: false,
            });
            return;
          }

          // Production login logic would go here
          throw new Error('Production login not implemented');
          
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      loginWithRole: async (role) => {
        if (process.env.NODE_ENV !== 'development') {
          throw new Error('Development mode login only available in development');
        }

        set({ loading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = devUsers[role];
        set({
          user,
          token: 'dev-token',
          isAuthenticated: true,
          loading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage',
    }
  )
);