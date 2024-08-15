import {useEffect} from 'react';

/**
 * Custom hook to fetch movies from a given API URL and manage loading and error states.
 *
 * This hook handles the fetching of movie data from the provided URL, updates the state with the fetched movies,
 * and manages loading and error states.
 *
 * @param {string} url - The API endpoint URL to fetch movie data from.
 * @param {Function} setMovies - State setter function to update the movie list state with the fetched movies.
 * @param {Function} setLoading - State setter function to update the loading state.
 * @param {Function} setError - State setter function to update the error state in case of a fetching error.
 */
const useMovies = (url, setMovies, setLoading, setError) => {
  useEffect(() => {
    // Asynchronous function to fetch movies from the provided URL
    const fetchMovies = async () => {
      setLoading(true); // Set loading state to true before starting the fetch operation
      try {
        const response = await fetch(url); // Fetch data from the API
        const data = await response.json(); // Parse the JSON response
        setMovies(data.results); // Update the movie list state with the fetched results
      } catch (error) {
        setError(error); // Update the error state if an error occurs during fetching
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    };

    fetchMovies(); // Invoke the fetch function
  }, [url, setMovies, setLoading, setError]); // Dependencies array to re-run the effect if any of these values change
};

export default useMovies;
