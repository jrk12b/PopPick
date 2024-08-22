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
        const fetchedGamesData = [];

        // Use a Set to gather unique similar game IDs
        const similarGamesSet = new Set();

        likedListVideoGames.forEach(game => {
          if (game.similar_games) {
            game.similar_games.forEach(gameId => similarGamesSet.add(gameId));
          }
        });

        // Convert the Set back to an array
        const uniqueSimilarGames = Array.from(similarGamesSet);

        // Fetch data for each unique similar game ID
        for (const gameId of uniqueSimilarGames) {
          const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Client-ID': VIDEO_GAME_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
            },
            body: `fields *; where id = ${gameId};`,
          });
          const data = await response.json();
          fetchedGamesData.push(data[0]); // Assuming the API returns an array with one game object
        }

        setPersonalVideoGames(fetchedGamesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarVideoGames();
  }, [likedListVideoGames, setLoading, setError, setPersonalVideoGames]);
};

const useVideoGames = (url, setPersonalVideoGames, setLoading, setError) => {
  useEffect(() => {
    const fetchVideoGames = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Client-ID': VIDEO_GAME_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
          },
          body: 'search "Halo"; fields *;',
        });
        const data = await response.json();

        setPersonalVideoGames(data); // Updated to log data directly

        // Ensure the state is set before logging
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoGames();
  }, [url, setPersonalVideoGames, setLoading, setError]);
};

export {useVideoGames, useVideoGamesSimilar};
