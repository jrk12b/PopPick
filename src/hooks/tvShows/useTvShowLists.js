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
 * Custom hook for managing TV show lists and fetching data from the API.
 *
 * This hook manages various lists related to TV shows (myList, likedList, watchedList)
 * and fetches personalized TV show recommendations based on the user's liked TV shows.
 * It also handles the storage and retrieval of these lists using AsyncStorage.
 *
 * Returns:
 * - myListTvShows: Array - List of TV shows saved to the user's personal list.
 * - likedListTvShows: Array - List of TV shows liked by the user.
 * - watchedListTvShows: Array - List of TV shows watched by the user.
 * - personalTvShows: Array - Personalized TV show recommendations based on liked TV shows.
 * - popularTvShows: Array - List of popular TV shows fetched from the API.
 * - customTvShows: Array - List of custom TV show recommendations based on user preferences.
 * - topTvShows: Array - List of top-rated TV shows fetched from the API.
 * - loading: Boolean - Indicates whether data is currently being loaded.
 * - error: Error | null - Holds any error encountered during data fetching.
 * - handleAddToMyList: Function - Adds or removes a TV show from the personal list.
 * - handleAddToLiked: Function - Adds or removes a TV show from the liked list.
 * - handleAddToWatched: Function - Adds or removes a TV show from the watched list.
 * - fetchMyList: Function - Refreshes the personal list from AsyncStorage.
 * - fetchWatchedList: Function - Refreshes the watched list from AsyncStorage.
 * - fetchRecommendations: Function - Fetches personalized TV show recommendations based on liked TV shows.
 * - fetchCustomRecs: Function - Fetches custom TV show recommendations based on user preferences.
 */
const useTvShowLists = () => {
  // State variables to manage different TV show lists and their loading/error states
  const [myListTvShows, setMyListTvShows] = useState([]);
  const [likedListTvShows, setLikedListTvShows] = useState([]);
  const [watchedListTvShows, setWatchedListTvShows] = useState([]);
  const [personalTvShows, setPersonalTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [customTvShows, setCustomTvShows] = useState([]);
  const [topTvShows, setTopTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular TV shows from the API using the custom hook `useTvShows`
  useTvShows(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
    setPopularTvShows,
    setLoading,
    setError,
  );

  // Fetch top-rated TV shows from the API using the custom hook `useTvShows`
  useTvShows(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
    setTopTvShows,
    setLoading,
    setError,
  );

  /**
   * Function to load a list from AsyncStorage.
   * @param {string} key - The key under which the list is stored in AsyncStorage.
   * @returns {Array} - The loaded list or an empty array if not found or on error.
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
   * @param {string} key - The key under which to store the list in AsyncStorage.
   * @param {Array} list - The list to be stored.
   */
  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  /**
   * useEffect hook to load all TV show lists when the component mounts.
   * It initializes the lists by loading them from AsyncStorage.
   */
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

  /**
   * Fetches personalized TV show recommendations based on the user's liked TV shows.
   * It retrieves recommendations for each liked TV show from the API, removes duplicates,
   * shuffles the results, and updates the `personalTvShows` state.
   */
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const likedTvShowIds = likedListTvShows.map(tvShow => tvShow.id);
      const recommendations = await Promise.all(
        likedTvShowIds.map(id =>
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

  /**
   * Fetches custom TV show recommendations based on user preferences.
   * It filters TV shows based on rating, genres, and removes duplicates.
   * Updates the `customTvShows` state with the filtered results.
   */
  const fetchCustomRecs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allListTvShows = [...popularTvShows, ...topTvShows];
      const allMyLists = [
        ...myListTvShows,
        ...likedListTvShows,
        ...watchedListTvShows,
      ].map(tvShow => tvShow.id);

      const filteredTvShows = allListTvShows.filter(
        tvShow => tvShow.vote_average >= 7.0,
      );

      const allGenres = likedListTvShows.flatMap(tvShow => tvShow.genre_ids);

      const genreCount = _.countBy(allGenres);

      const topGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA) // Sort genres by count descending
        .slice(0, 3) // Select the top 3 genres
        .map(([genre]) => parseInt(genre)); // Convert genre_id to integer

      const similarTvShows = filteredTvShows.filter(tvShow =>
        tvShow.genre_ids.some(genre => topGenres.includes(genre)),
      );

      const uniqueTvShowIds = new Set();

      const filteredSimilarTvShows = similarTvShows.filter(tvShow => {
        if (uniqueTvShowIds.has(tvShow.id)) {
          return false; // Skip if duplicate
        }
        uniqueTvShowIds.add(tvShow.id); // Add to set if unique
        return true;
      });

      const filterList = tvShows =>
        tvShows.filter(tvShow => !allMyLists.includes(tvShow.id));

      setCustomTvShows(filterList(filteredSimilarTvShows));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    popularTvShows,
    topTvShows,
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
  ]);

  /**
   * Fetch and refresh the personal TV show list from AsyncStorage.
   */
  const fetchMyList = async () => {
    const savedMyListTvShows = await loadList('myListTvShows');
    setMyListTvShows(savedMyListTvShows);
  };

  /**
   * Fetch and refresh the watched TV show list from AsyncStorage.
   */
  const fetchWatchedList = async () => {
    const savedWatchedListTvShows = await loadList('watchedListTvShows');
    setWatchedListTvShows(savedWatchedListTvShows);
  };

  // Handle adding/removing tv shows to/from the personal list
  const handleAddToMyList = async tvShow => {
    setMyListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('myListTvShows', updatedList); // Save updated myList to AsyncStorage
      return updatedList;
    });
  };

  // Handle adding/removing tv shows to/from the liked list
  // Also updates watched list and removes the tv show from myList if it exists
  const handleAddToLiked = async tvShow => {
    setLikedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('likedListTvShows', updatedList); // Save updated likedList to AsyncStorage
      return updatedList;
    });
    // Automatically add tv show to watchedList
    setWatchedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList
        : [...prevList, tvShow];
      saveList('watchedListTvShows', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the tv show from myList if it exists
    setMyListTvShows(prevList => {
      const updatedList = prevList.filter(item => item.id !== tvShow.id);
      saveList('myListTvShows', updatedList); // Also update myList
      return updatedList;
    });
  };

  // Handle adding/removing tv shows to/from the watched list
  // Also removes the tv show from myList if it exists
  const handleAddToWatched = async tvShow => {
    setWatchedListTvShows(prevList => {
      const updatedList = prevList.find(item => item.id === tvShow.id)
        ? prevList.filter(item => item.id !== tvShow.id)
        : [...prevList, tvShow];
      saveList('watchedListTvShows', updatedList); // Save updated watchedList to AsyncStorage
      return updatedList;
    });
    // Remove the tv show from myList if it exists
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
