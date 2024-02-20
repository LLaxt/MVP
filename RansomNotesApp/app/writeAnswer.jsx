import { StyleSheet, ScrollView, Platform } from 'react-native';
import client from '../functions/client';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import WordList from '../components/WordList';
import GameButton from '../components/GameButton';
import GameContext from '../functions/GameContext';
import { useIsFocused } from "@react-navigation/native";

//save prompt in context
export default function IndexScreen() {
  const router = useRouter();
  const { gameData, setGameData } = useContext(GameContext);
  const [time, setTime] = useState(60);
  const [cardX, setCardX] = useState(0);
  const [cardY, setCardY] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [words, setWords] = useState([]);
  const [response, setResponse] = useState({});
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand';
  const fetched = useRef(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkRound = async () => {
      try {
        const roundData = await client.get('/game/getRound', {
          params: {room_id: gameData.room_id,}
        });
        const { current_round, rounds } = roundData.data;
        setGameData({
          ...gameData,
          current_round,
          rounds,
        })
      } catch (err) {
        console.error(err);
      }
    }
    checkRound();
  }, [isFocused]);

  useEffect(() => {
    if (fetched.current) {
      return;
    }
    const fetchWordsAndPrompt = async () => {
      try {
        setWords([]);
        setResponse([]);
        const newWords = await client.get('/game/getWords', {
          params: {
            room_id: gameData.room_id,
            player_id: gameData.player_id
          }
        });
        const newPrompt = await client.get('/game/getPrompt', {
          params: { room_id: gameData.room_id }
        })
        setGameData({
          ...gameData,
          prompt: newPrompt.data,
        })
        setWords(newWords.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetched.current = true;
    fetchWordsAndPrompt();
  },[gameData.current_round]);

  const checkPosition = (word, x, y, angle, word_id) => {
    if ((y < cardY + cardHeight - 20) && ( y > cardY && x > cardX && x < cardX + cardWidth)) {
      setResponse((prevResponse) => {
        return {
          ...prevResponse,
          [word_id]: {
            word: word,
            x: x - cardX,
            y: y - cardY,
            angle
        }}
      });
    } else if (response[word_id]) {
      const newResponse = {...response};
      delete newResponse[word_id];
      setResponse(newResponse);
    }
  };

  const submitCard = async () => {
    const submission = {
      player_id: gameData.player_id,
      room_id: gameData.room_id,
      submission: response,
    }
    try {
      await client.post('/game/submitResponse', submission);
      fetched.current = false;
      router.push('/viewAnswers');
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.prompt}>{ gameData.prompt }</Text>
      <View
        style={styles.shadow}
        onLayout={({nativeEvent}) => {
          setCardHeight(nativeEvent.layout.height);
          setCardWidth(nativeEvent.layout.width);
          setCardX(nativeEvent.layout.x);
          setCardY(nativeEvent.layout.y);
        }}
      >
      <View style={styles.playCard} /></View>
      <WordList words={words} checkPosition={checkPosition}/>
      <View style={styles.footer}>
        <GameButton handlePress={() => {}} title={':' + time} />
        <GameButton handlePress={submitCard} title='Submit Response' />
        <GameButton handlePress={() => {}} title='Swap' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  prompt: {
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 5 : 40,
    marginHorizontal: 3,
    fontSize: 16,
  },
  playCard: {
    flex: 1,
    backgroundColor: 'black',
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: 'white',
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 6,
  },
  shadow: {
    height: 180,
    width: 333,
    backgroundColor: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    flex: .3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

  //const testWords = [{ word: 'here', id: 1}, { word: 'are', id: 12}, { word: 'ground', id: 21}, { word: 'and', id: 122}, { word: 'where', id: 14532}, { word: 'move', id: 133}, { word: 'hungry', id: 14}, { word: 'why', id: 441}, { word: 'a', id: 144}, { word: 'help', id: 31}, { word: 'didn\'t', id: 32}, { word: 'can', id: 33}, { word: 'dog', id: 34}, { word: 'try', id: 35}, { word: 'old', id: 36}, { word: 'night', id: 37}, { word: 'moon', id: 38}, { word: 'hand', id: 39}, { word: 'main', id: 40}, { word: 'there', id: 42}, { word: 'candy', id: 43}, { word: 'automobile', id: 44}, { word: 'the', id: 45}, { word: 'lift', id: 46}];