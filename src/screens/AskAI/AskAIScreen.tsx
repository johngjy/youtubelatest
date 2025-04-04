import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../constants/theme';

type AskAIScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AskAI'>;
};

const AskAIScreen: React.FC<AskAIScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Add your AskAI screen content here */}
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

export default AskAIScreen; 