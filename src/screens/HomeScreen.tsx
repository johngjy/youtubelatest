import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export const HomeScreen = () => {
  // YouTube 广告屏蔽脚本
  const adBlockScript = `
    (function() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // 移除广告容器
              if (node.classList && (
                node.classList.contains('video-ads') ||
                node.classList.contains('ytp-ad-overlay-container')
              )) {
                node.remove();
              }
              // 如果是广告视频，点击跳过按钮
              const skipButton = document.querySelector('.ytp-ad-skip-button');
              if (skipButton) {
                skipButton.click();
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.youtube.com' }}
        style={styles.webview}
        injectedJavaScript={adBlockScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webview: {
    flex: 1,
  },
});
