/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */

import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBooks from './useBooks';

/**
 * Custom hook for managing book lists and fetching data from the API.
 *
 * This hook manages various lists related to books (myListBooks, likedListBooks, watchedListBooks)
 * and fetches book recommendations based on different genres. It also handles
 * the storage and retrieval of these lists using AsyncStorage.
 *
 * Returns:
 * - myListBooks: Array - List of books saved to the user's personal list.
 * - likedListBooks: Array - List of books liked by the user.
 * - watchedListBooks: Array - List of books watched by the user.
 * - fictionBooks: Array - List of fiction books fetched from the API.
 * - nonFictionBooks: Array - List of non-fiction books fetched from the API.
 * - dramaBooks: Array - List of drama books fetched from the API.
 * - adventureBooks: Array - List of adventure books fetched from the API.
 * - loading: Boolean - Indicates whether data is currently being loaded.
 * - error: Error | null - Holds any error encountered during data fetching.
 * - handleAddToMyList: Function - Adds or removes a book from the personal list.
 * - handleAddToLiked: Function - Adds or removes a book from the liked list.
 * - handleAddToWatched: Function - Adds or removes a book from the watched list.
 * - fetchMyList: Function - Refreshes the personal list from AsyncStorage.
 * - fetchWatchedList: Function - Refreshes the watched list from AsyncStorage.
 */
const useBookLists = () => {
  // State variables to manage different book lists and their loading/error states
  const [myListBooks, setMyListBooks] = useState([]);
  const [likedListBooks, setLikedListBooks] = useState([]);
  const [watchedListBooks, setWatchedListBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [nonFictionBooks, setNonFictionBooks] = useState([]);
  const [dramaBooks, setDramaBooks] = useState([]);
  const [adventureBooks, setAdventureBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fiction books from the API using the custom hook `useBooks`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Fiction&startIndex=0&printType=books&orderBy=relevance',
    setFictionBooks,
    setLoading,
    setError,
  );

  // Fetch non-fiction books from the API using the custom hook `useBooks`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Nonfiction&startIndex=0&printType=books&orderBy=relevance',
    setNonFictionBooks,
    setLoading,
    setError,
  );

  // Fetch drama books from the API using the custom hook `useBooks`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Drama&startIndex=0&printType=books&orderBy=relevance',
    setDramaBooks,
    setLoading,
    setError,
  );

  // Fetch adventure books from the API using the custom hook `useBooks`
  useBooks(
    'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=subject:Adventure&startIndex=0&printType=books&orderBy=relevance',
    setAdventureBooks,
    setLoading,
    setError,
  );

  /**
   * Function to load a list from AsyncStorage.
   *
   * @param {string} key - The key of the list to load from AsyncStorage.
   * @returns {Array} - The parsed list from AsyncStorage, or an empty array if not found.
   */
  const loadList = async key => {
    try {
      const listString = await AsyncStorage.getItem(key);
      return listString ? JSON.parse(listString) : [];
    } catch (error) {
      console.error(`Failed to load ${key}`, error);
      return [];
    }
  };

  /**
   * Function to save a list to AsyncStorage.
   *
   * @param {string} key - The key under which to save the list in AsyncStorage.
   * @param {Array} list - The list to be saved.
   */
  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  // Load all book lists when the component mounts
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

  /**
   * Handle adding/removing books to/from the personal list.
   *
   * @param {Object} book - The book object to add or remove from the list.
   */
  const handleAddToMyList = async book => {
    setMyListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === book.id)
        ? prevList.filter(item => item.id !== book.id)
        : [...prevList, book];
      saveList('myListBooks', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  /**
   * Handle adding/removing books to/from the liked list.
   * Also updates the watched list and removes the book from myList if it exists.
   *
   * @param {Object} book - The book object to add or remove from the list.
   */
  const handleAddToLiked = async book => {
    setLikedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === book.id)
        ? prevList.filter(item => item.id !== book.id)
        : [...prevList, book];
      saveList('likedListBooks', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add book to watchedList
    setWatchedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === book.id)
        ? prevList
        : [...prevList, book];
      saveList('watchedListBooks', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the book from myList if it exists
    setMyListBooks(prevList => {
      const updatedList = prevList.filter(item => item.id !== book.id);
      saveList('myListBooks', updatedList); // Also update myList
      return updatedList;
    });
  };

  /**
   * Handle adding/removing books to/from the watched list.
   * Also removes the book from myList if it exists.
   *
   * @param {Object} book - The book object to add or remove from the list.
   */
  const handleAddToWatched = async book => {
    setWatchedListBooks(prevList => {
      const updatedList = prevList.find(item => item.id === book.id)
        ? prevList.filter(item => item.id !== book.id)
        : [...prevList, book];
      saveList('watchedListBooks', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the book from myList if it exists
    setMyListBooks(prevList => {
      const updatedList = prevList.filter(item => item.id !== book.id);
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
    dramaBooks,
    adventureBooks,
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
