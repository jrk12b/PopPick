import {useEffect} from 'react';

/**
 * Custom hook to fetch TV shows from a given API URL and manage loading and error states.
 *
 * This hook handles the fetching of TV show data from the provided URL, updates the state with the fetched shows,
 * and manages loading and error states.
 *
 * @param {string} url - The API endpoint URL to fetch TV show data from.
 * @param {Function} setTvShows - State setter function to update the TV show list state with the fetched shows.
 * @param {Function} setLoading - State setter function to indicate the loading state during data fetching.
 * @param {Function} setError - State setter function to update the error state in case of a fetching error.
 */
const useTvShows = (url, setTvShows, setLoading, setError) => {
  useEffect(() => {
    // Asynchronous function to fetch TV shows from the provided URL
    const fetchTvShows = async () => {
      setLoading(true); // Set loading state to true before starting the fetch operation
      try {
        const response = await fetch(url); // Fetch data from the API
        const data = await response.json(); // Parse the JSON response

        // Update the TV show list state with the fetched results
        setTvShows(data.results);
      } catch (error) {
        // Update the error state if an error occurs during fetching
        setError(error);
      } finally {
        // Set loading state to false after fetching is complete, regardless of success or failure
        setLoading(false);
      }
    };

    fetchTvShows(); // Invoke the fetch function to initiate data retrieval
  }, [url, setTvShows, setLoading, setError]); // Dependencies array to re-run the effect if any of these values change
};

export default useTvShows;
