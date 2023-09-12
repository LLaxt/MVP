import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import WordList from '../components/WordList';
import GameButton from '../components/GameButton';


export default function IndexScreen() {
  const router = useRouter();

  const testPrompt = 'Alert someone that you are slowly sinking in quicksand'
  const testWords = ['hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'words', 'more', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'weird', 'testing', 'hello', 'additional', 'another', 'every'];


  // const submitCard = async () => {
  // logic for submitting words within play card
  //   router.push('/viewAnswers');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{ testPrompt }</Text>
      <View style={styles.shadow}><View style={styles.playCard} /></View>
      <WordList words={testWords} />
      <View style={styles.footer}>
        <GameButton handlePress={() => {}} title='0:45' />
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
