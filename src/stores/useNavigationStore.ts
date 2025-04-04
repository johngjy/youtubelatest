import { create } from 'zustand'
import { IconName } from '../components/navigation/TabIcon'

type NavigationScreen = 'home' | 'video' | 'dubspace' | 'account'

interface NavigationState {
  // 当前屏幕
  currentScreen: NavigationScreen
  // 当前激活的标签
  activeTab: IconName
  // 导航历史
  history: NavigationScreen[]
  // 方法
  setScreen: (screen: NavigationScreen) => void
  setActiveTab: (tab: IconName) => void
  goBack: () => void
}

const useNavigationStore = create<NavigationState>((set) => ({
  currentScreen: 'home',
  activeTab: 'home',
  history: ['home'],

  setScreen: (screen) => 
    set((state) => ({
      currentScreen: screen,
      history: [...state.history, screen],
    })),

  setActiveTab: (tab) =>
    set({ activeTab: tab }),

  goBack: () =>
    set((state) => {
      const newHistory = [...state.history]
      newHistory.pop() // 移除当前页面
      const previousScreen = newHistory[newHistory.length - 1] || 'home'
      return {
        currentScreen: previousScreen,
        history: newHistory,
      }
    }),
}))

export default useNavigationStore 