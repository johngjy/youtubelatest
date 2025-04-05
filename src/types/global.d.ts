declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// 用于非类型化的第三方库
declare module 'react-native-reanimated/lib/reanimated2/core' {
  export interface AnimatedStyle {}
}

// 全局变量
declare const __DEV__: boolean;

// React 18特定类型
type PropsWithChildren<P> = P & { children?: React.ReactNode }; 