/**
 * Expo API Polyfills
 * 
 * 这个文件为缺失的 Expo API 提供兼容实现，以防止在使用某些依赖了这些 API 的第三方库时出现错误。
 */

// 确保全局 expo 对象存在
if (typeof globalThis.expo === 'undefined') {
  globalThis.expo = {};
}

// 提供 EventEmitter 实现
if (typeof globalThis.expo.EventEmitter === 'undefined') {
  globalThis.expo.EventEmitter = class EventEmitter {
    constructor() {
      this.listeners = {};
    }
    
    addEventListener(eventName, listener) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
      return { remove: () => this.removeEventListener(eventName, listener) };
    }
    
    removeEventListener(eventName, listener) {
      if (!this.listeners[eventName]) {
        return;
      }
      const index = this.listeners[eventName].indexOf(listener);
      if (index !== -1) {
        this.listeners[eventName].splice(index, 1);
      }
    }
    
    removeAllListeners(eventName) {
      if (eventName) {
        delete this.listeners[eventName];
      } else {
        this.listeners = {};
      }
    }
    
    emit(eventName, ...args) {
      if (!this.listeners[eventName]) {
        return;
      }
      this.listeners[eventName].forEach(listener => {
        listener(...args);
      });
    }
  };
}

// 如果需要，可以在这里添加更多的 expo API 兼容实现

export default {}; 