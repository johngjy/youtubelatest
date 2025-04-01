// Environment configurations
import * as Application from 'expo-application';

// 确保 __DEV__ 类型可用
declare const __DEV__: boolean;

type Environment = 'development' | 'test' | 'production';

// Get the current environment from expo constant or fallback to development
const getEnvironment = (): Environment => {
  if (__DEV__) {
    return 'development';
  }

  // 根据应用版本确定环境
  // 可以根据实际发布策略来调整这个逻辑
  // 例如：版本号包含 beta 或 rc 的为测试环境
  const appVersion = Application.nativeApplicationVersion || '';
  if (appVersion.includes('beta') || appVersion.includes('rc')) {
    return 'test';
  }

  // Default to production if not development and not specified
  return 'production';
};

const currentEnv: Environment = getEnvironment();

interface EnvironmentConfig {
  apiUrl: string;
  webViewUrl: string;
  analyticsEnabled: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableAdBanner: boolean;
}

const configs: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: 'https://api-dev.smartube.example.com',
    webViewUrl: 'https://m.youtube.com',
    analyticsEnabled: false,
    logLevel: 'debug',
    enableAdBanner: false,
  },
  test: {
    apiUrl: 'https://api-test.smartube.example.com',
    webViewUrl: 'https://m.youtube.com',
    analyticsEnabled: true,
    logLevel: 'info',
    enableAdBanner: true,
  },
  production: {
    apiUrl: 'https://api.smartube.example.com',
    webViewUrl: 'https://m.youtube.com',
    analyticsEnabled: true,
    logLevel: 'error',
    enableAdBanner: true,
  },
};

export const ENV = configs[currentEnv];

// Helper to check if we are in development
export const isDev = currentEnv === 'development';
export const isTest = currentEnv === 'test';
export const isProd = currentEnv === 'production';
