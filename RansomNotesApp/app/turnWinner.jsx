import { StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import GameButton from '../components/GameButton';
import MagnetText from '../components/MagnetText';

export default function TurnWinner() {
  const router = useRouter();

  const testPlayers = ['Julien', 'Kevin', 'Nat', 'Matthew', 'Rachel', 'Lauren'];
  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  const playerList = testPlayers.map((player, index) => {
    let pad = 3;
    let border = 1;
    let size = 14;
    if (index === testPlayers.length - 1) {
      pad = 10;
      border = 3;
      size = 25;
    }
    return (
    <MagnetText
      text={player}
      key={index}
      extraStyles={{
        backgroundColor: playerColors[index],
        padding: pad,
        fontSize : size,
      }}
    />)})
    .reverse();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
      <Title text='Round Winner: ' />
        { playerList }
      </View>
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
  list: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'fixed',
    flex: 1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    flexDirection: 'row',
  }
});