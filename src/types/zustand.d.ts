declare module 'zustand/middleware' {
  import { StateCreator, StoreMutatorIdentifier } from 'zustand'

  type SerializeOptions<T> = {
    serialize?: (state: T) => string
    deserialize?: (serializedState: string) => T
  }

  type StorageValue<T> = { state: T; version?: number }

  export interface StateStorage {
    getItem: (name: string) => string | null | Promise<string | null>
    setItem: (name: string, value: string) => void | Promise<void>
    removeItem: (name: string) => void | Promise<void>
  }

  export type PersistOptions<T, P> = {
    name: string
    storage?: StateStorage
    partialize?: (state: T) => P
    version?: number
    migrate?: (persistedState: any, version: number) => T | Promise<T>
    merge?: (persistedState: any, currentState: T) => T
    onRehydrateStorage?: (state: T) => ((state?: T, error?: Error) => void) | void
  }

  export type PersistImpl = <T, P>(
    config: StateCreator<T>,
    options: PersistOptions<T, P>
  ) => StateCreator<T>

  export declare const persist: PersistImpl

  export type StorageCreator<T> = (options?: SerializeOptions<T>) => StateStorage

  export declare const createJSONStorage: StorageCreator<any>
} 