import { StyleSheet, Button, TextInput, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import GameButton from '../components/GameButton';
import MagnetText from '../components/MagnetText';
import FrozenCard from '../components/FrozenCard';

export default function TurnWinner() {
  const router = useRouter();
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand';
  const winners = [{
    player_id: 1,
    name: 'Lauren',
    words: {
      1: { word: 'hi', x: 10, y: 20 },
      2: { word: 'test', x: 200, y: 40 },
      3: { word: 'hello', x: 30, y: 60 },
      4: { word: 'neat', x: 40, y: 90 },}},
      {
        player_id: 2,
        name: 'Nat',
        words: {
          1: { word: 'hi', x: 10, y: 20 },
          2: { word: 'test', x: 200, y: 40 },
          3: { word: 'hello', x: 30, y: 60 },
          4: { word: 'neat', x: 40, y: 90 },}}]
  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  const winnerList = winners.map((winner, index) => {
    return (
      <View style={styles.list}>
        <View>
          <MagnetText text={winner.name} key={winner.player_id}
            extraStyles={{
              backgroundColor: playerColors[index],
              padding: 5,
              alignSelf: 'flex-start',
              fontSize : 20,
              textAlign: 'center',
            }}
          />
        </View>
        <FrozenCard staticWords={winner}/>
      </View>
    )});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.prompt}>{ testPrompt }</Text>
      <Title text={ winners.length > 1 ? 'Round Winners: ' : 'Round Winner:' } />
      <ScrollView style={styles.scroll}>
        { winnerList }
      </ScrollView>
      <View style={styles.footer}>
        <GameButton handlePress={() => router.push('/writeAnswer')} title="Next round" />
        <GameButton handlePress={() => router.push('/finalWinner')} title="Finish Game" />
        <GameButton handlePress={() => router.push('/')} title="Main Menu" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  list: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 4,
  },
  footer: {
    position: 'fixed',
    flex: .1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    flexDirection: 'row',
  }
});