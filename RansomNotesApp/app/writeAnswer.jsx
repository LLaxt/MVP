import { StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import PlayCard from '../components/PlayCard';
import WordList from '../components/WordList';
import GameButton from '../components/GameButton';

export default function IndexScreen() {
  const router = useRouter();
  const testPrompt = 'Alert someone that you are slowly sinking in quicksand'
  const testWords = ['hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'words', 'woooooooooords', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!', 'Alphabetical', 'here', 'are', 'some', 'enormously', 'looooooong', 'weird', 'woooooooooords'];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Prompt:</Text>
      <Text style={styles.text}>{ testPrompt }</Text>
      <PlayCard/>
      <WordList words={testWords} />
      <View style={styles.footer}>
        <GameButton handlePress={() => {}} title='0:45' />
        <GameButton handlePress={() => router.push('/viewAnswers')} title='Submit Response' />
        <GameButton handlePress={() => {}} title='Recycle Words' />
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
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
