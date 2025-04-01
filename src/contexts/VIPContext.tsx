import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

// VIP 会员级别枚举
export enum VIPLevel {
  NONE = 'none',
  BASIC = 'basic',
  PREMIUM = 'premium',
}

// 会员状态接口
export interface VIPState {
  level: VIPLevel;
  expiryDate: string | null; // ISO 日期字符串
  autoRenew: boolean;
  subscriptionId: string | null;
}

// VIP 上下文状态类型
interface VIPContextState {
  vipState: VIPState;
  isVIP: boolean;
  remainingDays: number;
  loading: boolean;
  subscribe: (level: VIPLevel) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  toggleAutoRenew: () => Promise<void>;
}

// 创建上下文
const VIPContext = createContext<VIPContextState | undefined>(undefined);

// Provider 属性类型
interface VIPProviderProps {
  children: ReactNode;
}

// 辅助函数：计算剩余天数
const calculateRemainingDays = (expiryDateStr: string | null): number => {
  if (!expiryDateStr) return 0;

  const expiryDate = new Date(expiryDateStr);
  const today = new Date();

  // 重置时间部分，以便纯日期比较
  expiryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

// 初始 VIP 状态
const initialVIPState: VIPState = {
  level: VIPLevel.NONE,
  expiryDate: null,
  autoRenew: false,
  subscriptionId: null,
};

// VIP Provider 组件
export const VIPProvider: React.FC<VIPProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [vipState, setVipState] = useState<VIPState>(initialVIPState);
  const [loading, setLoading] = useState(true);

  // 计算是否有效会员
  const isVIP =
    vipState.level !== VIPLevel.NONE &&
    vipState.expiryDate !== null &&
    calculateRemainingDays(vipState.expiryDate) > 0;

  // 计算会员剩余天数
  const remainingDays = calculateRemainingDays(vipState.expiryDate);

  // 从存储加载 VIP 状态
  useEffect(() => {
    const loadVIPState = async () => {
      if (!user) {
        setVipState(initialVIPState);
        setLoading(false);
        return;
      }

      try {
        const storedState = await AsyncStorage.getItem(`vip_${user.id}`);
        if (storedState) {
          const parsedState = JSON.parse(storedState) as VIPState;
          setVipState(parsedState);
        }
      } catch (error) {
        console.error('Error loading VIP state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVIPState();
  }, [user]);

  // 保存 VIP 状态到存储
  const saveVIPState = async (newState: VIPState) => {
    if (!user) return;

    try {
      await AsyncStorage.setItem(`vip_${user.id}`, JSON.stringify(newState));
      setVipState(newState);
    } catch (error) {
      console.error('Error saving VIP state:', error);
      throw error;
    }
  };

  // 上下文值
  const contextValue: VIPContextState = {
    vipState,
    isVIP,
    remainingDays,
    loading,

    // 订阅会员
    subscribe: async (level: VIPLevel) => {
      if (!user) throw new Error('User not authenticated');

      // 这里应该有实际的支付处理和服务器通信
      // 为演示目的使用模拟数据

      // 创建一个30天后到期的日期
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      const newState: VIPState = {
        level,
        expiryDate: expiryDate.toISOString(),
        autoRenew: true,
        subscriptionId: `sub_${Date.now()}`, // 模拟订阅ID
      };

      await saveVIPState(newState);
    },

    // 取消订阅
    cancelSubscription: async () => {
      if (!user || !vipState.subscriptionId) {
        throw new Error('No active subscription');
      }

      // 实际实现中这里应该调用取消订阅的 API

      const newState = {
        ...vipState,
        autoRenew: false,
      };

      await saveVIPState(newState);
    },

    // 切换自动续订状态
    toggleAutoRenew: async () => {
      if (!user || !isVIP) {
        throw new Error('No active subscription');
      }

      const newState = {
        ...vipState,
        autoRenew: !vipState.autoRenew,
      };

      await saveVIPState(newState);
    },
  };

  return <VIPContext.Provider value={contextValue}>{children}</VIPContext.Provider>;
};

// 使用 VIP 上下文的 Hook
export const useVIP = (): VIPContextState => {
  const context = useContext(VIPContext);
  if (context === undefined) {
    throw new Error('useVIP must be used within a VIPProvider');
  }
  return context;
};

export default VIPContext;
