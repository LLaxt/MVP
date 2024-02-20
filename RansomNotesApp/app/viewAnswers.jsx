import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import client from '../functions/client';
import GameButton from '../components/GameButton';
import FrozenCard from '../components/FrozenCard';
import GameContext from '../functions/GameContext';


//Conditionally render list only if all responses are in
export default function viewAnswers() {
  const router = useRouter();
  const { gameData, setGameData } = useContext(GameContext);
  const [responses, setResponses] = useState([]);
  const [voting, setVoting] = useState(false);
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand';

  const testAnswers = [
      { player_id: 2002, word_id: 1, word: 'a', x: 65, y: 55 },
      { player_id: 2002, word_id: 2, word: 'funny', x: 100, y: 55 },
      { player_id: 2002, word_id: 3, word: 'answer', x: 170, y: 70 },
      { player_id: 2002, word_id: 4, word: '!', x: 250, y: 100 },
      { player_id: 2003, word_id: 1, word: 'another', x: 20, y: 35 },
      { player_id: 2003, word_id: 2, word: 'funny', x: 100, y: 65 },
      { player_id: 2003, word_id: 3, word: 'answer', x: 170, y: 70 },
      { player_id: 2003, word_id: 4, word: '!', x: 250, y: 100 },
      { player_id: 2004, word_id: 1, word: 'a', x: 15, y: 15 },
      { player_id: 2004, word_id: 2, word: 'really', x: 35, y: 35 },
      { player_id: 2004, word_id: 3, word: 'funny', x: 110, y: 65 },
      { player_id: 2004, word_id: 4, word: 'answer', x: 170, y: 90 },
      { player_id: 2004, word_id: 5, word: '!', x: 250, y: 100 },
      { player_id: 2005, word_id: 1, word: 'a', x: 15, y: 55 },
      { player_id: 2005, word_id: 2, word: 'very', x: 40, y: 55 },
      { player_id: 2005, word_id: 3, word: 'good', x: 90, y: 65 },
      { player_id: 2005, word_id: 4, word: 'answer', x: 170, y: 70 },
      { player_id: 2005, word_id: 5, word: '!', x: 250, y: 100 },
      { player_id: 2006, word_id: 4, word: 'i', x: 40, y: 40 },
      { player_id: 2006, word_id: 5, word: 'love', x: 40, y: 80 },
      { player_id: 2006, word_id: 6, word: '!', x: 180, y: 130 },
      { player_id: 2006, word_id: 7, word: 'coding', x: 100, y: 100 },];

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const responseData = await client.get('/game/getResponses', {
          params: {
            room_id: gameData.room_id
          }
        });
        const playerCards = {};
        const data = responseData.data;
        for (let i = 0; i < data.length; i++) {
          let magnet = { word_id: data[i].word_id, word: data[i].word, x: data[i].x, y: data[i].y,};
          if ( playerCards[data[i].player_id] === undefined ) {
            playerCards[data[i].player_id] = [magnet];
          } else {
            playerCards[data[i].player_id].push(magnet);
          }
        }
        //TEST DATA - REMOVE IN PROD////
        for (let i = 0; i < testAnswers.length; i++) {
          let magnet = { word_id: testAnswers[i].word_id, word: testAnswers[i].word, x: testAnswers[i].x, y: testAnswers[i].y,};
          if ( playerCards[testAnswers[i].player_id] === undefined ) {
            playerCards[testAnswers[i].player_id] = [magnet];
          } else {
            playerCards[testAnswers[i].player_id].push(magnet);
          }
        }
        setResponses(playerCards);
      } catch (err) {
        console.error(err);
      }
    };
    getAnswers();
  },[]);

  const submitVote = async (player) => {
    const vote = {
      player_id: player,
      room_id: gameData.room_id
    };
    try {
      await client.post('/game/submitVote', vote);
      router.push('/turnWinner');
    } catch (err) {
      console.error(err);
    }
  };
  //DO NOT RENDER CURRENT PLAYER ID CARD IN REAL SETTING
  const finalCards = Object.keys(responses).map((id) =>
    <FrozenCard staticWords={responses[id]} key={id} player={id} handleClick={voting ? submitVote : () => {}} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.prompt}>{ gameData.prompt }</Text>
      <ScrollView style={styles.scroll}>
        {finalCards}
      </ScrollView>
      <View style={styles.footer}>
        <GameButton handlePress={() => setVoting(!voting)} title={voting ? 'Click your favorite answer!' : 'Ready to Vote?'} />
        <Text style={styles.text}>Don't forget to screenshot your favorites!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    padding: 5,
    flexWrap: 'wrap',
  },
  playCard: {
    height: 180,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  scroll: {
    flex: 4,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    flex: .08,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
});
