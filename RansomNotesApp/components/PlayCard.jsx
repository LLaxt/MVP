import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export default function PlayCard() {
  //add disappearing message to drag words into the black play card area
  return (
    <View style={styles.container}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});