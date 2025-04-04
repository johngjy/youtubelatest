import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from '../api/supabase'
import useUserStore from '../stores/useUserStore'

export const useUserQuery = () => {
  const session = useSession()
  const queryClient = useQueryClient()
  const syncWithQuery = useUserStore((state) => state.syncWithQuery)

  // 获取用户数据
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user session')

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) throw error
      
      // 同步到 Zustand store
      syncWithQuery({
        is_vip: data.is_vip,
        vip_expiry: data.vip_expiry,
        coin_balance: data.coin_balance,
        ai_usage: data.ai_usage,
        preferences: data.preferences,
      })

      return data
    },
    enabled: !!session?.user?.id,
  })

  // 更新用户数据
  const { mutate: updateUser } = useMutation({
    mutationFn: async (updates: Partial<typeof userData>) => {
      if (!session?.user?.id) throw new Error('No user session')

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', session.user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      // 更新缓存
      queryClient.setQueryData(['user', session?.user?.id], data)
      
      // 同步到 Zustand store
      syncWithQuery({
        is_vip: data.is_vip,
        vip_expiry: data.vip_expiry,
        coin_balance: data.coin_balance,
        ai_usage: data.ai_usage,
        preferences: data.preferences,
      })
    },
  })

  return {
    userData,
    isLoading,
    updateUser,
  }
}

export default useUserQuery 