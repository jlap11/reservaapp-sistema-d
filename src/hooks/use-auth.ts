import { useKV } from './use-kv';
import { User, AuthState } from '@/types';

export function useAuth() {
  const [authState, setAuthState] = useKV<AuthState>('auth-state', {
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: '+1234567890'
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    setAuthState({ user: mockUser, token: mockToken, isAuthenticated: true });
    return { success: true, user: mockUser };
  };

  const register = async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    setAuthState({ user: mockUser, token: mockToken, isAuthenticated: true });
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setAuthState({ user: null, token: null, isAuthenticated: false });
  };

  const updateProfile = (updates: Partial<User>) => {
    setAuthState(current => {
      const base = current ?? { user: null, token: null, isAuthenticated: false };
      if (!base.user) return base;
      return { ...base, user: { ...base.user, ...updates } };
    });
  };

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };
}