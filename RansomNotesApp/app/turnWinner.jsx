import { StyleSheet, Button, TextInput, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext, useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import GameButton from '../components/GameButton';
import MagnetText from '../components/MagnetText';
import FrozenCard from '../components/FrozenCard';
import GameContext from '../functions/GameContext';
import client from '../functions/client';

//CHECK IF CURRENT ROUND = rooms_rounds
//IF TRUE, NEXT ROUND BUTTON -> VIEW FINAL RESULTS
export default function TurnWinner() {
  const router = useRouter();
  const [ winners, setWinners ] = useState([]);
  const { gameData, setGameData } = useContext(GameContext);


  const testPrompt = 'Alert someone that you are slowly sinking in quicksand ';
  const testWinners = [
    { player_id: 2000,
      username: 'Nat',
      words: [{ player_id: 2, word_id: 1, word: 'a', x: 65, y: 55 },
      { player_id: 2, word_id: 2, word: 'funny', x: 100, y: 55 },
      { player_id: 2, word_id: 3, word: 'answer', x: 170, y: 70 },
      { player_id: 2, word_id: 4, word: '!', x: 250, y: 100 }
    ]},
    { player_id: 2001,
      username: 'Julien',
      words: [{ player_id: 4, word_id: 1, word: 'a', x: 15, y: 15 },
        { player_id: 4, word_id: 2, word: 'really', x: 35, y: 35 },
        { player_id: 4, word_id: 3, word: 'funny', x: 110, y: 65 },
        { player_id: 4, word_id: 4, word: 'answer', x: 170, y: 90 },
        { player_id: 4, word_id: 5, word: '!', x: 250, y: 100 }]}];

  const playerColors = ['#ff9b94', '#ffda94', '#dfff94', '#94efff', '#949fff', '#e894ff'];

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const winnerData = await client.get('/game/getWinners', {
          params: { room_id: gameData.room_id }
        });
        setWinners(winnerData.data.concat(testWinners));
        const roundData = await client.get('/game/getRound', {
          params: {room_id: gameData.room_id,}
        });
        const current_round = roundData.data === 'END' ? 'END' : roundData.data.current_round;
        setGameData({
          ...gameData,
          current_round,
        })
      } catch (err) {
        console.error(err);
    }};
    fetchWinners();
  }, []);



  const winnerList = winners.map((winner, index) => {
    return (
      <View style={styles.list} key={winner.player_id}>
        <View>
          <MagnetText text={winner.username}
            extraStyles={{
              backgroundColor: playerColors[index],
              padding: 5,
              alignSelf: 'flex-start',
              fontSize : 20,
              textAlign: 'center',
            }}
          />
        </View>
        <FrozenCard staticWords={winner.words}/>
      </View>
    )});

  return (
    <SafeAreaView style={styles.container}>
      <Title text={ winners.length > 1 ? 'Round Winners: ' : 'Round Winner:' }/>
      <Text style={styles.prompt}>{ testPrompt }</Text>
      <ScrollView style={styles.scroll}>
        { winnerList }
      </ScrollView>
      <View style={styles.footer}>
        {
          gameData.current_round === 'END' ?
          <GameButton handlePress={() => router.push('/finalWinner')} title="See Final Scores" /> :
           <GameButton handlePress={() => router.push('/writeAnswer')} title="Next round" />
        }
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
    fontSize: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 40,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    flexDirection: 'row',
  }
});