import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordMagnet({word, checkPosition}) {
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);

  const getPosition = (e) => {
    let x = e.nativeEvent.pageX - e.nativeEvent.locationX;
    let y = e.nativeEvent.pageY - e.nativeEvent.locationY;
    checkPosition(word.word, x, y, word.word_id);
  };

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