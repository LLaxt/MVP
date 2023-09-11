import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export default function PlayCard() {
  return (
    <View style={styles.container}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'black',
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});