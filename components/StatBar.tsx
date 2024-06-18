import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatBarProps {
  max: number;
  actual: number;
}

export const StatBar = ({ max, actual }: StatBarProps) => {
  const progress = (actual / max) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`HP: ${actual}/${max}`}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 15,
  },
});
