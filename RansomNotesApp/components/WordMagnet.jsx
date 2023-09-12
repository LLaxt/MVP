import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordMagnet({word}) {
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);

  //look into gestureState, x0/y0 coordinates, and onDragRelease
  return (
    <Draggable style={styles.draggable}>
      <View style={[styles.magnet, { transform: [{ rotate: `${randRotation}deg`}]}]} >
        <Text>{ word }</Text>
      </View>
    </Draggable>
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
  },
  draggable: {
    backgroundColor: 'transparent',
  }
});