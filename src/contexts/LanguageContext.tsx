import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';

// 支持的语言
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

// 应用支持的语言列表
// Default language must be first in the list
export const DEFAULT_LANGUAGE: Language = { code: 'en', name: 'English', nativeName: 'English', isRTL: false };

export const SUPPORTED_LANGUAGES: Language[] = [
  DEFAULT_LANGUAGE,
  { code: 'zh', name: 'Chinese', nativeName: '中文', isRTL: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', isRTL: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', isRTL: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true },
  // 可以根据需要添加更多语言
];

// 语言上下文状态类型
interface LanguageContextState {
  currentLanguage: Language;
  appLanguage: string; // 应用界面语言
  dubLanguage: string; // 默认配音语言（可能与应用语言不同）
  translateLanguage: string; // 默认翻译目标语言
  isRTL: boolean;
  loading: boolean;
  t: (key: string, options?: any) => string; // 翻译函数
  changeAppLanguage: (languageCode: string) => Promise<void>;
  changeDubLanguage: (languageCode: string) => Promise<void>;
  changeTranslateLanguage: (languageCode: string) => Promise<void>;
  getLanguageByCode: (code: string) => Language | undefined;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextState | undefined>(undefined);

// Provider 属性类型
interface LanguageProviderProps {
  children: ReactNode;
}

// 获取支持的语言对象通过代码
const getLanguageByCode = (code: string): Language | undefined => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
};

// 获取设备默认语言
const getDeviceLanguage = (): string => {
  const deviceLang = Localization.locale.split('-')[0];
  // 检查设备语言是否在支持的语言列表中
  const supportedLang = SUPPORTED_LANGUAGES.find((lang) => lang.code === deviceLang);
  return supportedLang ? supportedLang.code : 'en';
};

// 语言 Provider 组件
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 获取设备默认语言作为初始值
  const deviceLang = getDeviceLanguage();
  // Use device language if supported, otherwise fall back to default language
  const defaultLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === deviceLang) || DEFAULT_LANGUAGE;

  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);
  const [dubLanguage, setDubLanguage] = useState<string>(defaultLanguage.code);
  const [translateLanguage, setTranslateLanguage] = useState<string>(defaultLanguage.code);
  const [loading, setLoading] = useState<boolean>(true);

  // 使用 react-i18next 的翻译 hook
  const { t } = useTranslation();

  // 从存储加载语言设置
  useEffect(() => {
    const loadLanguageSettings = async () => {
      try {
        // 加载应用语言设置
        const savedAppLang = await AsyncStorage.getItem('app_language');
        if (savedAppLang) {
          const lang = getLanguageByCode(savedAppLang);
          if (lang) {
            setCurrentLanguage(lang);
            i18next.changeLanguage(savedAppLang);
          }
        }

        // 加载配音语言设置
        const savedDubLang = await AsyncStorage.getItem('dub_language');
        if (savedDubLang) {
          setDubLanguage(savedDubLang);
        }

        // 加载翻译目标语言设置
        const savedTranslateLang = await AsyncStorage.getItem('translate_language');
        if (savedTranslateLang) {
          setTranslateLanguage(savedTranslateLang);
        }
      } catch (error) {
        console.error('Error loading language settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguageSettings();
  }, []);

  // 配置 RTL 支持
  const configureRTL = (language: Language) => {
    // 如果当前语言是RTL，但系统未配置为RTL，则允许RTL
    if (language.isRTL && !I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
    // 如果当前语言不是RTL，但系统配置为RTL，则禁用RTL
    else if (!language.isRTL && I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  };

  // 更改应用界面语言
  const changeAppLanguage = async (languageCode: string) => {
    const language = getLanguageByCode(languageCode);
    if (!language) {
      throw new Error(`Unsupported language: ${languageCode}`);
    }

    try {
      // 保存语言设置
      await AsyncStorage.setItem('app_language', languageCode);

      // 更新 i18next 语言
      await i18next.changeLanguage(languageCode);

      // 配置 RTL
      configureRTL(language);

      // 更新状态
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  };

  // 更改默认配音语言
  const changeDubLanguage = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('dub_language', languageCode);
      setDubLanguage(languageCode);
    } catch (error) {
      console.error('Error changing dub language:', error);
      throw error;
    }
  };

  // 更改默认翻译目标语言
  const changeTranslateLanguage = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('translate_language', languageCode);
      setTranslateLanguage(languageCode);
    } catch (error) {
      console.error('Error changing translate language:', error);
      throw error;
    }
  };

  // 上下文值
  const contextValue: LanguageContextState = {
    currentLanguage,
    appLanguage: currentLanguage.code,
    dubLanguage,
    translateLanguage,
    isRTL: currentLanguage.isRTL,
    loading,
    t,
    changeAppLanguage,
    changeDubLanguage,
    changeTranslateLanguage,
    getLanguageByCode,
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

// 使用语言上下文的 Hook
export const useLanguage = (): LanguageContextState => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
