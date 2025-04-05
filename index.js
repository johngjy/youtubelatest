// 首先导入 polyfill，确保在其他任何代码执行前初始化所有必要的全局对象
import './expo-polyfills';

import 'expo-dev-client';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App); 