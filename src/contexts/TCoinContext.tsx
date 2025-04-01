import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

// 交易类型
export enum TransactionType {
  PURCHASE = 'purchase', // 购买 TCoin
  TRANSLATION = 'translation', // 语音翻译
  PLAYBACK = 'playback', // 配音播放
  SUBSCRIPTION = 'subscription', // 会员订阅
  REFUND = 'refund', // 退款
  BONUS = 'bonus', // 奖励或赠送
}

// 交易记录接口
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // 正数为收入，负数为支出
  date: string; // ISO 日期字符串
  description: string;
  referenceId?: string; // 相关引用ID，如视频ID、订单ID等
}

// TCoin 上下文状态类型
interface TCoinContextState {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  addCoins: (
    amount: number,
    type: TransactionType,
    description: string,
    referenceId?: string,
  ) => Promise<void>;
  useCoins: (
    amount: number,
    type: TransactionType,
    description: string,
    referenceId?: string,
  ) => Promise<boolean>;
  getTransactionsByType: (type: TransactionType) => Transaction[];
}

// 创建上下文
const TCoinContext = createContext<TCoinContextState | undefined>(undefined);

// Provider 属性类型
interface TCoinProviderProps {
  children: ReactNode;
}

// TCoin Provider 组件
export const TCoinProvider: React.FC<TCoinProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // 从存储加载 TCoin 数据
  useEffect(() => {
    const loadTCoinData = async () => {
      if (!user) {
        setBalance(0);
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        // 加载余额
        const storedBalance = await AsyncStorage.getItem(`tcoin_balance_${user.id}`);
        if (storedBalance) {
          setBalance(parseInt(storedBalance, 10));
        }

        // 加载交易记录
        const storedTransactions = await AsyncStorage.getItem(`tcoin_transactions_${user.id}`);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Error loading TCoin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTCoinData();
  }, [user]);

  // 保存 TCoin 数据到存储
  const saveTCoinData = async (newBalance: number, newTransactions: Transaction[]) => {
    if (!user) return;

    try {
      await AsyncStorage.setItem(`tcoin_balance_${user.id}`, newBalance.toString());
      await AsyncStorage.setItem(`tcoin_transactions_${user.id}`, JSON.stringify(newTransactions));

      setBalance(newBalance);
      setTransactions(newTransactions);
    } catch (error) {
      console.error('Error saving TCoin data:', error);
      throw error;
    }
  };

  // 添加 TCoin（购买或奖励）
  const addCoins = async (
    amount: number,
    type: TransactionType,
    description: string,
    referenceId?: string,
  ) => {
    if (!user) throw new Error('User not authenticated');
    if (amount <= 0) throw new Error('Amount must be positive');

    const newTransaction: Transaction = {
      id: `tx_${Date.now()}`,
      type,
      amount, // 正数表示收入
      date: new Date().toISOString(),
      description,
      referenceId,
    };

    const newTransactions = [...transactions, newTransaction];
    const newBalance = balance + amount;

    await saveTCoinData(newBalance, newTransactions);
  };

  // 使用 TCoin（支出）
  const useCoins = async (
    amount: number,
    type: TransactionType,
    description: string,
    referenceId?: string,
  ): Promise<boolean> => {
    if (!user) throw new Error('User not authenticated');
    if (amount <= 0) throw new Error('Amount must be positive');

    // 检查余额是否足够
    if (balance < amount) {
      return false; // 余额不足
    }

    const newTransaction: Transaction = {
      id: `tx_${Date.now()}`,
      type,
      amount: -amount, // 负数表示支出
      date: new Date().toISOString(),
      description,
      referenceId,
    };

    const newTransactions = [...transactions, newTransaction];
    const newBalance = balance - amount;

    await saveTCoinData(newBalance, newTransactions);
    return true; // 交易成功
  };

  // 按类型获取交易记录
  const getTransactionsByType = (type: TransactionType): Transaction[] => {
    return transactions.filter((tx) => tx.type === type);
  };

  // 上下文值
  const contextValue: TCoinContextState = {
    balance,
    transactions,
    loading,
    addCoins,
    useCoins,
    getTransactionsByType,
  };

  return <TCoinContext.Provider value={contextValue}>{children}</TCoinContext.Provider>;
};

// 使用 TCoin 上下文的 Hook
export const useTCoin = (): TCoinContextState => {
  const context = useContext(TCoinContext);
  if (context === undefined) {
    throw new Error('useTCoin must be used within a TCoinProvider');
  }
  return context;
};

export default TCoinContext;
