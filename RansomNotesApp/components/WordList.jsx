import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import WordMagnet from './WordMagnet';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordList({ words, checkPosition }) {

  const wordList = words.map((word, index) =>
    <View style={styles.wordContainer} key={index}>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    marginTop: 5,
    paddingRight: 13,
    backgroundColor: 'transparent',
  },
  wordContainer: {
    padding: 22,
    backgroundColor: 'transparent',
  }
});