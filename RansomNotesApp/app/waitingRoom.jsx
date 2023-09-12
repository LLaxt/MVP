import { StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import MenuButton from '../components/MenuButton';
import MagnetText from '../components/MagnetText';

//change to menu button to pass in host true/false
export default function WaitingRoom() {
  const router = useRouter();
  const [name, onChangeText] = useState('');
  const [isHost, setIsHost] = useState('false');
  const testPlayers = ['Lauren', 'Tom', 'Kevin', 'Rachel', 'Matthew', 'Julien'];
  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  const playerList = testPlayers.map((player, index) => <MagnetText text={player} key={index} extraStyles={{ backgroundColor: playerColors[index] }}/>);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Waiting for all players to join...</Text>
      { playerList }
      <MenuButton handlePress={() => router.push('/writeAnswer')} title="Start" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});