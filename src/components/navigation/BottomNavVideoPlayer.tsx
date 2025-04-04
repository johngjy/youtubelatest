import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIconLabel from './TabIconLabel';

const Tab = createBottomTabNavigator();

// 临时的占位屏幕组件
const PlaceholderScreen = () => <View style={{ flex: 1 }} />;

const BottomNavVideoPlayer = () => {
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
              name="home"
              label="tab.home"
              focused={focused}
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
              name="askai"
              label="tab.askai"
              focused={focused}
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
              name="dubbing"
              label="tab.dubbing"
              focused={focused}
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
              name="account"
              label="tab.account"
              focused={focused}
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