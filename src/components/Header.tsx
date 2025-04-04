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
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../constants/theme';

// 导航栏右侧图标按钮属性
export interface HeaderAction {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  testID?: string;
  tintColor?: string;
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
  title = 'SmartTube',
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
        {/* Left Section */}
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#1C1C1E" />
            </TouchableOpacity>
          )}
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="microphone" size={32} color="#EA333D" />
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        {/* Right Actions */}
        <View style={styles.rightActionsContainer}>
          {rightActions.map((action, index) => (
            <TouchableOpacity
              key={`${action.icon}-${index}`}
              style={styles.actionButton}
              onPress={action.onPress}
              activeOpacity={0.7}
              testID={action.testID}
            >
              <MaterialCommunityIcons 
                name={action.icon} 
                size={24} 
                color={action.tintColor || '#1C1C1E'} 
              />
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
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,  // (44 - 22) / 2 to center the 22px height logo
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: '#1C1C1E',
  },

  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    padding: 8,
    marginLeft: -4, // Compensate for the padding to maintain 20px gap
  },
});

export default Header;
