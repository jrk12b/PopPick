/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useVideoGames from './useVideoGames';

const useVideoGameLists = () => {
  const [personalVideoGames, setPersonalVideoGames] = useState([]);
  const [myListVideoGames, setMyListVideoGames] = useState([]);
  const [likedListVideoGames, setLikedListVideoGames] = useState([]);
  const [watchedListVideoGames, setWatchedListVideoGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useVideoGames(
    'https://api.igdb.com/v4/games',
    setPersonalVideoGames,
    setLoading,
    setError,
  );

  // Function to load a list from AsyncStorage
  const loadList = async key => {
    try {
      const listString = await AsyncStorage.getItem(key);
      return listString ? JSON.parse(listString) : [];
    } catch (error) {
      console.error(`Failed to load ${key}`, error);
      return [];
    }
  };

  // Load all movie lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyListVideoGames = await loadList('myListVideoGames');
      const savedLikedListVideoGames = await loadList('likedListVideoGames');
      const savedWatchedListVideoGames = await loadList(
        'watchedListVideoGames',
      );
      setMyListVideoGames(savedMyListVideoGames);
      setLikedListVideoGames(savedLikedListVideoGames);
      setWatchedListVideoGames(savedWatchedListVideoGames);
      setLoading(false);
    };
    initializeLists();
  }, []);

  return {
    personalVideoGames,
    myListVideoGames,
    likedListVideoGames,
    watchedListVideoGames,
    loading,
    error,
  };
};

export default useVideoGameLists;
