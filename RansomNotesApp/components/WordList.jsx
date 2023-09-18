import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import WordMagnet from './WordMagnet';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordList({ words, checkPosition }) {

  const wordList = words.map((word) =>
    <View style={styles.wordContainer} key={word.word_id}>
      <WordMagnet word={word} checkPosition={checkPosition} />
    </View>
  );

  return (
    <View style={styles.container}>
        { wordList }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  wordContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  }
});