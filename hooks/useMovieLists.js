/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shuffleArray from '../utils/shuffleArray';
import useMovies from '../hooks/useMovies';

const useMovieLists = () => {
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [personalMovies, setPersonalMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useMovies(
    'https://api.themoviedb.org/3/movie/popular?api_key=15979629ea6e558ef491c9b9ccee0043',
    setPopularMovies,
    setLoading,
    setError,
  );

  useMovies(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=15979629ea6e558ef491c9b9ccee0043',
    setUpcomingMovies,
    setLoading,
    setError,
  );

  useMovies(
    'https://api.themoviedb.org/3/movie/top_rated?api_key=15979629ea6e558ef491c9b9ccee0043',
    setTopMovies,
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

  // Load all lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyList = await loadList('myList');
      const savedLikedList = await loadList('likedList');
      const savedWatchedList = await loadList('watchedList');
      const savedPersonalMovies = await loadList('personalMovies');
      setMyList(savedMyList);
      setLikedList(savedLikedList);
      setWatchedList(savedWatchedList);
      setPersonalMovies(savedPersonalMovies);
      setLoading(false);
    };
    initializeLists();
  }, []);

  // Fetch and set the recommendations based on liked movies
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const likedMovieIds = likedList.map(movie => movie.id);
      const recommendations = await Promise.all(
        likedMovieIds.map(id =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=15979629ea6e558ef491c9b9ccee0043`,
          )
            .then(response => response.json())
            .then(data => data.results),
        ),
      );

      const allRecommendations = recommendations.flat();
      const uniqueRecommendations = Array.from(
        new Set(allRecommendations.map(movie => movie.id)),
      ).map(id => allRecommendations.find(movie => movie.id === id));

      const shuffledRecommendations = shuffleArray(uniqueRecommendations);
      setPersonalMovies(shuffledRecommendations);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [likedList]);

  // Fetch movie lists
  const fetchMyList = async () => {
    const savedMyList = await loadList('myList');
    setMyList(savedMyList);
  };

  const fetchWatchedList = async () => {
    const savedWatchedList = await loadList('watchedList');
    setWatchedList(savedWatchedList);
  };

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
    // Automatically add movie to watchedList as well
    setWatchedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList
        : [...prevList, movie];
      saveList('watchedList', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Also remove the movie from myList if it exists
    setMyList(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myList', updatedList); // Also update myList
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
    // Also remove the movie from myList if it exists
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
    personalMovies,
    popularMovies,
    upcomingMovies,
    topMovies,
    loading,
    error,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
    fetchRecommendations,
  };
};

export default useMovieLists;
