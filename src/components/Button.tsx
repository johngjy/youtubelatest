import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../constants/theme';

// 按钮大小变体
export type ButtonSize = 'small' | 'medium' | 'large';

// 按钮变体
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

// 按钮属性接口
export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  textStyle,
  style,
  ...props
}) => {
  // 根据大小确定内边距
  const getPaddingBySize = (): { paddingVertical: number; paddingHorizontal: number } => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.medium,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.medium,
          paddingHorizontal: theme.spacing.large,
        };
      case 'medium':
      default:
        return {
          paddingVertical: theme.spacing.small,
          paddingHorizontal: theme.spacing.medium,
        };
    }
  };

  // 根据大小确定字体大小
  const getFontSizeBySize = (): number => {
    switch (size) {
      case 'small':
        return theme.fontSize.small;
      case 'large':
        return theme.fontSize.large;
      case 'medium':
      default:
        return theme.fontSize.medium;
    }
  };

  // 根据变体确定样式
  const getStylesByVariant = (): { container: ViewStyle; text: TextStyle } => {
    const isDisabled = disabled || loading;

    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: isDisabled
              ? theme.colors.transparent.black10
              : theme.colors.background.paper,
            borderColor: theme.colors.divider,
            borderWidth: 1,
          },
          text: {
            color: isDisabled ? theme.colors.text.disabled : theme.colors.text.secondary,
          },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderColor: isDisabled ? theme.colors.divider : theme.colors.primary,
            borderWidth: 1,
          },
          text: {
            color: isDisabled ? theme.colors.text.disabled : theme.colors.primary,
          },
        };
      case 'text':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: isDisabled ? theme.colors.text.disabled : theme.colors.primary,
          },
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: isDisabled ? theme.colors.transparent.black30 : theme.colors.primary,
          },
          text: {
            color: theme.colors.text.inverse,
          },
        };
    }
  };

  const paddingStyles = getPaddingBySize();
  const fontSize = getFontSizeBySize();
  const variantStyles = getStylesByVariant();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        paddingStyles,
        variantStyles.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={theme.layout.touchableOpacity}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
        />
      ) : (
        <Text style={[styles.text, { fontSize }, variantStyles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    minHeight: theme.layout.touchableMinSize,
  },
  text: {
    fontFamily: theme.fontFamily.medium,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
