import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

export default function FrozenWordMagnet({word, x, y}) {
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);

  return (
    <View style={[styles.magnet, { transform: [{ rotate: `${randRotation}deg`}]}, {top:y, left:x}]}>
      <Text>{ word }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  magnet: {
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    position: 'absolute',
  }
});