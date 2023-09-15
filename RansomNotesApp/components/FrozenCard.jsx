import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FrozenWordMagnet from './FrozenWordMagnet';
import { Text, View, SafeAreaView } from '../components/Themed';



export default function FrozenCard({ staticWords, player, handleClick = () => {} }) {
  const wordList = staticWords.map((magnet) =>
    <FrozenWordMagnet
      word={magnet.word}
      key={magnet.word_id}
      x={magnet.x}
      y={magnet.y} />
  );

  return (
    <TouchableOpacity onPress={() => handleClick(player)}>
      <View style={styles.shadow} >
        <View style={styles.playCard}>
          { wordList }
        </View>
      </View>
    </TouchableOpacity>
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
    width: 333,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});