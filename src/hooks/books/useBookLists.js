/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */

import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBooks from './useBooks';

/**
 * Custom hook for managing movie lists and fetching data from the API.
 *
 * This hook manages various lists related to movies (myList, likedList, watchedList)
 * and fetches movie recommendations based on the user's liked movies. It also handles
 * the storage and retrieval of these lists using AsyncStorage.
 *
 * Returns:
 * - myList: Array - List of movies saved to the user's personal list.
 * - likedList: Array - List of movies liked by the user.
 * - watchedList: Array - List of movies watched by the user.
 * - personalMovies: Array - Personalized movie recommendations based on liked movies.
 * - popularMovies: Array - List of popular movies fetched from the API.
 * - upcomingMovies: Array - List of upcoming movies fetched from the API.
 * - topMovies: Array - List of top-rated movies fetched from the API.
 * - loading: Boolean - Indicates whether data is currently being loaded.
 * - error: Error | null - Holds any error encountered during data fetching.
 * - handleAddToMyList: Function - Adds or removes a movie from the personal list.
 * - handleAddToLiked: Function - Adds or removes a movie from the liked list.
 * - handleAddToWatched: Function - Adds or removes a movie from the watched list.
 * - fetchMyList: Function - Refreshes the personal list from AsyncStorage.
 * - fetchWatchedList: Function - Refreshes the watched list from AsyncStorage.
 * - fetchRecommendations: Function - Fetches personalized movie recommendations based on liked movies.
 */
const useBookLists = () => {
  // State variables to manage different movie lists and their loading/error states
  const [myListBooks, setMyListBooks] = useState([]);
  const [likedListBooks, setLikedListBooks] = useState([]);
  const [watchedListBooks, setWatchedListBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [nonFictionBooks, setNonFictionBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies from the API using the custom hook `useMovies`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Fiction&startIndex=0&printType=books&orderBy=relevance',
    setFictionBooks,
    setLoading,
    setError,
  );

  // Fetch popular movies from the API using the custom hook `useMovies`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Nonfiction&startIndex=0&printType=books&orderBy=relevance',
    setNonFictionBooks,
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

  // Function to save a list to AsyncStorage
  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  // Load all movie lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyList = await loadList('myListBooks');
      const savedLikedList = await loadList('likedListBooks');
      const savedWatchedList = await loadList('watchedListBooks');
      setMyListBooks(savedMyList);
      setLikedListBooks(savedLikedList);
      setWatchedListBooks(savedWatchedList);
      setLoading(false);
    };
    initializeLists();
  }, []);
  // Fetch and set the personal list from AsyncStorage
  const fetchMyList = async () => {
    const savedMyList = await loadList('myListBooks');
    setMyListBooks(savedMyList);
  };

  // Fetch and set the watched list from AsyncStorage
  const fetchWatchedList = async () => {
    const savedWatchedList = await loadList('watchedListBooks');
    setWatchedListBooks(savedWatchedList);
  };

  // Handle adding/removing movies to/from the personal list
  const handleAddToMyList = async movie => {
    setMyListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('myListBooks', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the liked list
  // Also updates watched list and removes the movie from myList if it exists
  const handleAddToLiked = async movie => {
    setLikedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('likedListBooks', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add movie to watchedList
    setWatchedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList
        : [...prevList, movie];
      saveList('watchedListBooks', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListBooks(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myListBooks', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the watched list
  // Also removes the movie from myList if it exists
  const handleAddToWatched = async movie => {
    setWatchedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('watchedListBooks', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListBooks(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myListBooks', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Return the state variables and handlers to be used in components
  return {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    fictionBooks,
    nonFictionBooks,
    loading,
    error,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
  };
};

export default useBookLists;
