/* eslint-disable radix */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */

import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shuffleArray from '../../utils/shuffleArray';
import useTvShows from './useTvShows';
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
const useTvShowLists = () => {
  // State variables to manage different movie lists and their loading/error states
  const [myListTvShows, setMyListTvShows] = useState([]);
  const [likedListTvShows, setLikedListTvShows] = useState([]);
  const [watchedListTvShows, setWatchedListTvShows] = useState([]);
  const [personalTvShows, setPersonalTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [customTvShows, setCustomTvShows] = useState([]);
  const [topTvShows, setTopTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies from the API using the custom hook `useMovies`
  useTvShows(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
    setPopularTvShows,
    setLoading,
    setError,
  );

  // Fetch top-rated movies from the API using the custom hook `useMovies`
  useTvShows(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
    setTopTvShows,
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
      const savedMyListTvShows = await loadList('myListTvShows');
      const savedLikedListTvShows = await loadList('likedListTvShows');
      const savedWatchedListTvShows = await loadList('watchedListTvShows');
      const savedPersonalTvShows = await loadList('personalTvShows');
      setMyListTvShows(savedMyListTvShows);
      setLikedListTvShows(savedLikedListTvShows);
      setWatchedListTvShows(savedWatchedListTvShows);
      setPersonalTvShows(savedPersonalTvShows);
      setLoading(false);
    };
    initializeLists();
  }, []);

  // Fetch and set recommendations based on liked movies
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const likedMovieIds = likedListTvShows.map(tvShow => tvShow.id);
      const recommendations = await Promise.all(
        likedMovieIds.map(id =>
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`,
          )
            .then(response => response.json())
            .then(data => data.results),
        ),
      );

      // Flatten and deduplicate the recommendations
      const allRecommendations = recommendations.flat();
      const uniqueRecommendations = Array.from(
        new Set(allRecommendations.map(tvShow => tvShow.id)),
      ).map(id => allRecommendations.find(tvShow => tvShow.id === id));

      // Shuffle the recommendations to ensure variety
      const shuffledRecommendations = shuffleArray(uniqueRecommendations);
      setPersonalTvShows(shuffledRecommendations);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [likedListTvShows]);

  const fetchCustomRecs = useCallback(async () => {
    // Set loading state to true and reset any previous errors
    setLoading(true);
    setError(null);

    try {
      // Combine all movies from popular, upcoming, and top lists into a single array
      const allListTvShows = [...popularTvShows, ...topTvShows];
      const allMyLists = [
        ...myListTvShows,
        ...likedListTvShows,
        ...watchedListTvShows,
      ].map(tvShow => tvShow.id);

      // Filter out movies with a vote_average (rating) below 7.0
      const filteredTvShows = allListTvShows.filter(
        tvShow => tvShow.vote_average >= 7.0,
      );

      // Extract all genre_ids from the movies in the likedList and flatten them into a single array
      const allGenres = likedListTvShows.flatMap(tvShow => tvShow.genre_ids);

      // Count the occurrences of each genre_id
      const genreCount = _.countBy(allGenres);

      // Sort the genres by frequency in descending order and select the top 3
      const topGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA) // Sort by count descending
        .slice(0, 3) // Take the top 3 most frequent genres
        .map(([genre]) => parseInt(genre)); // Extract the genre_id and convert to an integer

      // Filter movies that have any of the top 3 genres
      const similarTvShows = filteredTvShows.filter(tvShow =>
        tvShow.genre_ids.some(genre => topGenres.includes(genre)),
      );

      // Create a Set to track unique movie IDs
      const uniqueTvShowIds = new Set();

      // Filter out duplicates by checking if the ID already exists in the Set
      const filteredSimilarTvShows = similarTvShows.filter(tvShow => {
        if (uniqueTvShowIds.has(tvShow.id)) {
          return false; // Skip this movie if it's a duplicate
        }
        uniqueTvShowIds.add(tvShow.id); // Add the movie ID to the Set
        return true; // Keep this movie
      });

      // Set the filtered list of similar movies to the customMovies state
      // Filter out movies that are already on any list
      const filterList = tvShows =>
        tvShows.filter(tvShow => !allMyLists.includes(tvShow.id));

      setCustomTvShows(filterList(filteredSimilarTvShows));
    } catch (err) {
      // If an error occurs, set the error state
      setError(err);
    } finally {
      // Set loading state to false after the operation is complete
      setLoading(false);
    }
  }, [
    popularTvShows,
    topTvShows,
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
  ]);
  // Fetch and set the personal list from AsyncStorage
  const fetchMyList = async () => {
    const savedMyListTvShows = await loadList('myListTvShows');
    setMyListTvShows(savedMyListTvShows);
  };

  // Fetch and set the watched list from AsyncStorage
  const fetchWatchedList = async () => {
    const savedWatchedListTvShows = await loadList('watchedListTvShows');
    setWatchedListTvShows(savedWatchedListTvShows);
  };

  // Handle adding/removing movies to/from the personal list
  const handleAddToMyList = async tvShow => {
    setMyListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('myListTvShows', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the liked list
  // Also updates watched list and removes the movie from myList if it exists
  const handleAddToLiked = async tvShow => {
    setLikedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('likedListTvShows', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add movie to watchedList
    setWatchedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList
        : [...prevList, tvShow];
      saveList('watchedListTvShows', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListTvShows(prevList => {
      const updatedList = prevList.filter(item => item.id !== tvShow.id);
      saveList('myListTvShows', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Handle adding/removing movies to/from the watched list
  // Also removes the movie from myList if it exists
  const handleAddToWatched = async tvShow => {
    setWatchedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('watchedListTvShows', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the movie from myList if it exists
    setMyListTvShows(prevList => {
      const updatedList = prevList.filter(item => item.id !== tvShow.id);
      saveList('myListTvShows', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Return the state variables and handlers to be used in components
  return {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    personalTvShows,
    popularTvShows,
    customTvShows,
    topTvShows,
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

export default useTvShowLists;
