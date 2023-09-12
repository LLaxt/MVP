import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MagnetText({ text, extraStyles = {} }) {
  const randRotation = (Math.random() * 3) * (Math.random() < 0.5 ? -1 : 1);
  return (
    <View style={[styles.container, { transform: [{ rotate: `${randRotation}deg`}]}, extraStyles]}>
      <Text>{ text }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
  },
});