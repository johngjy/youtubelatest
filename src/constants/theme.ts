// Global theme constants for the app
import { Platform, TextStyle } from 'react-native';

// 颜色
export const colors = {
  // 主色调
  primary: '#FF0000',
  primaryDark: '#0031ca',
  primaryLight: '#8187ff',

  // YouTube红色（仅用于必要的强调或品牌元素）
  youtubeRed: '#FF0000',

  // 文字颜色
  text: {
    primary: '#212121', // 主要文字颜色
    secondary: '#757575', // 次要文字颜色
    disabled: '#9E9E9E', // 禁用状态文字颜色
    inverse: '#FFFFFF', // 反色文字（深色背景上）
  },

  // 背景
  background: '#FFFFFF',
  paper: '#F5F5F5',
  elevated: '#FFFFFF',

  // 边框和分割线
  divider: '#E0E0E0',

  // 状态颜色
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },

  // 特殊用途
  vip: '#FFC107', // VIP元素（金色）
  tcoin: '#FFD700', // TCoin虚拟币（金色）
  bottomSheet: '#FFFFFF', // 底部抽屉背景色

  // 透明度变体
  transparent: {
    black10: 'rgba(0, 0, 0, 0.1)',
    black30: 'rgba(0, 0, 0, 0.3)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black70: 'rgba(0, 0, 0, 0.7)',
    white70: 'rgba(255, 255, 255, 0.7)',
  },
};

// 字体系列
export const fontFamily = {
  // 使用 Roboto 或系统默认无衬线字体
  regular: Platform.select({
    ios: 'Roboto-Regular',
    android: 'Roboto-Regular',
    default: 'sans-serif',
  }),
  medium: Platform.select({
    ios: 'Roboto-Medium',
    android: 'Roboto-Medium',
    default: 'sans-serif-medium',
  }),
  light: Platform.select({
    ios: 'Roboto-Light',
    android: 'Roboto-Light',
    default: 'sans-serif-light',
  }),
  bold: Platform.select({
    ios: 'Roboto-Bold',
    android: 'Roboto-Bold',
    default: 'sans-serif-bold',
  }),
};

// 字号
export const fontSize = {
  xs: 10,
  small: 12, // 小字体，用于注释、标签等
  medium: 14, // 正文字体大小
  large: 16, // 副标题
  xl: 18, // 标题
  xxl: 20, // 大标题
  xxxl: 24, // 超大标题
};

// 字体样式预设
export const typography: Record<string, TextStyle> = {
  // 标题系列
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    lineHeight: 32,
    color: colors.text.primary,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    lineHeight: 28,
    color: colors.text.primary,
  },
  h3: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xl,
    lineHeight: 24,
    color: colors.text.primary,
  },

  // 正文系列
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
    lineHeight: 22,
    color: colors.text.primary,
  },
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    lineHeight: 20,
    color: colors.text.secondary,
  },

  // 特殊用途
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    lineHeight: 22,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    lineHeight: 16,
    color: colors.text.secondary,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.small,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
};

// 间距和大小
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// 圆角
export const borderRadius = {
  small: 4, // 小圆角
  medium: 8, // 中等圆角
  large: 16, // 大圆角
  circular: 1000, // 圆形
};

// 阴影 (iOS & Android)
export const elevation = {
  none: Platform.select({
    ios: {
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  }),
  small: Platform.select({
    ios: {
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.0,
    },
    android: {
      elevation: 3,
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 5.0,
    },
    android: {
      elevation: 5,
    },
  }),
};

// 布局
export const layout = {
  // 固定尺寸
  headerHeight: 56, // 顶部导航栏高度
  bottomTabHeight: 50, // 底部导航栏高度
  screenHorizontalPadding: spacing.md, // 屏幕水平内边距

  // 交互相关
  touchableMinSize: 44, // 最小可触摸区域尺寸
  touchableOpacity: 0.7, // 按下时的透明度

  // 层级
  zIndex: {
    base: 1,
    card: 10,
    dialog: 100,
    tooltip: 500,
    modal: 1000,
  },
};

// 动画定时
export const animation = {
  short: 200, // 短动画时间
  medium: 300, // 中等动画时间
  long: 500, // 长动画时间
};

// 导出完整主题
export const theme = {
  colors,
  fontFamily,
  fontSize,
  typography,
  spacing,
  borderRadius,
  elevation,
  layout,
  animation,
};

export default theme;
