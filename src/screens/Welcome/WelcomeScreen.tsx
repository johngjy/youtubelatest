import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Button } from '../../components';
import { useLanguage } from '../../contexts';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();

  const handleGetStarted = () => {
    try {
      console.log('Navigate to Main screen');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.content}>
        {/* Logo and Title Section */}
        <View style={styles.logoSection}>
          <Text style={styles.title}>Smartube</Text>
          <Text style={styles.subtitle}>Your Smart Video Assistant</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon="🚫"
            text="No ads. Enjoy a clean tube experience."
          />
          <FeatureItem
            icon="🤖"
            text="AI Video Assistant. Ask anything about video."
          />
          <FeatureItem
            icon="🌐"
            text="Voice & Subtitle Translation. Watch any video in your language."
          />
          <FeatureItem
            icon="⭐"
            text="Floating video Playback and dubbing background play while you multitask."
          />
          <FeatureItem
            icon="👑"
            text="Unlock More with VIP. Upgrade for high-quality voice dubbing and bonus TCoins."
          />
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            variant="primary"
            size="large"
            style={styles.getStartedButton}
            textStyle={styles.getStartedButtonText}
            onPress={handleGetStarted}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Feature Item component
const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 16,
  },
  featuresContainer: {
    flex: 1,
    paddingVertical: 24,
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    fontSize: 24,
    width: 32,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingTop: 24,
  },
  getStartedButton: {
    backgroundColor: '#212121',
    height: 56,
    borderRadius: 28,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default WelcomeScreen;
