import { StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import axios from 'axios';
import GameContext from '../functions/GameContext';
import client from '../functions/client'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import MenuButton from '../components/MenuButton'

//change to menu button to pass in host true/false
export default function IndexScreen() {
  const { gameData, setGameData } = useContext(GameContext);
  const router = useRouter();
  const [name, onChangeText] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [enterRoomCode, setEnterRoomCode] = useState(false);

  const createGame = async (room) => {
    if (name === '') {
      Alert.alert('Add Name', 'Please add your name', [{
        text: 'OK',
        onPress: () => {},
      }]);
    } else {
      try {
        const { room_id, player_id } = await client.post('/game/createRoom', {
          username: name,
        });
        const currentPlayerData = { room_id, player_id, username: name, host: true };
        console.log('Current player data: ', currentPlayerData);
        setGameData(currentPlayerData);
        router.push(room);
      } catch (err) {
        console.error(err);
        return;
      }
    }
  };

  //make sure room code is case insensitive
  const joinGame = (room, host) => {
    if (name === '') {
      Alert.alert('Add Name', 'Please add your name', [{
        text: 'OK',
        onPress: () => {},
      }]);
    } else if (!enterRoomCode) {
      setEnterRoomCode(true);
    } else {
      //axios call with messages, push to room if valid

      router.push(room);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title extraStyles={styles.title} text='Ransom Notes!'/>
      <TextInput style={styles.input} value={name} onChangeText={(text) => onChangeText(text)} placeholder='add your name...' />
      <MenuButton handlePress={() => createGame('/waitingRoom')} title='Create a New Game' />
      <MenuButton handlePress={() => joinGame('/waitingRoom')} title={enterRoomCode ? 'JOIN' : 'Join an Existing Game'} />
      { enterRoomCode && <TextInput style={styles.input} value={roomCode} onChangeText={(text) => onChangeText(text)} placeholder='enter your room code...' /> }
      <MenuButton handlePress={() => router.push('/rules')} title='Rules' />
    </SafeAreaView>
  );
}

// how navigation works:
// app/game/index.jsx -> /game
// app/game/start.jsx -> "URL" = /game/start
// app/(tabs)/start.jsx -> /start

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 30,
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#ffe7bf',
  },
  title: {
    fontSize: 30,
  }
});
