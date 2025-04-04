import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, TABLES, Profile } from '../../api/supabase'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Profile>) => {
      const { data: updatedProfile, error } = await supabase
        .from(TABLES.PROFILES)
        .update(data)
        .eq('id', data.id)
        .single()

      if (error) throw error
      return updatedProfile
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['vip', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['tcoin', variables.id] })
    },
  })
}

export const useUpdateTCoinBalance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, amount }: { userId: string; amount: number }) => {
      const { data: currentBalance } = await supabase
        .from(TABLES.PROFILES)
        .select('tcoin_balance')
        .eq('id', userId)
        .single()

      if (!currentBalance) throw new Error('User not found')

      const newBalance = currentBalance.tcoin_balance + amount
      if (newBalance < 0) throw new Error('Insufficient balance')

      const { data: updatedProfile, error } = await supabase
        .from(TABLES.PROFILES)
        .update({ tcoin_balance: newBalance })
        .eq('id', userId)
        .single()

      if (error) throw error
      return updatedProfile
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tcoin', variables.userId] })
    },
  })
}

export const useUpdateVIPStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, isVip }: { userId: string; isVip: boolean }) => {
      const { data: updatedProfile, error } = await supabase
        .from(TABLES.PROFILES)
        .update({ is_vip: isVip })
        .eq('id', userId)
        .single()

      if (error) throw error
      return updatedProfile
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vip', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] })
    },
  })
} 