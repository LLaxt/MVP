import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import GameContext from '../utils/GameContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout () {
  const [loaded, error] = useFonts({
    CourierPrime: require('../assets/fonts/CourierPrime-Regular.ttf'),
    CourierPrimeBold: require('../assets/fonts/CourierPrime-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [gameData, setGameData] = useState({});

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GameContext.Provider value={{gameData, setGameData}}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="waitingRoom" options={{ headerShown: false }} />
          <Stack.Screen name="rules" options={{ headerShown: false }} />
          <Stack.Screen name="writeAnswer" options={{ headerShown: false }} />
          <Stack.Screen name="viewAnswers" options={{ headerShown: false }} />
          <Stack.Screen name="turnWinner" options={{ headerShown: false }} />
          <Stack.Screen name="finalWinner" options={{ headerShown: false }} />
        </Stack>
      </GameContext.Provider>
    </ThemeProvider>
  );
}
