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
  const [players, setPlayers] = useState([]);
  const { gameData, setGameData } = useContext(GameContext);

  const testPlayers = ['Lauren', 'Nat', 'Kevin', 'Rachel', 'Matthew'];// , 'Julien'
  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  const testPlayerList = testPlayers.map((player, index) => <MagnetText text={player} key={index} extraStyles={{ backgroundColor: playerColors[index] }}/>);

  const getPlayers = async () => {
    try {
      const playerList = await client.get('/game/getPlayers', {
        query: { room_id: gameData.room_id }
      })
      console.log('Playerlist Frontend: ', playerList.data);
      setPlayers(playerList.data.players);
      if (playerList.data.round === 1) {
        setGameData({
          ...gameData,
          round: 1,
        });
        router.push('/writeAnswer');
      }
    } catch(err) {
      console.log(err);
    };
  };



  // while (gameData.round === 0) {
  //   setTimeout(getPlayers, 1000);
  // }

  const startGame = async () => {
    try {
      setGameData({
        ...gameData,
        round: 1,
      });
      await client.post('/game/setNextRound', {
        room_id: gameData.room_id
      })
      router.push('/writeAnswer');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text={ gameData.host ? 'Once all players are in,\npress start!' : 'Waiting for host to start\nthe game...'} />
      <Text style={styles.roomcode}>ROOM CODE: <Text style={styles.roomcode} selectable={true}>{gameData.room_id}</Text></Text>
      { testPlayerList }
      { gameData.host && <MenuButton handlePress={startGame} title={testPlayerList.length > 5 ? 'Room Full - Start the Game!' : '      Start!      '}/> }
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