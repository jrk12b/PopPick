import {useEffect} from 'react';
import {getAccessToken} from './auth.js';
import {VIDEO_GAME_CLIENT_ID} from '../../config';

const useVideoGamesSimilar = (
  setPersonalVideoGames,
  likedListVideoGames,
  setLoading,
  setError,
) => {
  useEffect(() => {
    const fetchSimilarVideoGames = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();

        // Use a Set to gather unique similar game IDs
        const similarGamesSet = new Set();

        likedListVideoGames.forEach(game => {
          if (game.similar_games) {
            game.similar_games.forEach(gameId => similarGamesSet.add(gameId));
          }
        });

        // Convert the Set back to an array
        const uniqueSimilarGames = Array.from(similarGamesSet);

        // Create an array of fetch promises
        const fetchPromises = uniqueSimilarGames.map(
          gameId =>
            fetch('https://api.igdb.com/v4/games', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Client-ID': VIDEO_GAME_CLIENT_ID,
                Authorization: `Bearer ${accessToken}`,
              },
              body: `fields name, rating, similar_games, first_release_date, cover; where id = ${gameId};`,
            }).then(response => response.json().then(data => data[0])), // Process the response
        );

        // Wait for all fetch promises to resolve
        const results = await Promise.all(fetchPromises);

        // Filter out any undefined results in case of errors
        const validResults = results.filter(game => game !== undefined);

        setPersonalVideoGames(validResults);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarVideoGames();
  }, [likedListVideoGames, setLoading, setError, setPersonalVideoGames]);
};

export {useVideoGamesSimilar};
