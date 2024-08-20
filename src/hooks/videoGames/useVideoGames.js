import {useEffect} from 'react';
import {getAccessToken} from './auth.js';
import {VIDEO_GAME_CLIENT_ID} from '../../config';

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

export default useVideoGames;
