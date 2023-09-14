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
        const { data } = await client.post('/game/createRoom', {
          username: name,
        });
        const { room_id, player_id } = data;
        const currentPlayerData = { room_id, player_id, username: name, host: true };
        setGameData(currentPlayerData);
        router.push(room);
      } catch (err) {
        console.error(err);
        return;
      }
    }
  };

  //VALIDATE ROOM EXISTS AND NOT FULL
  const joinGame = async (room) => {
    if (name === '') {
      Alert.alert('Add Name', 'Please add your name', [{
        text: 'OK',
        onPress: () => {},
      }]);
    } else if (!enterRoomCode) {
      setEnterRoomCode(true);
    } else {
      try {
        const { data } = await client.post('/game/joinRoom', {
          username: name,
          room_id: roomCode,
        });
        const { room_id, player_id } = data;
        const currentPlayerData = { room_id, player_id, username: name };
        setGameData(currentPlayerData);
        router.push(room);
      } catch (err) {
        console.error(err);
        return;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title extraStyles={styles.title} text='Ransom Notes!'/>
      <TextInput style={styles.input} value={name} onChangeText={(text) => onChangeText(text)} placeholder='add your name...' />
      <MenuButton handlePress={() => createGame('/waitingRoom')} title='Create a New Game' />
      <MenuButton handlePress={() => joinGame('/waitingRoom')} title={enterRoomCode ? 'JOIN' : 'Join an Existing Game'} />
      { enterRoomCode && <TextInput style={styles.input} value={roomCode} onChangeText={(text) => setRoomCode(text)} placeholder='enter your room code...' /> }
      <MenuButton handlePress={() => router.push('/rules')} title='Rules' />
    </SafeAreaView>
  );
}

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
