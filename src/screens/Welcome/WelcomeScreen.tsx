import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
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
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.default} />

      <View style={styles.content}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t('welcome.title')}</Text>
        <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>

        <View style={styles.features}>
          <FeatureItem icon="✓" text={t('welcome.features.noAds')} />
          <FeatureItem icon="✓" text={t('welcome.features.aiAssistant')} />
          <FeatureItem icon="✓" text={t('welcome.features.realTimeTranslation')} />
          <FeatureItem icon="✓" text={t('welcome.features.pictureInPicture')} />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title={t('welcome.continue')}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
};

// Feature item component
const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.large,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.large,
  },
  title: {
    ...theme.typography.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
  subtitle: {
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  features: {
    width: '100%',
    marginTop: theme.spacing.large,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  featureIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    marginRight: theme.spacing.medium,
    width: 24,
    textAlign: 'center',
  },
  featureText: {
    ...theme.typography.body1,
  },
  footer: {
    padding: theme.spacing.large,
  },
});

export default WelcomeScreen;
