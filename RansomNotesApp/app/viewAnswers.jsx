//FREEZE THE PROMPT AND MAKE ANSWERS SCROLLABLE
import { StyleSheet, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import GameButton from '../components/GameButton';
import FrozenCard from '../components/FrozenCard';
import Title from '../components/Title';

export default function viewAnswers() {
  const router = useRouter();
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand';0
  const testFinalAnswers = [
    {
      player: 1,
      words: [
        { word: 'test', x: 10, y: 20 },
        { word: 'test', x: 500, y: 40 },
        { word: 'test', x: 30, y: 60 },
        { word: 'test', x: 40, y: 90 },
      ]},
    {
      player: 2,
      words: [
        { word: 'hi', x: 10, y: 20 },
        { word: 'hi', x: 20, y: 30 },
        { word: 'hi', x: 30, y: 90 },
        { word: 'hi', x: 70, y: 20 },
      ]},
    {
      player: 3,
      words: [
        { word: 'ok', x: 10, y: 20 },
        { word: 'ok', x: 20, y: 20 },
        { word: 'ok', x: 30, y: 20 },
        { word: 'ok', x: 40, y: 20 },
      ]},
      {
        player: 4,
        words: [
          { word: 'neat', x: 10, y: 20 },
          { word: 'neat', x: 20, y: 20 },
          { word: 'neat', x: 30, y: 20 },
          { word: 'neat', x: 40, y: 20 },
      ]},
      {
        player: 5,
        words: [
          { word: 'cool', x: 10, y: 20 },
          { word: 'cool', x: 20, y: 20 },
          { word: 'cool', x: 30, y: 20 },
          { word: 'cool', x: 40, y: 20 },
        ]}];

  const finalCards = testFinalAnswers.map((card, index) => <FrozenCard staticWords={card} key={index}/> );

  return (
    <SafeAreaView style={styles.container}>
      <Title text='Prompt:' />
      <Text style={styles.text}>{ testPrompt }</Text>
      <ScrollView style={styles.scroll}>
        {finalCards}
      </ScrollView>
      <View style={styles.footer}>
        <GameButton handlePress={() => router.push('/writeAnswer')} title='Ready to Vote?' />
      </View>
    </SafeAreaView>
  );
}
//add footer with timer, submit button, and refresh letters

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
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
    flex: .05,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  }
});
