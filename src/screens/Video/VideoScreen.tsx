import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { BottomNavVideo } from '../../components/navigation';
import { theme } from '../../constants/theme';

type VideoScreenProps = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoScreen: React.FC<VideoScreenProps> = ({ navigation, route }) => {
  const { videoId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {/* Add your video player content here */}
      </View>
      <BottomNavVideo />
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

export default VideoScreen; 