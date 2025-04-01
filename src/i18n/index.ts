import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';

// 导入语言资源
import en from './locales/en.json';
import zh from './locales/zh.json';

// RTL 语言列表 (暂时未使用，为将来扩展准备)
const RTL_LANGUAGES = ['ar', 'he', 'ur', 'fa'];

// 获取设备默认语言代码
const getDeviceLanguage = () => {
  const locale = Localization.locale.split('-')[0];
  // 如果设备语言不是我们支持的语言，则使用英语作为默认语言
  return locale === 'zh' ? 'zh' : 'en';
};

// 配置RTL支持
export const configureRTL = (languageCode: string) => {
  const isRTL = RTL_LANGUAGES.includes(languageCode);

  // 如果当前语言是RTL，但系统未配置为RTL，则允许RTL
  if (isRTL && !I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
  // 如果当前语言不是RTL，但系统配置为RTL，则禁用RTL
  else if (!isRTL && I18nManager.isRTL) {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }
};

// 初始化i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// 当语言改变时，配置RTL
i18next.on('languageChanged', (lng) => {
  configureRTL(lng);
});

// 初始配置RTL
configureRTL(i18next.language);

export default i18next;
