import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TabIconLabel from './TabIconLabel';
import useNavigationStore from '../../stores/useNavigationStore';
import { RootStackParamList } from '../../types/navigation';
import { IconName } from './TabIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavAccount = () => {
  const navigation = useNavigation<NavigationProp>();
  const { activeTab, setActiveTab, setScreen } = useNavigationStore();

  const handleTabPress = (screen: keyof RootStackParamList, tab: IconName) => {
    setActiveTab(tab);
    setScreen(screen as any);
    navigation.navigate(screen as any);
  };

  return (
    <View style={styles.container}>
      <TabIconLabel
        name="home"
        label="tab.home"
        focused={activeTab === 'home'}
        onPress={() => handleTabPress('Home', 'home')}
      />
      <TabIconLabel
        name="dubspace"
        label="tab.dubspace"
        focused={activeTab === 'dubspace'}
        onPress={() => handleTabPress('DubSpace', 'dubspace')}
      />
      <TabIconLabel
        name="ytaccount"
        label="tab.ytaccount"
        focused={activeTab === 'ytaccount'}
        onPress={() => handleTabPress('YTAccount', 'ytaccount')}
      />
      <TabIconLabel
        name="account"
        label="tab.account"
        focused={activeTab === 'account'}
        onPress={() => handleTabPress('Account', 'account')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 60,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNavAccount; 