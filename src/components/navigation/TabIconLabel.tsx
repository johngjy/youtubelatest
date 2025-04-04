import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import getIcon, { IconName } from './TabIcon';

interface TabIconLabelProps {
  icon: IconName;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

const TabIconLabel: React.FC<TabIconLabelProps> = ({
  icon,
  label,
  isActive = false,
  onPress,
}) => {
  const activeColor = '#FF0000';
  const inactiveColor = '#757575';
  const currentColor = isActive ? activeColor : inactiveColor;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <View style={styles.iconContainer}>
        {getIcon(icon, { size: 24, color: currentColor })}
      </View>
      <Text
        style={[
          styles.label,
          { color: currentColor },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 56,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default TabIconLabel; 