import { Ionicons } from '@expo/vector-icons';

// 图标映射表
const iconMap = {
  // 主页图标
  home: 'home',
  // 配音空间图标
  dubspace: 'mic',
  // 订阅图标
  subscriptions: 'film',
  // YouTube 账户图标
  ytaccount: 'logo-youtube',
  // AI 助手图标
  askai: 'chatbubbles',
  // 配音图标
  dubbing: 'recording',
  // 用户/账户图标
  you: 'person-circle',
  account: 'person-circle',
} as const;

export type IconName = keyof typeof iconMap;

// 导出一个函数来获取图标组件
export const getIcon = (name: IconName, props: { size: number; color: string }) => {
  return <Ionicons name={iconMap[name]} {...props} />;
};

export default getIcon; 