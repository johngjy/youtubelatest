import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts';
import { WelcomeScreen, HomeScreen, VideoScreen, DubSpaceScreen, AccountScreen, AskAIScreen, SubscriptionsScreen, YTAccountScreen } from '../screens';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// 导入占位屏幕组件（后期实际开发时会替换成真实的屏幕组件）
const DubLibraryScreen = () => <View style={{ flex: 1 }} />;
const YoutubeScreen = () => <View style={{ flex: 1 }} />;
const VIPScreen = () => <View style={{ flex: 1 }} />;
const VideoPlayerScreen = () => <View style={{ flex: 1 }} />;
const SignInScreen = () => <View style={{ flex: 1 }} />;
const SignUpScreen = () => <View style={{ flex: 1 }} />;

// 定义主要导航堆栈的参数
export type RootStackParamList = {
  Main: undefined;
  Welcome: undefined;
  VideoPlayer: {
    videoId: string;
  };
  DubSpace: undefined;
  Account: undefined;
  AskAI: undefined;
  Subscriptions: undefined;
  YTAccount: undefined;
};

// 定义认证导航堆栈的参数
export type AuthStackParamList = {
  SignIn: undefined; // 登录页面
  SignUp: undefined; // 注册页面
};

// 定义底部标签导航的参数
export type MainTabParamList = {
  Home: undefined;
  DubSpace: undefined;
  Subscriptions: undefined;
  YTAccount: undefined;
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
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          height: 55,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F2F2F2',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DubSpace"
        component={DubSpaceScreen}
        options={{
          tabBarLabel: 'DubSpace',
          tabBarIcon: ({ color, size }) => (
            <Icon name="play-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="film-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="YTAccount"
        component={YTAccountScreen}
        options={{
          tabBarLabel: 'YouTube',
          tabBarIcon: ({ color, size }) => (
            <Icon name="logo-youtube" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// 应用的主导航器
const AppNavigator = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="VideoPlayer" component={VideoScreen} />
        <Stack.Screen name="AskAI" component={AskAIScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
