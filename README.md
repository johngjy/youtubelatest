# Smartube

Smartube is a React Native application that provides an enhanced YouTube viewing experience with features like ad-free viewing, AI-powered assistance, real-time translation, and more.

## Features

- **Ad-free YouTube Viewing**: Watch YouTube videos without interruptions from ads
- **AI Video Assistant**: Ask questions about video content and get AI-powered answers
- **Real-time Voice & Subtitle Translation**: Translate video content in real-time
- **Background & Picture-in-Picture Playback**: Continue watching while using other apps

## Technology Stack

- React Native / Expo
- TypeScript
- React Navigation
- React Context API for state management
- i18next for internationalization

## Project Structure

```
/src
  /components        # Reusable components (Button, Header, etc.)
  /screens           # Screen components (Welcome, Home, DubLibrary, etc.)
  /contexts          # Context API modules (Auth, VIP, Language, TCoin)
  /navigation        # Navigation configuration
  /constants         # App constants (theme, config, etc.)
  /i18n              # Internationalization resources
  /utils             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Follow the instructions to open the app on your device or emulator

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on an Android device/emulator
- `npm run ios` - Start the app on an iOS simulator
- `npm run web` - Start the app in a web browser
- `npm run lint` - Run ESLint to check code quality

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Smartube React Native - State Management Refactoring

## Overview

This document outlines the state management refactoring plan for the Smartube React Native project, transitioning from a Context-based approach to a more robust and scalable architecture using modern state management solutions.

## State Management Architecture

### 1. Authentication State
- **Technology:** Supabase Auth + Context API
- **Implementation:**
  ```typescript
  import { createClient } from '@supabase/supabase-js'
  import { useSupabaseAuth } from '@supabase/auth-helpers-react'

  // Usage in components
  const { user, signIn, signOut } = useSupabaseAuth()
  ```

### 2. Internationalization (i18n)
- **Technology:** react-i18next
- **Implementation:**
  ```typescript
  import { useTranslation } from 'react-i18next'

  // Usage in components
  const { t, i18n } = useTranslation()
  ```

### 3. Server State Management
- **Technology:** @tanstack/react-query
- **Scope:** All Supabase data interactions
- **Data Categories:**
  - User Profiles
  - VIP Status
  - TCoin Balance
  - Dub Library Videos
  - Watch History
  - Favorites
  - AI Chat History

#### Example Implementation:
```typescript
// hooks/queries/useUserProfile.ts
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => supabase.from('profiles').select('*').eq('id', userId).single(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// hooks/mutations/useUpdateProfile.ts
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: ProfileUpdateData) => 
      supabase.from('profiles').update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile'])
    },
  })
}
```

### 4. Client State Management
- **Technology:** Zustand
- **Scope:** Global UI state and persisted preferences
- **State Categories:**
  - Dub Library Filters
  - AI Assistant UI State
  - Default Dub Language Preference
  - Theme Settings
  - Other UI States

#### Example Implementation:
```typescript
// stores/dubLibraryStore.ts
interface DubLibraryState {
  filters: {
    language: string
    category: string
    sortBy: 'date' | 'popularity'
  }
  setFilters: (filters: Partial<Filters>) => void
}

export const useDubLibraryStore = create<DubLibraryState>()(
  persist(
    (set) => ({
      filters: {
        language: 'en',
        category: 'all',
        sortBy: 'date'
      },
      setFilters: (newFilters) => 
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }))
    }),
    {
      name: 'dub-library-store'
    }
  )
)
```

## Directory Structure

```
src/
├── api/
│   └── supabase.ts              # Supabase client configuration
├── hooks/
│   ├── queries/                 # React Query hooks for data fetching
│   └── mutations/               # React Query hooks for data mutations
├── stores/                      # Zustand stores
│   ├── dubLibraryStore.ts
│   └── aiAssistantStore.ts
├── i18n/                        # Internationalization setup
└── providers/
    └── AppProviders.tsx         # Root providers setup
```

## Migration Guide

### 1. Setup Dependencies
```bash
npm install @tanstack/react-query zustand @supabase/supabase-js i18next react-i18next
```

### 2. Root Provider Setup
```typescript
// src/providers/AppProviders.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'
import { SupabaseProvider } from '@supabase/auth-helpers-react'

const queryClient = new QueryClient()
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const AppProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SupabaseProvider client={supabase}>
      {children}
    </SupabaseProvider>
  </QueryClientProvider>
)
```

## Best Practices

1. **Server State Management (React Query)**
   - Use `useQuery` for data fetching
   - Use `useMutation` for data updates
   - Implement proper error handling
   - Set appropriate stale times and caching strategies

2. **Client State Management (Zustand)**
   - Keep stores small and focused
   - Use persist middleware for data that needs to survive refreshes
   - Avoid storing server data duplicates

3. **Authentication (Supabase Auth)**
   - Use built-in auth methods
   - Implement proper session management
   - Handle auth state changes appropriately

4. **Internationalization (i18n)**
   - Use translation keys consistently
   - Implement proper fallback languages
   - Support RTL languages when needed

## Migration Checklist

- [ ] Set up Supabase client and auth provider
- [ ] Configure React Query and create base queries/mutations
- [ ] Set up Zustand stores for client state
- [ ] Migrate existing Context-based server state to React Query
- [ ] Migrate existing Context-based client state to Zustand
- [ ] Update components to use new hooks
- [ ] Test all functionality
- [ ] Remove deprecated Context providers

## Performance Considerations

1. **React Query**
   - Configure proper staleTime and cacheTime
   - Implement optimistic updates where appropriate
   - Use suspense mode when beneficial

2. **Zustand**
   - Use selective subscriptions
   - Implement proper state splitting
   - Use middleware judiciously

## Testing

1. **Unit Tests**
   - Test React Query hooks with MSW
   - Test Zustand stores
   - Mock Supabase calls appropriately

2. **Integration Tests**
   - Test state interactions
   - Verify data flow
   - Test error scenarios

## Error Handling

1. **Server State**
   - Implement proper error boundaries
   - Handle network errors gracefully
   - Show appropriate loading states

2. **Client State**
   - Validate state updates
   - Implement undo functionality where appropriate
   - Handle edge cases

## Security Considerations

1. **Authentication**
   - Implement proper token management
   - Handle session expiration
   - Secure sensitive data

2. **Data Access**
   - Implement proper access controls
   - Validate data on both client and server
   - Handle unauthorized access appropriately 