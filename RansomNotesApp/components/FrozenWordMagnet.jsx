import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';
import { Text, View, SafeAreaView } from '../components/Themed';

export default function FrozenWordMagnet({word, x, y, angle}) {

  return (
    <View style={[styles.magnet, { transform: [{ rotate: `${angle}deg`}]}, {top:y, left:x}]}>
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