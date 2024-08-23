import axios from 'axios'; // Import axios for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage

// URL for obtaining an access token from Twitch API
const url =
  'https://id.twitch.tv/oauth2/token?client_id=wc9b1y8gfoqi232h1fsi5bonzxbnwx&client_secret=plezerjl7i33htunifyiapq6y9rqy3&grant_type=client_credentials';

// Function to get the access token from Twitch
export async function getAccessToken() {
  try {
    // Make the POST request to the Twitch API to obtain an access token
    const response = await axios.post(url);

    // Extract the access token from the response data
    const accessToken = response.data.access_token;

    // Save the access token to AsyncStorage for future use
    await saveAccessToken(accessToken);

    return accessToken; // Return the access token
  } catch (error) {
    // Log any error encountered during the request
    console.error(
      'Error fetching access token:',
      error.response?.data || error.message,
    );
    throw error; // Rethrow the error for handling in the calling function
  }
}

// Function to save the access token to AsyncStorage
async function saveAccessToken(token) {
  try {
    // Store the access token in AsyncStorage with the key 'accessToken'
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    // Log any error encountered while saving the token
    console.error('Failed to save access token:', error);
  }
}

// Function to read the access token from AsyncStorage
export async function readAccessToken() {
  try {
    // Retrieve the access token from AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');
    return token; // Return the retrieved token
  } catch (error) {
    // Log any error encountered while reading the token
    console.error('Failed to read access token:', error);
    return null; // Return null if there was an error
  }
}
