import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
})

// 类型定义
export interface Profile {
  id: string
  username: string
  avatar_url?: string
  updated_at: string
  is_vip: boolean
  tcoin_balance: number
}

export interface DubVideo {
  id: string
  youtube_id: string
  title: string
  thumbnail_url: string
  duration: number
  created_at: string
  user_id: string
  language: string
  category: string
  views: number
}

export interface WatchHistory {
  id: string
  user_id: string
  video_id: string
  watched_at: string
  progress: number
}

export interface Favorite {
  id: string
  user_id: string
  video_id: string
  created_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  content: string
  created_at: string
  role: 'user' | 'assistant'
}

// 数据库表名常量
export const TABLES = {
  PROFILES: 'profiles',
  DUB_VIDEOS: 'dub_videos',
  WATCH_HISTORY: 'watch_history',
  FAVORITES: 'favorites',
  CHAT_MESSAGES: 'chat_messages'
} as const 