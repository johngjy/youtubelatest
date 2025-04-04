import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BottomNavHome,
  BottomNavVideoPlayer,
  BottomNavAccount,
  BottomNavDubSpace,
} from '../components/navigation';

const TestNavigationScreen = () => {
  const [currentNav, setCurrentNav] = useState<'home' | 'video' | 'account' | 'dubspace'>('home');

  const renderNavigation = () => {
    switch (currentNav) {
      case 'home':
        return <BottomNavHome />;
      case 'video':
        return <BottomNavVideoPlayer />;
      case 'account':
        return <BottomNavAccount />;
      case 'dubspace':
        return <BottomNavDubSpace />;
      default:
        return <BottomNavHome />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, currentNav === 'home' && styles.activeButton]}
          onPress={() => setCurrentNav('home')}
        >
          <Text style={styles.buttonText}>Home Nav</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentNav === 'video' && styles.activeButton]}
          onPress={() => setCurrentNav('video')}
        >
          <Text style={styles.buttonText}>Video Nav</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentNav === 'account' && styles.activeButton]}
          onPress={() => setCurrentNav('account')}
        >
          <Text style={styles.buttonText}>Account Nav</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentNav === 'dubspace' && styles.activeButton]}
          onPress={() => setCurrentNav('dubspace')}
        >
          <Text style={styles.buttonText}>DubSpace Nav</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationContainer}>
        {renderNavigation()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
  activeButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    fontSize: 12,
    color: '#333333',
  },
  navigationContainer: {
    flex: 1,
  },
});

export default TestNavigationScreen; 