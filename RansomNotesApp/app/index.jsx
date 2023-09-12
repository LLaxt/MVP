import { StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import MenuButton from '../components/MenuButton'

//change to menu button to pass in host true/false
export default function IndexScreen() {
  const router = useRouter();
  const [name, onChangeText] = useState('');
  const [isHost, setIsHost] = useState('false');

  const handlePress = (room, host) => {
    if (name === '') {
      Alert.alert('Add Name', 'Please add your name', [{
        text: 'OK',
        onPress: () => {},
      }]);
    } else {
      if (host) {
        setIsHost(true);
      }
      router.push(room);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ransom Notes!</Text>
      <TextInput style={styles.input} value={name} onChangeText={(text) => onChangeText(text)} placeholder="add your name..." />
      <MenuButton handlePress={() => handlePress('/waitingRoom', true)} title="Create a New Game" />
      <MenuButton handlePress={() => handlePress('/waitingRoom')} title="Join an Existing Game" />
      <MenuButton handlePress={() => router.push('/rules')} title="Rules" />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 30,
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#ffe7bf',
  }
});
