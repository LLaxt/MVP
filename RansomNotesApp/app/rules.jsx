import { StyleSheet, Button, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { Text, View, SafeAreaView } from '../components/Themed';
import Title from '../components/Title';
import MenuButton from '../components/MenuButton';

//change to menu button to pass in host true/false
export default function IndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Title text='Rules:' />
      <ScrollView>
        <Text style={styles.text}>
          When a prompt is revealed, use your word cloud to create the best response, placing magnets FULLY INSIDE the black play card area. You have until the timer goes off to finish your response. Remember, the more creative, absurd, and horrible the response, the better! When done, click submit. If the timer goes off before you are finished, any words inside the play card will be submitted.{"\n\n"}

          Once all players are done, all plays will be revealed. Each player takes turns reading their own horrendous sentence creation aloud, starting with the person that finished last.{"\n\n"}

          Once all responses have been read, it's time to vote! Click vote and choose your favorite response. The player that gets the most votes wins the turn and receives one point towards the final score. If there is a tie, all first place responses receive one point.{"\n\n"}

          Between turns, your words will be replenished. You may also recycle up to ten words per turn to receive a fresh batch of letters.{"\n\n"}

          The player with the most points at the end of all rounds wins!
        </Text>
      </ScrollView>
      <MenuButton handlePress={() => router.push("/")} title="Back to Main Menu" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
    marginTop: 10,
    lineHeight: 20,
  }
});