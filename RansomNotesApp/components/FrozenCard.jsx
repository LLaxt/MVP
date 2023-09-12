import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import FrozenWordMagnet from './FrozenWordMagnet';
import { Text, View, SafeAreaView } from '../components/Themed';



export default function FrozenCard({ staticWords }) {

  const words = staticWords.words.map((word, index) =>
    <FrozenWordMagnet word={word.word} key={index} x={word.x} y={word.y} />
  );

  return (
    <View style={styles.playCard}>
      { words }
    </View>
  );
};

const styles = StyleSheet.create({
  playCard: {
    height: 180,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    position: 'relative',
  }
});