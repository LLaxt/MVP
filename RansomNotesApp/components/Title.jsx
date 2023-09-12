import { StyleSheet, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text, View } from '../components/Themed';

export default function Title({ text }) {

  return (
      <Text style={styles.title}>{ text }</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
});
