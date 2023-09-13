import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import FrozenWordMagnet from './FrozenWordMagnet';
import { Text, View, SafeAreaView } from '../components/Themed';



export default function FrozenCard({ staticWords }) {

  const wordList = [];
  for (let key in staticWords.words) {
    wordList.push(
    <FrozenWordMagnet
      word={staticWords.words[key].word}
      key={key}
      x={staticWords.words[key].x}
      y={staticWords.words[key].y} />
    );
  }

  return (
    <View style={styles.shadow}>
      <View style={styles.playCard}>
        { wordList }
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  playCard: {
    flex: 1,
    backgroundColor: 'black',
    margin: 5,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: 'white',
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 6,
    position: 'relative'
  },
  shadow: {
    height: 180,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});