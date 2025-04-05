// 自定义 EventEmitter 实现，避免使用 Node.js 的 events 模块
class RNEventEmitter {
  private listeners: Record<string, Function[]> = {};

  addListener(eventName: string, listener: Function): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  once(eventName: string, listener: Function): void {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.removeListener(eventName, onceWrapper);
    };
    this.addListener(eventName, onceWrapper);
  }

  removeListener(eventName: string, listener: Function): void {
    if (!this.listeners[eventName]) {
      return;
    }
    const index = this.listeners[eventName].indexOf(listener);
    if (index !== -1) {
      this.listeners[eventName].splice(index, 1);
    }
  }

  removeAllListeners(eventName?: string): void {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }

  emit(eventName: string, ...args: any[]): boolean {
    if (!this.listeners[eventName]) {
      return false;
    }
    
    // 创建一个副本，避免在迭代过程中修改数组
    const listeners = [...this.listeners[eventName]];
    listeners.forEach((listener) => {
      listener(...args);
    });
    
    return true;
  }
}

// 创建一个单例 EventEmitter 实例
const eventEmitter = new RNEventEmitter();

export default eventEmitter;
export type { RNEventEmitter as EventEmitter }; 