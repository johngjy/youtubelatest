import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import TabIconLabel from './TabIconLabel';
import { IconName } from './TabIcon';
import useNavigationStore from '../../stores/useNavigationStore';

const BottomNavHome = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useNavigationStore();

  const tabs: { icon: IconName; label: string }[] = [
    { icon: 'home', label: t('tab.home') },
    { icon: 'dubspace', label: t('tab.dubspace') },
    { icon: 'ytaccount', label: t('tab.ytaccount') },
    { icon: 'account', label: t('tab.account') },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabIconLabel
          key={tab.icon}
          icon={tab.icon}
          label={tab.label}
          isActive={activeTab === tab.icon}
          onPress={() => setActiveTab(tab.icon)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});

export default BottomNavHome; 