import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import TabIconLabel, { TabIcon } from './TabIconLabel';

type TabConfig = {
  name: string;
  labelKey: string;
  icon: TabIcon;
};

type TabGroupKey = 'home' | 'video' | 'account' | 'dubspace';

const TAB_GROUP_KEYS: TabGroupKey[] = ['home', 'video', 'account', 'dubspace'];

// 定义不同页面组的导航配置
const TAB_GROUPS: Record<TabGroupKey, TabConfig[]> = {
  home: [
    { name: 'Home', labelKey: 'tab.home', icon: 'home' },
    { name: 'DubSpace', labelKey: 'tab.dubspace', icon: 'dubbing' },
    { name: 'Subscriptions', labelKey: 'tab.subscriptions', icon: 'video' },
    { name: 'YouTubeAccount', labelKey: 'tab.ytaccount', icon: 'youtube' },
  ],
  video: [
    { name: 'Home', labelKey: 'tab.home', icon: 'home' },
    { name: 'AskAI', labelKey: 'tab.askai', icon: 'ai' },
    { name: 'Dubbing', labelKey: 'tab.dubbing', icon: 'dubbing' },
    { name: 'Account', labelKey: 'tab.account', icon: 'user' },
  ],
  account: [
    { name: 'Home', labelKey: 'tab.home', icon: 'home' },
    { name: 'DubSpace', labelKey: 'tab.dubspace', icon: 'dubbing' },
    { name: 'Account', labelKey: 'tab.account', icon: 'user' },
  ],
  dubspace: [
    { name: 'Home', labelKey: 'tab.home', icon: 'home' },
    { name: 'DubSpace', labelKey: 'tab.dubspace', icon: 'dubbing' },
    { name: 'Account', labelKey: 'tab.account', icon: 'user' },
  ],
} as const;

export function GlobalBottomNav({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  
  // 根据当前路由确定使用哪组标签
  const getCurrentTabGroup = () => {
    if (!state.routes || state.index === undefined || !state.routes[state.index]) {
      return TAB_GROUPS.home;
    }
    
    const currentRoute = state.routes[state.index]?.name?.toLowerCase() || '';
    const group = TAB_GROUP_KEYS.find(key => currentRoute.includes(key)) || 'home';
    return TAB_GROUPS[group];
  };

  const tabs = getCurrentTabGroup();

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TabIconLabel
            key={tab.name}
            icon={tab.icon}
            label={t(tab.labelKey)}
            focused={state.index !== undefined && state.index === tabs.findIndex(t => t.name === tab.name)}
            onPress={() => navigation.navigate(tab.name)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 0, // 适配底部安全区域
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between', // 改为 space-between 以确保均匀分布
    alignItems: 'center',
  },
});

export default GlobalBottomNav; 