import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordMagnet({word, checkPosition}) {
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);

  const getPosition = (e) => {
    //loc of touch relative to top left screen - offset of touch from top left object = top left obj coord
    let x = e.nativeEvent.pageX - e.nativeEvent.locationX;
    let y = e.nativeEvent.pageY - e.nativeEvent.locationY;
    //change to WORD ID once available
    checkPosition(word, x, y, e.nativeEvent.target);
  };

  //update to word.word... once full obj passed in
  return (
    <Draggable style={styles.draggable} onDragRelease={getPosition} >
      <View style={[styles.magnet, { transform: [{ rotate: `${randRotation}deg`}]}]}  >
        <Text>{ word.word }</Text>
      </View>
    </Draggable>
  );
};

const styles = StyleSheet.create({
  magnet: {
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    position: 'relative',
    display: 'inline-block',
  },
  draggable: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  }
});