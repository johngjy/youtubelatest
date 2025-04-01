import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Button } from '../../components';
import { theme } from '../../constants/theme';
import { useLanguage } from '../../contexts';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();

  const handleContinue = () => {
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
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo and Title */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              {/* Custom Microphone Icon */}
              <View style={styles.microphoneIcon}>
                <View style={styles.micBody} />
                <View style={styles.micBase} />
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to Smartube</Text>
            <Text style={styles.subtitle}>Your AI-powered, ad-free YouTube experience.</Text>
          </View>
        </View>

        {/* Features Cards */}
        <View style={styles.featuresContainer}>
          <FeatureCard 
            title="AI Video Assistant."
            description="Ask questions about the video you're watching and get real-time answers"
          />
          <FeatureCard 
            title="Voice & Subtitle Translation"
            description="Watch any video in your language — Smartube translates audio and subtitles on the fly."
          />
          <FeatureCard 
            title="Floating & Background Playback."
            description="Keep videos playing while you multitask, in a floating window or background dubbing audio mode."
          />
          <FeatureCard 
            title="No ads."
            description="Enjoy a clean, uninterrupted YouTube viewing experience"
          />
          <FeatureCard 
            title="Unlock More with VIP."
            description="Upgrade for unlimited AI access, high-quality voice dubbing, and bonus TCoins."
          />
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            variant="primary"
            size="large"
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
            onPress={handleContinue}
          />
        </View>
      </ScrollView>

      {/* Navigation gesture line */}
      <View style={styles.navigationGestureLine} />
    </SafeAreaView>
  );
};

// Feature Card component
const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <View style={styles.featureCard}>
    <Text style={styles.featureTitle}>{title}</Text>
    <View style={styles.dividerLine} />
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingRight: 20,
  },
  logoContainer: {
    marginRight: 15,
  },
  logoBackground: {
    width: 76,
    height: 54,
    backgroundColor: '#EA333D',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneIcon: {
    width: 20,
    height: 32,
    alignItems: 'center',
  },
  micBody: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
  },
  micBase: {
    width: 12,
    height: 14,
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
  featuresContainer: {
    marginBottom: 30,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  dividerLine: {
    width: '100%',
    height: 1,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#006FFD',
    width: 240,
    height: 50,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  navigationGestureLine: {
    width: 134,
    height: 5,
    backgroundColor: 'black',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default WelcomeScreen;
