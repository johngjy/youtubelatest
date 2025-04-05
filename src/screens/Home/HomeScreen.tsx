import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/AppNavigator';
import { Header } from '../../components';
import { BottomNavHome } from '../../components/navigation';
import { theme } from '../../constants/theme';
import { useLanguage } from '../../contexts';
import Ionicons from '@expo/vector-icons/Ionicons';

type HomeScreenProps = {
  navigation: BottomTabNavigationProp<MainTabParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('https://m.youtube.com');

  // WebView 注入的 JavaScript
  const INJECTED_JAVASCRIPT = `
    (function() {
      // 移除广告和不需要的元素
      function removeAds() {
        const adsSelectors = [
          'ytm-promoted-video-renderer',
          'ytm-companion-slot',
          '.player-endscreen',
          'ytm-paid-content-overlay-renderer'
        ];
        
        adsSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = 'none';
          });
        });
        
        setTimeout(removeAds, 1000); // 定期检查并移除广告
      }
      
      removeAds();
    })();
  `;

  const handleNavigationStateChange = (navState: { url: string }) => {
    setCurrentUrl(navState.url);
  };

  // 新增的处理函数
  const handleSearchPress = () => {
    // 导航到搜索页或显示搜索框
    console.log('Search pressed');
  };

  const handleGlobePress = () => {
    // 处理翻译功能
    console.log('Translation pressed');
  };

  const handleVIPPress = () => {
    // 导航到账户页面，因为没有 VIP 页面，暂时导航到 YTAccount
    navigation.navigate('YTAccount');
  };

  const handleProfilePress = () => {
    // 导航到账户页面
    navigation.navigate('YTAccount');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        backgroundColor={theme.colors.background}
        onSearchPress={handleSearchPress}
        onGlobePress={handleGlobePress}
        onVIPPress={handleVIPPress}
        onProfilePress={handleProfilePress}
      />

      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}

        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webView}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={handleNavigationStateChange}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" color={theme.colors.primary} />}
        />
      </View>
      <BottomNavHome />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    zIndex: 10,
  },
});

export default HomeScreen;
