import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../constants/theme';

type SubscriptionsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Subscriptions'>;
};

const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Add your Subscriptions screen content here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default SubscriptionsScreen; 