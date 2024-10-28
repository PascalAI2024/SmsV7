export type UserRole = 'admin' | 'sender';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  lastLogin?: string;
  settings?: {
    theme?: 'dark' | 'light';
    notifications?: boolean;
    soundEffects?: boolean;
  };
}

export interface UserSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  role: UserRole;
  password: string;
}