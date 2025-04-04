import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Filters {
  language: string
  category: string
  sortBy: 'date' | 'popularity' | 'duration'
  searchQuery: string
}

interface DubLibraryState {
  filters: Filters
  defaultDubLanguage: string
  isAIAssistantOpen: boolean
  setFilters: (filters: Partial<Filters>) => void
  setDefaultDubLanguage: (language: string) => void
  toggleAIAssistant: () => void
}

export const useDubLibraryStore = create<DubLibraryState>()(
  persist(
    (set) => ({
      filters: {
        language: 'en',
        category: 'all',
        sortBy: 'date',
        searchQuery: '',
      },
      defaultDubLanguage: 'en',
      isAIAssistantOpen: false,

      setFilters: (newFilters) => 
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),

      setDefaultDubLanguage: (language) =>
        set({ defaultDubLanguage: language }),

      toggleAIAssistant: () =>
        set((state) => ({ isAIAssistantOpen: !state.isAIAssistantOpen })),
    }),
    {
      name: 'dub-library-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 