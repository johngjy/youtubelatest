import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ViewStyle,
  TextStyle,
  I18nManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';

// 图标组件（实际应用中需要一个真实的图标组件，这里使用占位符）
// 比如使用 @expo/vector-icons
const Icon = ({ name, size, color }: { name: string; size: number; color: string }) => (
  <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }} />
);

// 导航栏右侧图标按钮属性
export interface HeaderAction {
  icon: string;
  onPress: () => void;
  testID?: string;
  tintColor?: string;
}

// Header 组件属性接口
export interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightActions?: HeaderAction[];
  titleStyle?: TextStyle;
  style?: ViewStyle;
  backgroundColor?: string;
  elevation?: boolean;
  logoType?: 'text' | 'image';
}

const Header: React.FC<HeaderProps> = ({
  title,
  showLogo = false,
  showBackButton = false,
  onBackPress,
  rightActions = [],
  titleStyle,
  style,
  backgroundColor = theme.colors.background.default,
  elevation = true,
  logoType = 'text',
}) => {
  const insets = useSafeAreaInsets();
  const isRTL = I18nManager.isRTL;

  const renderLogo = () => {
    if (logoType === 'image') {
      // 这里应该是一个实际的应用 Logo 图片
      return (
        <View style={styles.logoContainer}>
          {/* 在实际应用中，这里应该使用 Image 组件加载 Logo */}
          <View style={styles.logoPlaceholder} />
          <Text style={styles.logoText}>Smartube</Text>
        </View>
      );
    }
    return (
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Smartube</Text>
      </View>
    );
  };

  const renderBackButton = () => {
    if (!showBackButton) return null;

    return (
      <TouchableOpacity
        style={[styles.backButton, isRTL && styles.backButtonRTL]}
        onPress={onBackPress}
        activeOpacity={theme.layout.touchableOpacity}
        testID="header-back-button"
      >
        <Icon
          name={isRTL ? 'chevron-right' : 'chevron-left'}
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    );
  };

  const renderRightActions = () => {
    if (rightActions.length === 0) return null;

    return (
      <View style={styles.rightActionsContainer}>
        {rightActions.map((action, index) => (
          <TouchableOpacity
            key={`action-${index}`}
            style={styles.actionButton}
            onPress={action.onPress}
            activeOpacity={theme.layout.touchableOpacity}
            testID={action.testID}
          >
            <Icon
              name={action.icon}
              size={24}
              color={action.tintColor || theme.colors.text.primary}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor,
        },
        elevation && styles.elevation,
        style,
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} translucent />
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {renderBackButton()}
          {showLogo && !title && renderLogo()}
        </View>

        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        )}

        {renderRightActions()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  elevation: {
    ...(theme.elevation.small as any),
  },
  header: {
    height: theme.layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.small,
  },
  backButtonRTL: {
    marginRight: 0,
    marginLeft: theme.spacing.small,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  logoText: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.small,
  },
});

export default Header;
