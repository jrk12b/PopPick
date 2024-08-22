/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useVideoGamesSimilar} from './useVideoGames';

const useVideoGameLists = () => {
  const [personalVideoGames, setPersonalVideoGames] = useState([]);
  const [myListVideoGames, setMyListVideoGames] = useState([]);
  const [likedListVideoGames, setLikedListVideoGames] = useState([]);
  const [playedListVideoGames, setPlayedListVideoGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useVideoGamesSimilar(
    setPersonalVideoGames,
    likedListVideoGames,
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

  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  // Handle adding/removing movies to/from the personal list
  const handleAddToMyList = async videoGame => {
    setMyListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id)
        : [...prevList, videoGame];
      saveList('myListVideoGames', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Fetch and set the personal list from AsyncStorage
  const fetchMyList = async () => {
    const savedMyList = await loadList('myListVideoGames');
    setMyListVideoGames(savedMyList);
  };

  // Fetch and set the watched list from AsyncStorage
  const fetchPlayedList = async () => {
    const savedPlayedList = await loadList('playedListVideoGames');
    setPlayedListVideoGames(savedPlayedList);
  };

  // Handle adding/removing movies to/from the liked list
  // Also updates watched list and removes the movie from myList if it exists
  const handleAddToLiked = async videoGame => {
    setLikedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id)
        : [...prevList, videoGame];
      saveList('likedListVideoGames', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add movie to watchedList
    setPlayedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList
        : [...prevList, videoGame];
      saveList('playedListVideoGames', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListVideoGames(prevList => {
      const updatedList = prevList.filter(item => item.id !== videoGame.id);
      saveList('myListVideoGames', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the watched list
  // Also removes the movie from myList if it exists
  const handleAddToPlayed = async videoGame => {
    setPlayedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id)
        : [...prevList, videoGame];
      saveList('playedListVideoGames', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListVideoGames(prevList => {
      const updatedList = prevList.filter(item => item.id !== videoGame.id);
      saveList('myListVideoGames', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Load all movie lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyListVideoGames = await loadList('myListVideoGames');
      const savedLikedListVideoGames = await loadList('likedListVideoGames');
      const savedPlayedListVideoGames = await loadList('playedListVideoGames');
      setMyListVideoGames(savedMyListVideoGames);
      setLikedListVideoGames(savedLikedListVideoGames);
      setPlayedListVideoGames(savedPlayedListVideoGames);
      setLoading(false);
    };
    initializeLists();
  }, []);

  return {
    personalVideoGames,
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    loading,
    error,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToPlayed,
    fetchMyList,
    fetchPlayedList,
  };
};

export default useVideoGameLists;
