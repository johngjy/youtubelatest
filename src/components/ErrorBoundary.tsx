import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 * 用于捕获子组件树中的 JavaScript 错误，记录错误并显示备用 UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state，下次渲染时显示降级 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 显示降级 UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>出现了一些问题</Text>
          <Text style={styles.message}>
            应用遇到了一个错误，请尝试重新启动。
          </Text>
          {this.state.error && (
            <Text style={styles.errorText}>
              {this.state.error.toString()}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>重试</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.status.error,
    backgroundColor: theme.colors.transparent.black10,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.lg,
    width: '100%',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default ErrorBoundary;
