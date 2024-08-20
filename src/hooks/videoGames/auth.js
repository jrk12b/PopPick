import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url =
  'https://id.twitch.tv/oauth2/token?client_id=wc9b1y8gfoqi232h1fsi5bonzxbnwx&client_secret=plezerjl7i33htunifyiapq6y9rqy3&grant_type=client_credentials';

// Function to get the access token
export async function getAccessToken() {
  try {
    // Make the POST request to the Twitch API
    const response = await axios.post(url);

    // Extract the access token from the response
    const accessToken = response.data.access_token;

    // Save the access token to AsyncStorage for later use
    await saveAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    console.error(
      'Error fetching access token:',
      error.response?.data || error.message,
    );
    throw error;
  }
}

// Function to save the access token to AsyncStorage
async function saveAccessToken(token) {
  try {
    await AsyncStorage.setItem('accessToken', token);
    console.log('Access token saved to AsyncStorage.');
  } catch (error) {
    console.error('Failed to save access token:', error);
  }
}

// Function to read the access token from AsyncStorage
export async function readAccessToken() {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Failed to read access token:', error);
    return null;
  }
}
