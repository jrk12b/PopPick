import {useEffect} from 'react';

/**
 * Custom hook to fetch books from a given API URL and manage loading and error states.
 *
 * This hook handles the fetching of book data from the provided URL, updates the state with the fetched books,
 * and manages loading and error states.
 *
 * @param {string} url - The API endpoint URL to fetch book data from.
 * @param {Function} setBooks - State setter function to update the book list state with the fetched books.
 * @param {Function} setLoading - State setter function to update the loading state.
 * @param {Function} setError - State setter function to update the error state in case of a fetching error.
 */
const useBooks = (url, setBooks, setLoading, setError) => {
  useEffect(() => {
    /**
     * Asynchronous function to fetch books from the provided URL.
     * It sets the loading state to true, fetches data, and updates the state
     * with the fetched books or an error if one occurs.
     */
    const fetchBooks = async () => {
      setLoading(true); // Set loading state to true before starting the fetch operation
      try {
        const response = await fetch(url, {
          method: 'GET', // Specify GET method for the request
          headers: {
            'Content-Type': 'application/json', // Specify that we're expecting JSON data
            Accept: '*/*', // Accept all content types
            Connection: 'keep-alive', // Keep the connection alive for potential subsequent requests
            'Accept-Encoding': 'gzip, deflate, br', // Specify accepted encoding types for compression
          },
        });
        const data = await response.json(); // Parse the JSON response
        setBooks(data); // Update the book list state with the fetched results
      } catch (error) {
        console.log(error); // Log the error for debugging purposes
        setError(error); // Update the error state if an error occurs during fetching
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    };

    fetchBooks(); // Invoke the fetch function to start fetching books
  }, [url, setBooks, setLoading, setError]); // Dependencies array to re-run the effect if any of these values change
};

export default useBooks;
