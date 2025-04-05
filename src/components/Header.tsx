import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '../constants/theme';

// 导航栏右侧图标按钮属性
export interface HeaderAction {
  icon: keyof typeof Ionicons.glyphMap; // 使用 Ionicons 的正确类型
  onPress: () => void;
  testID?: string;
  color?: string;
}

// Header 组件属性接口
export interface HeaderProps {
  style?: ViewStyle;
  backgroundColor?: string;
  title?: string;
  showBackButton?: boolean;
  rightActions?: HeaderAction[];
  onSearchPress?: () => void;
  onGlobePress?: () => void;
  onVIPPress?: () => void;
  onProfilePress?: () => void;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  style,
  backgroundColor = '#FFFFFF',
  title,
  showBackButton = false,
  rightActions = [],
  onSearchPress,
  onGlobePress,
  onVIPPress,
  onProfilePress,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor,
        },
        style,
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} translucent />
      <View style={styles.header}>
        {/* Left Section - Logo and Title */}
        <View style={styles.leftContainer}>
          <View style={styles.logoWrapper}>
            <Image 
              source={require('../../assets/images/smartube-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>SmartTube</Text>
        </View>

        {/* Right Actions */}
        <View style={styles.rightActionsContainer}>
          {/* 内置的图标按钮 */}
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onGlobePress}
            activeOpacity={0.7}
          >
            <Ionicons name="globe-outline" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onVIPPress}
            activeOpacity={0.7}
          >
            <Ionicons name="star" size={24} color="#FFB800" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onProfilePress}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-youtube" size={24} color="#EA333D" />
          </TouchableOpacity>
          
          {/* 额外的自定义动作 */}
          {rightActions.map((action, index) => (
            <TouchableOpacity
              key={`action-${index}`}
              style={styles.actionButton}
              onPress={action.onPress}
              activeOpacity={0.7}
              testID={action.testID}
            >
              <Ionicons name={action.icon} size={24} color={action.color || "#1C1C1E"} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(159, 159, 159, 0.41)',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  logoWrapper: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: '#1C1C1E',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 6,
  },
});

export default Header;
