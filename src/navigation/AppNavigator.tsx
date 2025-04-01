import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts';
import { WelcomeScreen, HomeScreen } from '../screens';

// 导入占位屏幕组件（后期实际开发时会替换成真实的屏幕组件）
// 稍后将创建真实的屏幕组件
const DubLibraryScreen = () => <></>;
const VIPScreen = () => <></>;
const AccountScreen = () => <></>;
const VideoPlayerScreen = () => <></>;
const SignInScreen = () => <></>;
const SignUpScreen = () => <></>;

// 定义主要导航堆栈的参数
export type RootStackParamList = {
  Welcome: undefined; // 欢迎页面
  Main: undefined; // 主导航（包含底部选项卡）
  Video: { videoId: string }; // 视频播放页
  VIP: undefined; // VIP 会员页面
  Auth: undefined; // 认证相关页面
};

// 定义认证导航堆栈的参数
export type AuthStackParamList = {
  SignIn: undefined; // 登录页面
  SignUp: undefined; // 注册页面
};

// 定义底部标签导航的参数
export type MainTabParamList = {
  Home: undefined; // 主页（YouTube WebView）
  DubLibrary: undefined; // 配音库页面
  Account: undefined; // 账户页面
};

// 创建导航堆栈
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// 认证相关的导航器
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

// 底部选项卡导航器
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3d5afe',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon 将在实际实现时添加
        }}
      />
      <Tab.Screen
        name="DubLibrary"
        component={DubLibraryScreen}
        options={{
          tabBarLabel: 'Dub Library',
          // tabBarIcon 将在实际实现时添加
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          // tabBarIcon 将在实际实现时添加
        }}
      />
    </Tab.Navigator>
  );
};

// 应用的主导航器
const AppNavigator = () => {
  const { isLoading, user, isSignout } = useAuth();

  // 可以在这里处理应用启动时的逻辑，例如显示闪屏
  if (isLoading) {
    // 返回一个加载指示器或闪屏组件
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 首次启动显示欢迎页 */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            animationTypeForReplace: isSignout ? 'pop' : 'push',
          }}
        />

        {/* 主应用底部标签导航 */}
        <Stack.Screen name="Main" component={MainTabNavigator} />

        {/* 视频播放页面 */}
        <Stack.Screen name="Video" component={VideoPlayerScreen} />

        {/* VIP 会员页面 */}
        <Stack.Screen name="VIP" component={VIPScreen} />

        {/* 认证相关页面 */}
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
