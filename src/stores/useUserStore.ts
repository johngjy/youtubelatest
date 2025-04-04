import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@supabase/supabase-js'

interface UserState {
  // 用户基础信息
  isVIP: boolean
  vipExpiryDate: string | null
  coinBalance: number
  aiUsageCount: number
  aiUsageLimit: number
  preferences: {
    language: string
    theme: 'light' | 'dark'
    autoTranslate: boolean
    defaultDubLanguage: string
  }

  // 操作方法
  setVIPStatus: (status: boolean, expiryDate: string | null) => void
  updateCoinBalance: (amount: number) => void
  incrementAIUsage: () => void
  resetAIUsage: () => void
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void
  
  // 与 React Query 同步
  syncWithQuery: (userData: {
    is_vip: boolean
    vip_expiry?: string | null
    coin_balance: number
    ai_usage: number
    preferences?: UserState['preferences']
  }) => void
}

type UserPersist = Omit<UserState, 
  'setVIPStatus' | 'updateCoinBalance' | 'incrementAIUsage' | 
  'resetAIUsage' | 'updatePreferences' | 'syncWithQuery'
>

const useUserStore = create<UserState>()(
  persist<UserState, UserPersist>(
    (set) => ({
      // 初始状态
      isVIP: false,
      vipExpiryDate: null,
      coinBalance: 0,
      aiUsageCount: 0,
      aiUsageLimit: 10, // 每日免费使用次数
      preferences: {
        language: 'en',
        theme: 'light',
        autoTranslate: false,
        defaultDubLanguage: 'en',
      },

      // 状态更新方法
      setVIPStatus: (status: boolean, expiryDate: string | null) => 
        set({ isVIP: status, vipExpiryDate: expiryDate }),

      updateCoinBalance: (amount: number) => 
        set((state: UserState) => ({ coinBalance: state.coinBalance + amount })),

      incrementAIUsage: () =>
        set((state: UserState) => ({ aiUsageCount: state.aiUsageCount + 1 })),

      resetAIUsage: () =>
        set({ aiUsageCount: 0 }),

      updatePreferences: (newPreferences: Partial<UserState['preferences']>) =>
        set((state: UserState) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      // 同步远程数据
      syncWithQuery: (userData: {
        is_vip: boolean
        vip_expiry?: string | null
        coin_balance: number
        ai_usage: number
        preferences?: UserState['preferences']
      }) =>
        set({
          isVIP: userData.is_vip,
          vipExpiryDate: userData.vip_expiry || null,
          coinBalance: userData.coin_balance,
          aiUsageCount: userData.ai_usage,
          preferences: userData.preferences || useUserStore.getState().preferences,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { setVIPStatus, updateCoinBalance, incrementAIUsage, resetAIUsage, updatePreferences, syncWithQuery, ...rest } = state
        return rest
      },
    }
  )
)

export default useUserStore 