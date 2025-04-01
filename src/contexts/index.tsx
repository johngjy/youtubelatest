import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { VIPProvider } from './VIPContext';
import { TCoinProvider } from './TCoinContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * 应用全局上下文提供器
 * 嵌套所有上下文提供器，以确保各上下文之间的正确依赖顺序
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // 嵌套顺序很重要！
  // 内部上下文可以使用外部上下文的 hooks
  // 例如，VIPProvider 和 TCoinProvider 会使用 AuthProvider 中的用户信息
  return (
    <LanguageProvider>
      <AuthProvider>
        <VIPProvider>
          <TCoinProvider>{children}</TCoinProvider>
        </VIPProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

// 导出各上下文的 hooks 以便在整个应用中使用
export { useAuth } from './AuthContext';
export { useLanguage } from './LanguageContext';
export { useVIP } from './VIPContext';
export { useTCoin } from './TCoinContext';

// 导出类型和枚举
export type { User } from './AuthContext';
export type { Language } from './LanguageContext';
export type { VIPState } from './VIPContext';
export type { Transaction } from './TCoinContext';

export { VIPLevel } from './VIPContext';
export { TransactionType } from './TCoinContext';
export { SUPPORTED_LANGUAGES } from './LanguageContext';
