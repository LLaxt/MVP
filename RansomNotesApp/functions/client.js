import axios from 'axios';
import Constants from 'expo-constants';

//https://docs.expo.dev/guides/environment-variables/
//https://docs.expo.dev/versions/latest/sdk/constants/
// iOS simulator: exp://192.168.1.55:8081 on iPhone 14 Pro
const getApiUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const hostUri = Constants?.expoConfig?.hostUri;
  if (hostUri) {
    const hostname = hostUri.split(":")[0];
    return `http://${hostname}:3000/`;
  }

  return "http://localhost:3000/";
}

export default client = axios.create({
  baseURL: getApiUrl(),
});