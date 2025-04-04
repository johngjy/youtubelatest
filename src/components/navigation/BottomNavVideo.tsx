import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TabIconLabel from './TabIconLabel';
import useNavigationStore from '../../stores/useNavigationStore';
import { RootStackParamList } from '../../types/navigation';
import { IconName } from './TabIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavVideo = () => {
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
        name="dubbing"
        label="tab.dubbing"
        focused={activeTab === 'dubbing'}
        onPress={() => handleTabPress('DubSpace', 'dubbing')}
      />
      <TabIconLabel
        name="askai"
        label="tab.askai"
        focused={activeTab === 'askai'}
        onPress={() => handleTabPress('AskAI', 'askai')}
      />
      <TabIconLabel
        name="you"
        label="tab.you"
        focused={activeTab === 'you'}
        onPress={() => handleTabPress('Account', 'you')}
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

export default BottomNavVideo; 