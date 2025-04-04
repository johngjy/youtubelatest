import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES, Profile } from '../../api/supabase'

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data as Profile
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useVIPStatus = (userId: string) => {
  return useQuery({
    queryKey: ['vip', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('is_vip')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data.is_vip as boolean
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useTCoinBalance = (userId: string) => {
  return useQuery({
    queryKey: ['tcoin', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('tcoin_balance')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data.tcoin_balance as number
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  })
} 