import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 用户类型定义
export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}

// 认证上下文状态类型
interface AuthContextState {
  user: User | null;
  isLoading: boolean;
  isSignout: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

// 创建上下文
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// 认证提供者属性类型
interface AuthProviderProps {
  children: ReactNode;
}

// 模拟的 API 函数，实际实现中替换为真实 API 调用
const mockSignIn = async (email: string, password: string): Promise<User> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 模拟验证
  if (password.length < 6) {
    throw new Error('Invalid credentials');
  }

  // 返回模拟用户数据
  return {
    id: '1',
    email,
    username: email.split('@')[0],
    isEmailVerified: true,
  };
};

// Auth Provider 组件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
    isSignout: boolean;
  }>({
    user: null,
    isLoading: true,
    isSignout: false,
  });

  // 启动时检查保存的登录状态
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // 从存储中加载用户数据
        const userJSON = await AsyncStorage.getItem('user');
        if (userJSON) {
          const user = JSON.parse(userJSON);
          setState((prev) => ({ ...prev, user, isLoading: false }));
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (e) {
        console.error('Failed to load auth state:', e);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    bootstrapAsync();
  }, []);

  // 认证操作
  const authContext: AuthContextState = {
    user: state.user,
    isLoading: state.isLoading,
    isSignout: state.isSignout,
    isAuthenticated: !!state.user,

    signIn: async (email, password) => {
      try {
        // 调用登录 API
        const user = await mockSignIn(email, password);

        // 存储用户信息
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // 更新状态
        setState((prev) => ({
          ...prev,
          user,
          isSignout: false,
        }));
      } catch (error) {
        throw error;
      }
    },

    signUp: async (email, password, username) => {
      try {
        // 这里实现注册逻辑，现在使用相同的 mock 函数
        const user = await mockSignIn(email, password);
        user.username = username;

        // 存储用户信息
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // 更新状态
        setState((prev) => ({
          ...prev,
          user,
          isSignout: false,
        }));
      } catch (error) {
        throw error;
      }
    },

    signOut: async () => {
      // 清除存储的用户信息
      await AsyncStorage.removeItem('user');

      // 更新状态
      setState((prev) => ({
        ...prev,
        user: null,
        isSignout: true,
      }));
    },

    updateUserProfile: async (userData) => {
      if (!state.user) {
        throw new Error('User not authenticated');
      }

      // 更新用户数据
      const updatedUser = { ...state.user, ...userData };

      // 保存到存储
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      // 更新状态
      setState((prev) => ({ ...prev, user: updatedUser }));
    },
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

// 使用认证上下文的 Hook
export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
