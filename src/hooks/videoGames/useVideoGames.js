import {useEffect} from 'react';
import {getAccessToken} from './auth.js'; // Import the function to retrieve the access token
import {VIDEO_GAME_CLIENT_ID} from '../../config'; // Import the video game client ID from the config

/**
 * Custom hook to fetch similar video games based on a liked list of video games.
 *
 * This hook fetches similar video games whenever the liked list changes and updates the personal video games state.
 *
 * @param {Function} setPersonalVideoGames - Function to set the state for personal video games.
 * @param {Array} likedListVideoGames - List of liked video games.
 * @param {Function} setLoading - Function to set loading state.
 * @param {Function} setError - Function to handle errors.
 */
const useVideoGamesSimilar = (
  setPersonalVideoGames,
  likedListVideoGames,
  setLoading,
  setError,
) => {
  useEffect(() => {
    // Function to fetch similar video games
    const fetchSimilarVideoGames = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const accessToken = await getAccessToken(); // Retrieve the access token

        // Use a Set to gather unique similar game IDs from the liked video games
        const similarGamesSet = new Set();

        // Iterate through each liked video game to extract similar games
        likedListVideoGames.forEach(game => {
          if (game.similar_games) {
            // If similar games exist, add them to the Set
            game.similar_games.forEach(gameId => similarGamesSet.add(gameId));
          }
        });

        // Convert the Set back to an array for further processing
        const uniqueSimilarGames = Array.from(similarGamesSet);

        // Create an array of fetch promises for each unique game ID
        const fetchPromises = uniqueSimilarGames.map(
          gameId =>
            fetch('https://api.igdb.com/v4/games', {
              method: 'POST',
              headers: {
                Accept: 'application/json', // Accept JSON response
                'Client-ID': VIDEO_GAME_CLIENT_ID, // Set the client ID in the header
                Authorization: `Bearer ${accessToken}`, // Set the authorization header with the access token
              },
              body: `fields name, rating, similar_games, first_release_date, cover; where id = ${gameId};`, // Specify the query to fetch the required fields
            }).then(response => response.json().then(data => data[0])), // Process the response to get the first game object
        );

        // Wait for all fetch promises to resolve and gather the results
        const results = await Promise.all(fetchPromises);

        // Filter out any undefined results in case of errors or invalid responses
        const validResults = results.filter(game => game !== undefined);

        // Update the state with the valid results of similar video games
        setPersonalVideoGames(validResults);
      } catch (error) {
        // Handle any errors that occur during the fetch process
        setError(error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchSimilarVideoGames(); // Invoke the function to fetch similar video games
  }, [likedListVideoGames, setLoading, setError, setPersonalVideoGames]); // Dependencies for the useEffect hook
};

export {useVideoGamesSimilar}; // Export the custom hook for use in components
