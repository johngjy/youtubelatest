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