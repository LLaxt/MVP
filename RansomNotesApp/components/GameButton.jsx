import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function GameButton({title, handlePress}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text>{ title }</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    backgroundColor: '#ffe7bf',
    padding: 5,
    marginHorizontal: 5,
  },
});