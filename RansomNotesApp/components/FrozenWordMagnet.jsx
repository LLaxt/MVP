import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

export default function FrozenWordMagnet({word}) {
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);

  return (
    <View style={[styles.magnet, { transform: [{ rotate: `${randRotation}deg`}]}]} >
      <Text>{ word }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  magnet: {
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'flexStart',
    position: 'relative',
    display: 'inline-block',
    // shadowColor: 'black',
    // shadowOffset: 10,
    // elevation:
    //   elevation: 20,
    //   shadowColor: 'black',
    // }
  }
});