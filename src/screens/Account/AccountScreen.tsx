import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { BottomNavAccount } from '../../components/navigation';
import { theme } from '../../constants/theme';

type AccountScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Account'>;
};

/**
 * Account 页面组件
 */
const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Account</Text>
        {/* Add your account screen content here */}
      </View>
      <BottomNavAccount />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
});

export default AccountScreen; 