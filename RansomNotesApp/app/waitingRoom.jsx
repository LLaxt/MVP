import { StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import GameContext from '../functions/GameContext';
import client from '../functions/client'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import MenuButton from '../components/MenuButton';
import MagnetText from '../components/MagnetText';

//change to menu button to pass in host true/false

export default function WaitingRoom() {
  const router = useRouter();
  const [name, onChangeText] = useState('');
  const { gameData, setGameData } = useContext(GameContext);

  const testPlayers = ['Lauren', 'Nat', 'Kevin', 'Rachel', 'Matthew', 'Julien'];
  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  //AXIOS GET: repeat - keep getting players and checking until round = 1
  //IF HOST: AXIOS POST - start game, round = 1
  const playerList = testPlayers.map((player, index) => <MagnetText text={player} key={index} extraStyles={{ backgroundColor: playerColors[index] }}/>);

  ///IF NOT HOST, SWITCH BUTTON TO WAITNG FOR HOST TO START GAME
  return (
    <SafeAreaView style={styles.container}>
      <Title text={ gameData.host ? 'Once all players are in,\npress start!' : 'Waiting for host to start\nthe game...'} />
      <Text style={styles.roomcode}>ROOM CODE: {gameData.room_id}</Text>
      { playerList }
      { gameData.host && <MenuButton handlePress={() => router.push('/writeAnswer')} title='      Start!      '/> }
      <Text style={styles.instructions}>Drag word magnets fully inside the black play card area to include them in your response!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomcode: {
    fontSize: 24,
    padding: 20,
    fontFamily: 'CourierPrimeBold',
  },
  instructions: {
    textAlign: 'center',
    padding: 20,
  },
});