import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Draggable from 'react-native-draggable';
import { Text, View, SafeAreaView } from './Themed';
import getRandomAngle from '../functions/getRandomAngle'



export default function MenuButton({title, handlePress}) {
  const [randRotation, setRandRotation] = useState(getRandomAngle(3));
  return (
    <View style={[styles.container, { transform: [{ rotate: `${randRotation}deg`}]}]}>
      <TouchableOpacity onPress={handlePress}>
        <Text>{ title }</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
  },
});