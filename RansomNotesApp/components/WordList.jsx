import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import WordMagnet from './WordMagnet';

export default function WordList({ words }) {

  const wordList = words.map((word, index) => <View style={styles.wordContainer} key={index}><WordMagnet word={word} /></View>);

  return (
    <View style={styles.container}>
        { wordList }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    paddingRight: 13,
  },
  wordContainer: {
    padding: 22,
  }
});