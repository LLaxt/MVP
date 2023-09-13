import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import WordList from '../components/WordList';
import GameButton from '../components/GameButton';


export default function IndexScreen() {
  const router = useRouter();
  const [time, setTime] = useState(60);
  const [cardX, setCardX] = useState(0);
  const [cardY, setCardY] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [response, setResponse] = useState({ player: 1 });

  const testPrompt = 'Alert someone that you are slowly sinking in quicksand'
  const testWords = ['hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'words', 'more', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'weird', 'testing', 'hello', 'additional', 'another', 'every'];

  // const submitCard = async () => {
  // logic for submitting words within play card
  //   router.push('/viewAnswers');
  // };
  const checkPosition = (word, x, y, target) => {
    //ADD word.ID once it exists
    //if within bounds, add to response, if not, if it's in the response, remove it
    console.log('Target: ', target);
    if ((y < cardY + cardHeight - 20) && ( y > cardY && x > cardX && x < cardX + cardWidth)) {
      setResponse((prevResponse) => {
        return {
          ...prevResponse,
          [target]: {
            word: word,
            x: x - cardX,
            y: y - cardY,
        }}
      });
    } else if (response[target]) {
      const newResponse = {...response};
      delete newResponse[target];
      setResponse(newResponse);
    }
    console.log('Response: ', response);
  };

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.text}>{ testPrompt }</Text>
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
      <WordList words={testWords} checkPosition={checkPosition}/>
      <View style={styles.footer}>
        <GameButton handlePress={() => {}} title={':' + time} />
        <GameButton handlePress={() => router.push('/viewAnswers')} title='Submit Response' />
        <GameButton handlePress={() => {}} title='Swap' />
        <GameButton handlePress={() => router.push('/')} title='Main Menu' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  playCard: {
    flex: 1,
    backgroundColor: 'black',
    margin: 5,
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
    flex: .4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    flexDirection: 'row',
  }
});
