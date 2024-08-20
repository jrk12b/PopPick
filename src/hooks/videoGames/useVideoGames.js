import {useEffect} from 'react';
import {getAccessToken} from './auth.js'; // Import the function to get access token

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
            'Client-ID': 'wc9b1y8gfoqi232h1fsi5bonzxbnwx',
            Authorization: `Bearer ${accessToken}`,
          },
          body: 'fields *;',
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
