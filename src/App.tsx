import React, { useEffect, useState } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, LanguageProvider } from './contexts';
import AppNavigator from './navigation/AppNavigator';
import i18n from './i18n';

// 忽略一些不必要的警告
LogBox.ignoreLogs([
  'Overwriting fontFamily style attribute preprocessor',
  'ViewPropTypes will be removed from React Native',
]);

const App = () => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  // 初始化应用
  useEffect(() => {
    const initApp = async () => {
      // 确保 i18n 初始化完成
      await i18n.init();
      setIsI18nInitialized(true);
    };
    initApp();
  }, []);

  if (!isI18nInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <LanguageProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
