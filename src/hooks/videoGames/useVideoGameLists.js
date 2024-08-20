import {useState, useEffect} from 'react';
import useVideoGames from './useVideoGames';

const useVideoGameLists = () => {
  const [personalVideoGames, setPersonalVideoGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useVideoGames(
    'https://api.igdb.com/v4/games',
    setPersonalVideoGames,
    setLoading,
    setError,
  );

  useEffect(() => {}, [personalVideoGames]);

  return {
    personalVideoGames,
    loading,
    error,
  };
};

export default useVideoGameLists;
