/* eslint-disable radix */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */

import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shuffleArray from '../../utils/shuffleArray';
import useMovies from './useMovies';
import {API_KEY} from '../../config';
import _ from 'lodash';

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
const useMovieLists = () => {
  // State variables to manage different movie lists and their loading/error states
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [personalMovies, setPersonalMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [customMovies, setCustomMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies from the API using the custom hook `useMovies`
  useMovies(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
    setPopularMovies,
    setLoading,
    setError,
  );

  // Fetch upcoming movies from the API using the custom hook `useMovies`
  useMovies(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    setUpcomingMovies,
    setLoading,
    setError,
  );

  // Fetch top-rated movies from the API using the custom hook `useMovies`
  useMovies(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
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

  // Load all movie lists when the component mounts
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

  // Fetch and set recommendations based on liked movies
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const likedMovieIds = likedList.map(movie => movie.id);
      const recommendations = await Promise.all(
        likedMovieIds.map(id =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
          )
            .then(response => response.json())
            .then(data => data.results),
        ),
      );

      // Flatten and deduplicate the recommendations
      const allRecommendations = recommendations.flat();
      const uniqueRecommendations = Array.from(
        new Set(allRecommendations.map(movie => movie.id)),
      ).map(id => allRecommendations.find(movie => movie.id === id));

      // Shuffle the recommendations to ensure variety
      const shuffledRecommendations = shuffleArray(uniqueRecommendations);
      setPersonalMovies(shuffledRecommendations);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [likedList]);

  const fetchCustomRecs = useCallback(async () => {
    // Set loading state to true and reset any previous errors
    setLoading(true);
    setError(null);

    try {
      // Combine all movies from popular, upcoming, and top lists into a single array
      const allListMovies = [...popularMovies, ...upcomingMovies, ...topMovies];
      const allMyLists = [...myList, ...likedList, ...watchedList].map(
        movie => movie.id,
      );

      // Filter out movies with a vote_average (rating) below 7.0
      const filteredMovies = allListMovies.filter(
        movie => movie.vote_average >= 7.0,
      );

      // Extract all genre_ids from the movies in the likedList and flatten them into a single array
      const allGenres = likedList.flatMap(movie => movie.genre_ids);

      // Count the occurrences of each genre_id
      const genreCount = _.countBy(allGenres);

      // Sort the genres by frequency in descending order and select the top 3
      const topGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA) // Sort by count descending
        .slice(0, 3) // Take the top 3 most frequent genres
        .map(([genre]) => parseInt(genre)); // Extract the genre_id and convert to an integer

      // Filter movies that have any of the top 3 genres
      const similarMovies = filteredMovies.filter(movie =>
        movie.genre_ids.some(genre => topGenres.includes(genre)),
      );

      // Create a Set to track unique movie IDs
      const uniqueMovieIds = new Set();

      // Filter out duplicates by checking if the ID already exists in the Set
      const filteredSimilarMovies = similarMovies.filter(movie => {
        if (uniqueMovieIds.has(movie.id)) {
          return false; // Skip this movie if it's a duplicate
        }
        uniqueMovieIds.add(movie.id); // Add the movie ID to the Set
        return true; // Keep this movie
      });

      // Set the filtered list of similar movies to the customMovies state
      // Filter out movies that are already on any list
      const filterList = movies =>
        movies.filter(movie => !allMyLists.includes(movie.id));

      setCustomMovies(filterList(filteredSimilarMovies));
    } catch (err) {
      // If an error occurs, set the error state
      setError(err);
    } finally {
      // Set loading state to false after the operation is complete
      setLoading(false);
    }
  }, [
    popularMovies,
    upcomingMovies,
    topMovies,
    myList,
    likedList,
    watchedList,
  ]);
  // Fetch and set the personal list from AsyncStorage
  const fetchMyList = async () => {
    const savedMyList = await loadList('myList');
    setMyList(savedMyList);
  };

  // Fetch and set the watched list from AsyncStorage
  const fetchWatchedList = async () => {
    const savedWatchedList = await loadList('watchedList');
    setWatchedList(savedWatchedList);
  };

  // Handle adding/removing movies to/from the personal list
  const handleAddToMyList = async movie => {
    setMyList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('myList', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the liked list
  // Also updates watched list and removes the movie from myList if it exists
  const handleAddToLiked = async movie => {
    setLikedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('likedList', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add movie to watchedList
    setWatchedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList
        : [...prevList, movie];
      saveList('watchedList', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyList(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myList', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the watched list
  // Also removes the movie from myList if it exists
  const handleAddToWatched = async movie => {
    setWatchedList(prevList => {
      const updatedList = prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie];
      saveList('watchedList', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyList(prevList => {
      const updatedList = prevList.filter(item => item.id !== movie.id);
      saveList('myList', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Return the state variables and handlers to be used in components
  return {
    myList,
    likedList,
    watchedList,
    personalMovies,
    popularMovies,
    upcomingMovies,
    customMovies,
    topMovies,
    loading,
    error,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
    fetchRecommendations,
    fetchCustomRecs,
  };
};

export default useMovieLists;
