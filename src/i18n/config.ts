import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

interface Language {
  name: string
  nativeName: string
  isRTL: boolean
}

// 支持的语言
export const SUPPORTED_LANGUAGES: Record<string, Language> = {
  en: { name: 'English', nativeName: 'English', isRTL: false },
  zh: { name: 'Chinese', nativeName: '中文', isRTL: false },
  ja: { name: 'Japanese', nativeName: '日本語', isRTL: false },
  ru: { name: 'Russian', nativeName: 'Русский', isRTL: false },
  ar: { name: 'Arabic', nativeName: 'العربية', isRTL: true },
}

type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

// 获取设备默认语言
const getDeviceLanguage = (): LanguageCode => {
  try {
    const locale = Localization.locale ?? 'en'
    const languageCode = locale.split('-')[0] as LanguageCode
    return languageCode in SUPPORTED_LANGUAGES ? languageCode : 'en'
  } catch {
    return 'en'
  }
}

// 翻译资源
const resources = {
  en: {
    translation: {
      // 通用
      common: {
        search: 'Search',
        loading: 'Loading...',
        error: 'Error',
        retry: 'Retry',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        confirm: 'Confirm',
      },
      // 认证
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        username: 'Username',
      },
      // VIP
      vip: {
        upgrade: 'Upgrade to VIP',
        benefits: 'VIP Benefits',
        current: 'Current Plan',
      },
      // 配音库
      dubLibrary: {
        title: 'Dub Library',
        filters: 'Filters',
        sortBy: 'Sort By',
        categories: 'Categories',
        languages: 'Languages',
      },
      // AI 助手
      aiAssistant: {
        title: 'AI Assistant',
        placeholder: 'Ask me anything...',
        thinking: 'AI is thinking...',
      },
    },
  },
  // 其他语言的翻译资源...
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n 