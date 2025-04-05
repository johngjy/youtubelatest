import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../api/supabase'
import useUserStore from '../../stores/useUserStore'
import useUserQuery from '../../hooks/useUserQuery'
import { formatDate } from '../../utils/date'

export const UserProfileHeader: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)
  // 从 Zustand 获取客户端状态
  const { isVIP, vipExpiryDate, coinBalance, aiUsageCount, aiUsageLimit } = useUserStore()
  
  // 从 React Query 获取服务器状态
  const { userData, isLoading } = useUserQuery()
  
  useEffect(() => {
    // 获取初始会话
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // 设置会话更改监听器
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading || !session) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{userData?.username || 'User'}</Text>
        <Text style={styles.email}>{session.user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* VIP 状态 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>VIP Status</Text>
          <Text style={[styles.statValue, isVIP && styles.vipText]}>
            {isVIP ? 'Active' : 'Inactive'}
          </Text>
          {isVIP && vipExpiryDate && (
            <Text style={styles.expiry}>
              Expires: {formatDate(vipExpiryDate)}
            </Text>
          )}
        </View>

        {/* TCoin 余额 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>TCoin Balance</Text>
          <Text style={styles.statValue}>{coinBalance}</Text>
        </View>

        {/* AI 使用情况 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>AI Usage Today</Text>
          <Text style={styles.statValue}>
            {aiUsageCount} / {aiUsageLimit}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  vipText: {
    color: '#FFB800',
  },
  expiry: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
})

export default UserProfileHeader 