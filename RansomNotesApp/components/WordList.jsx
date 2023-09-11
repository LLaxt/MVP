import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import WordMagnet from './WordMagnet';

export default function WordList({ words }) {

  const wordList = words.map((word, index) => <WordMagnet word={word} key={index} />);

  return (
    <View style={styles.container}>
        { wordList }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    flexWrap: 'wrap',
  },
});