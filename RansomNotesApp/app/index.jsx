import { StyleSheet, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import WordList from '../components/WordList';

//change to menu button to pass in host true/false
export default function IndexScreen() {
  const router = useRouter();
  const testWords = ['hello', 'hi', 'how', 'are', 'you', '?', 'games', 'are', 'fun', '!'];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ransom Notes!</Text>
      <WordList words={testWords}/>
      <Button onPress={() => router.push("/waitingRoom")} title="Go to Game" />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
