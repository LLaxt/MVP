import { StyleSheet, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text, View } from '../components/Themed';

export default function Title({ text, extraStyles = {} }) {

  return (
      <Text style={[styles.title, extraStyles]}>{ text }</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'CourierPrimeBold',
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 5,
  },
});
