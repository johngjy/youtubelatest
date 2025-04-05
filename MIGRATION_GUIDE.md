# React Native 0.76 迁移指南

## 背景

本项目已从 React Native 0.72 升级到了 React Native 0.76。此文档记录了迁移过程中所做的主要更改和注意事项，以帮助开发者理解升级过程。

## 主要更改

### 1. 配置文件更新

- **babel.config.js**: 添加了 module-resolver 插件以支持路径别名
- **metro.config.js**: 更新了 Metro 配置，支持新的转换选项和扩展名
- **tsconfig.json**: 更新了 TypeScript 配置以支持 React 18 特性
- **jsconfig.json**: 新增配置文件以支持 JavaScript 文件的路径别名
- **app.json**: 确保应用名称一致性
- **proguard-rules.pro**: 添加了必要的规则以支持新版本

### 2. 新增依赖

```
react-native-screens
react-native-mmkv
@shopify/flash-list
```

### 3. 代码更改

- **App.tsx**: 添加了 React 18 的 StrictMode 和并发模式支持
- **MainActivity.java**: 确保了应用名称一致性

### 4. 类型定义

- 新增 `src/types/global.d.ts` 文件，增强了类型支持

## 升级后的新特性

1. **React 18 特性支持**
   - 并发模式
   - 严格模式
   - 新的 Suspense 功能

2. **性能优化**
   - 改进的 Hermes 引擎支持
   - 更快的启动时间
   - 减少了内存消耗

3. **开发体验提升**
   - 改进的错误信息
   - 更好的调试工具支持
   - 更健壮的类型检查

## 注意事项

1. **Hermes 引擎**
   - 项目默认使用 Hermes 作为 JavaScript 引擎
   - 如遇性能问题，可在 app.json 中设置 `"jsEngine": "jsc"`

2. **第三方库兼容性**
   - 某些第三方库可能需要更新到兼容 React Native 0.76 的版本
   - 特别注意与动画相关的库（如 Reanimated）

3. **新架构（Fabric/TurboModules）**
   - 目前新架构在项目中设置为禁用状态
   - 未来可考虑逐步启用新架构以获取性能提升

## 已知问题与解决方案

1. **EventEmitter 警告**
   - 已在 App.tsx 中添加 LogBox 忽略

2. **导入路径问题**
   - 使用新增的路径别名（如 `@components/*`）来简化导入路径

3. **Metro 打包问题**
   - 如遇打包问题，尝试清除缓存：`npx react-native start --reset-cache`

## 测试清单

在部署到生产环境前，请确保测试以下功能：

1. 应用启动与初始化
2. 导航和路由
3. 网络请求和数据获取
4. 动画和交互
5. 表单和用户输入
6. 应用状态管理
7. 深度链接和通知

## 参考资源

- [React Native 0.76 官方博客](https://reactnative.dev/blog/2024/03/13/0.76)
- [React Native 升级助手](https://react-native-community.github.io/upgrade-helper/)
- [React 18 文档](https://react.dev/) 