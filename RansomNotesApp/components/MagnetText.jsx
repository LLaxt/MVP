import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, SafeAreaView } from '../components/Themed';
import getRandomAngle from '../functions/getRandomAngle'

export default function MagnetText({ text, extraStyles = {} }) {
  const [randRotation, setRandRotation] = useState(getRandomAngle(4));
  return (
    <View style={[styles.container, { transform: [{ rotate: `${randRotation}deg`}]}, extraStyles]}>
      <Text style={extraStyles} >{ text }</Text>
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