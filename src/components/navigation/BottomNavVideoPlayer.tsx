import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIconLabel from './TabIconLabel';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

// 临时的占位屏幕组件
const PlaceholderScreen = () => <View style={{ flex: 1 }} />;

const BottomNavVideoPlayer = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconLabel
              icon="home"
              label={t('tab.home')}
              isActive={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AskAI"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconLabel
              icon="askai"
              label={t('tab.askai')}
              isActive={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dubbing"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconLabel
              icon="dubbing"
              label={t('tab.dubbing')}
              isActive={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconLabel
              icon="account"
              label={t('tab.account')}
              isActive={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 60,
    paddingBottom: 8,
  },
});

export default BottomNavVideoPlayer; 