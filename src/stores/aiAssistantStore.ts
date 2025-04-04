import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AIAssistantState {
  isOpen: boolean
  currentVideoId: string | null
  selectedLanguage: string
  voiceEnabled: boolean
  autoTranslate: boolean
  history: {
    videoId: string
    question: string
    answer: string
    timestamp: number
  }[]
  setIsOpen: (isOpen: boolean) => void
  setCurrentVideo: (videoId: string | null) => void
  setSelectedLanguage: (language: string) => void
  setVoiceEnabled: (enabled: boolean) => void
  setAutoTranslate: (enabled: boolean) => void
  addToHistory: (entry: Omit<AIAssistantState['history'][0], 'timestamp'>) => void
  clearHistory: () => void
}

export const useAIAssistantStore = create<AIAssistantState>()(
  persist(
    (set) => ({
      isOpen: false,
      currentVideoId: null,
      selectedLanguage: 'en',
      voiceEnabled: true,
      autoTranslate: false,
      history: [],

      setIsOpen: (isOpen) => set({ isOpen }),
      
      setCurrentVideo: (videoId) => set({ currentVideoId: videoId }),
      
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      
      setAutoTranslate: (enabled) => set({ autoTranslate: enabled }),
      
      addToHistory: (entry) => set((state) => ({
        history: [
          ...state.history,
          { ...entry, timestamp: Date.now() }
        ].slice(-50) // 只保留最近的50条记录
      })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ai-assistant-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 