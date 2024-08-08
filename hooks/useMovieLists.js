import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMovieLists = () => {
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

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

  // Function to save a list to AsyncStorage
  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  // Load all lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyList = await loadList('myList');
      const savedLikedList = await loadList('likedList');
      const savedWatchedList = await loadList('watchedList');
      setMyList(savedMyList);
      setLikedList(savedLikedList);
      setWatchedList(savedWatchedList);
    };
    initializeLists();
  }, []);

  // Handle adding/removing movies to/from myList
  const handleAddToMyList = async movie => {
    setMyList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('myList', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from likedList
  const handleAddToLiked = async movie => {
    setLikedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('likedList', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from watchedList
  const handleAddToWatched = async movie => {
    setWatchedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('watchedList', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    setMyList(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myList', updatedList); // Also update myList
      return updatedList;
    });
  };

  return {
    myList,
    likedList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  };
};

export default useMovieLists;
