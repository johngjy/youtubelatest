import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { BottomNavDubSpace } from '../../components/navigation';
import { theme } from '../../constants/theme';

type DubSpaceScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DubSpace'>;
};

const DubSpaceScreen: React.FC<DubSpaceScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {/* Add your DubSpace content here */}
      </View>
      <BottomNavDubSpace />
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
  },
});

export default DubSpaceScreen; 