import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts';
import AppNavigator from './navigation/AppNavigator';
import i18n from './i18n';

// 忽略一些不必要的警告
LogBox.ignoreLogs([
  'Overwriting fontFamily style attribute preprocessor',
  'ViewPropTypes will be removed from React Native',
]);

const App = () => {
  // 初始化应用
  useEffect(() => {
    // 这里可以添加任何应用启动时需要执行的代码
    // 例如：初始化分析工具、崩溃报告等
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
