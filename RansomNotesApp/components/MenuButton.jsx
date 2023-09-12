import React from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Draggable from 'react-native-draggable';
import { Text, View, SafeAreaView } from './Themed';

export default function MenuButton({title, handlePress}) {
  const randRotation = (Math.random() * 3) * (Math.random() < 0.5 ? -1 : 1);
  return (
    <View style={[styles.container, { transform: [{ rotate: `${randRotation}deg`}]}]}>
      <Pressable onPress={handlePress}>
        <Text>{ title }</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
  },
});