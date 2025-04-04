import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type SortOrder = 'latest' | 'oldest' | 'popular' | 'title'
export type FilterLanguage = string | 'all'
export type FilterCategory = string | 'all'
export type FilterStatus = 'all' | 'completed' | 'in-progress' | 'not-started'

interface DubSpaceState {
  // 筛选和排序状态
  filters: {
    language: FilterLanguage
    category: FilterCategory
    status: FilterStatus
    searchQuery: string
  }
  sortOrder: SortOrder
  viewMode: 'grid' | 'list'
  selectedItems: string[] // 选中项目的 ID

  // 分页状态
  page: number
  perPage: number

  // 操作方法
  setFilters: (filters: Partial<DubSpaceState['filters']>) => void
  setSortOrder: (order: SortOrder) => void
  setViewMode: (mode: 'grid' | 'list') => void
  toggleItemSelection: (itemId: string) => void
  clearSelection: () => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  resetFilters: () => void
}

type DubSpacePersist = Omit<DubSpaceState, 
  'setFilters' | 'setSortOrder' | 'setViewMode' | 'toggleItemSelection' | 
  'clearSelection' | 'setPage' | 'setPerPage' | 'resetFilters'
>

const initialState: DubSpacePersist = {
  filters: {
    language: 'all' as FilterLanguage,
    category: 'all' as FilterCategory,
    status: 'all' as FilterStatus,
    searchQuery: '',
  },
  sortOrder: 'latest',
  viewMode: 'grid',
  selectedItems: [],
  page: 1,
  perPage: 20,
}

const useDubSpaceStore = create<DubSpaceState>()(
  persist<DubSpaceState, DubSpacePersist>(
    (set) => ({
      ...initialState,

      setFilters: (newFilters: Partial<DubSpaceState['filters']>) =>
        set((state: DubSpaceState) => ({
          filters: { ...state.filters, ...newFilters },
          page: 1, // 重置页码
        })),

      setSortOrder: (order: SortOrder) =>
        set({ sortOrder: order, page: 1 }),

      setViewMode: (mode: 'grid' | 'list') =>
        set({ viewMode: mode }),

      toggleItemSelection: (itemId: string) =>
        set((state: DubSpaceState) => ({
          selectedItems: state.selectedItems.includes(itemId)
            ? state.selectedItems.filter((id: string) => id !== itemId)
            : [...state.selectedItems, itemId],
        })),

      clearSelection: () =>
        set({ selectedItems: [] }),

      setPage: (page: number) =>
        set({ page }),

      setPerPage: (perPage: number) =>
        set({ perPage, page: 1 }),

      resetFilters: () =>
        set({ ...initialState, viewMode: useDubSpaceStore.getState().viewMode }),
    }),
    {
      name: 'dub-space-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { setFilters, setSortOrder, setViewMode, toggleItemSelection, clearSelection, setPage, setPerPage, resetFilters, ...rest } = state
        return rest
      },
    }
  )
)

export default useDubSpaceStore 