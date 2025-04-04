import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Platform } from 'react-native';

// 扩展 AxiosRequestConfig 类型
interface RetryConfig extends Partial<InternalAxiosRequestConfig> {
  retry?: number;
  retryCount?: number;
}

// 创建 axios 实例
const axiosInstance = axios.create({
  timeout: 30000, // 30 秒超时
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Platform': Platform.OS,
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const retryConfig = config as RetryConfig;
    // 确保初始化重试相关的属性
    retryConfig.retry = retryConfig.retry || 3;
    retryConfig.retryCount = retryConfig.retryCount || 0;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      // 超时重试逻辑
      const config = error.config as RetryConfig;
      if (!config) return Promise.reject(error);

      // 确保重试相关属性已初始化
      const retry = typeof config.retry === 'undefined' ? 3 : config.retry;
      const retryCount = typeof config.retryCount === 'undefined' ? 0 : config.retryCount;
      config.retry = retry;
      config.retryCount = retryCount;

      if (retryCount < retry) {
        config.retryCount = retryCount + 1;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(axiosInstance(config));
          }, 1000 * retryCount);
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 