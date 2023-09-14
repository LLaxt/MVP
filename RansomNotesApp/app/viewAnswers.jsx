//FREEZE THE PROMPT AND MAKE ANSWERS SCROLLABLE
import { StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import GameButton from '../components/GameButton';
import FrozenCard from '../components/FrozenCard';

//Conditionally render list only if all responses are in
export default function viewAnswers() {
  const router = useRouter();
  const [voting, setVoting] = useState(false);
  const [vote, setVote] = useState(0);
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand';

  const testFinalAnswers = [
    {player: 1,
      words: {
        1: { word: 'test', x: 10, y: 20 },
        2: { word: 'test', x: 500, y: 40 },
        3: { word: 'test', x: 30, y: 60 },
        4: { word: 'test', x: 40, y: 90 },}},
    {player: 2,
      words: {
        1: { word: 'a', x: 65, y: 55 },
        2: { word: 'funny', x: 100, y: 55 },
        3: { word: 'answer', x: 170, y: 70 },
        4: { word: '!', x: 250, y: 100 },}},
    {player: 3,
      words: {
        1: { word: 'another', x: 20, y: 35 },
        2: { word: 'funny', x: 100, y: 65 },
        3: { word: 'answer', x: 170, y: 70 },
        4: { word: '!', x: 250, y: 100 },}},
    {player: 4,
      words: {
      1: { word: 'a', x: 15, y: 15 },
      2: { word: 'really', x: 35, y: 35 },
      3: { word: 'funny', x: 110, y: 65 },
      4: { word: 'answer', x: 170, y: 90 },
      5: { word: '!', x: 250, y: 100 },}},
    {player: 5,
      words: {
        1: { word: 'an', x: 65, y: 55 },
        2: { word: 'okay', x: 100, y: 55 },
        3: { word: 'answer', x: 170, y: 70 },
        4: { word: '!', x: 250, y: 100 },}},
    {player: 6,
      words: {
        1: { word: 'a', x: 15, y: 55 },
        2: { word: 'very', x: 40, y: 55 },
        3: { word: 'good', x: 90, y: 65 },
        4: { word: 'answer', x: 170, y: 70 },
        5: { word: '!', x: 250, y: 100 },}}];

  const submitVote = (player) => {
    setVote(player);
    router.push('/turnWinner');
  };
  //DO NOT RENDER CURRENT PLAYER ID CARD
  const finalCards = testFinalAnswers.map((card, index) =>
    <FrozenCard staticWords={card} key={index} handleClick={voting ? submitVote : () => {}} /> );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.prompt}>{ testPrompt }</Text>
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
