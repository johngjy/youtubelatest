import React from 'react';
import { IconProps } from 'phosphor-react-native';
import { Notebook } from 'phosphor-react-native';

/**
 * 自定义图标组件，用于解决 phosphor-react-native 库中缺失或无法加载的图标
 */
export const NotePencil = (props: IconProps) => {
  // 使用 Notebook 图标作为替代
  return <Notebook {...props} />;
};
