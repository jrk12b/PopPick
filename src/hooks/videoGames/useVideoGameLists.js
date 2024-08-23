/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import {useState, useEffect} from 'react'; // Import React hooks for managing state and lifecycle
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data storage
import {useVideoGamesSimilar} from './useVideoGames'; // Import custom hook for fetching similar video games

const useVideoGameLists = () => {
  // State variables for managing various video game lists and their loading/error states
  const [personalVideoGames, setPersonalVideoGames] = useState([]); // List of personalized video games
  const [myListVideoGames, setMyListVideoGames] = useState([]); // User's personal video game list
  const [likedListVideoGames, setLikedListVideoGames] = useState([]); // List of liked video games
  const [playedListVideoGames, setPlayedListVideoGames] = useState([]); // List of played video games
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling fetch errors

  // Fetch similar video games based on the user's liked video games
  useVideoGamesSimilar(
    setPersonalVideoGames, // State setter for personal video games
    likedListVideoGames, // User's liked video games
    setLoading, // State setter for loading
    setError, // State setter for errors
  );

  // Function to load a list from AsyncStorage
  const loadList = async key => {
    try {
      const listString = await AsyncStorage.getItem(key); // Retrieve the list from AsyncStorage
      return listString ? JSON.parse(listString) : []; // Parse the JSON string, or return an empty array
    } catch (error) {
      console.error(`Failed to load ${key}`, error); // Log any error encountered
      return []; // Return an empty array in case of error
    }
  };

  // Function to save a list to AsyncStorage
  const saveList = async (key, list) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(list)); // Convert list to JSON and save
    } catch (error) {
      console.error(`Failed to save ${key}`, error); // Log any error encountered while saving
    }
  };

  // Handle adding/removing video games to/from the personal list
  const handleAddToMyList = async videoGame => {
    setMyListVideoGames(prevList => {
      // Check if the video game is already in the list
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id) // Remove if found
        : [...prevList, videoGame]; // Add to list if not found
      saveList('myListVideoGames', updatedList); // Save updated list to AsyncStorage
      return updatedList; // Return the updated list
    });
  };

  // Fetch and set the personal list from AsyncStorage
  const fetchMyList = async () => {
    const savedMyList = await loadList('myListVideoGames'); // Load myList from AsyncStorage
    setMyListVideoGames(savedMyList); // Update state with loaded list
  };

  // Fetch and set the played list from AsyncStorage
  const fetchPlayedList = async () => {
    const savedPlayedList = await loadList('playedListVideoGames'); // Load played list from AsyncStorage
    setPlayedListVideoGames(savedPlayedList); // Update state with loaded list
  };

  // Handle adding/removing video games to/from the liked list
  // Also updates played list and removes the video game from myList if it exists
  const handleAddToLiked = async videoGame => {
    setLikedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id) // Remove if found
        : [...prevList, videoGame]; // Add to list if not found
      saveList('likedListVideoGames', updatedList); // Save updated liked list to AsyncStorage
      return updatedList; // Return the updated list
    });
    // Automatically add video game to played list
    setPlayedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList // Keep existing list if found
        : [...prevList, videoGame]; // Add to played list if not found
      saveList('playedListVideoGames', updatedList); // Save updated played list to AsyncStorage
      return updatedList; // Return the updated list
    });
    // Remove the video game from myList if it exists
    setMyListVideoGames(prevList => {
      const updatedList = prevList.filter(item => item.id !== videoGame.id); // Remove from myList
      saveList('myListVideoGames', updatedList); // Also update myList in AsyncStorage
      return updatedList; // Return the updated list
    });
  };

  // Handle adding/removing video games to/from the played list
  // Also removes the video game from myList if it exists
  const handleAddToPlayed = async videoGame => {
    setPlayedListVideoGames(prevList => {
      const updatedList = prevList.find(item => item.id === videoGame.id)
        ? prevList.filter(item => item.id !== videoGame.id) // Remove if found
        : [...prevList, videoGame]; // Add to played list if not found
      saveList('playedListVideoGames', updatedList); // Save updated played list to AsyncStorage
      return updatedList; // Return the updated list
    });
    // Remove the video game from myList if it exists
    setMyListVideoGames(prevList => {
      const updatedList = prevList.filter(item => item.id !== videoGame.id); // Remove from myList
      saveList('myListVideoGames', updatedList); // Also update myList in AsyncStorage
      return updatedList; // Return the updated list
    });
  };

  // Load all video game lists when the component mounts
  useEffect(() => {
    const initializeLists = async () => {
      const savedMyListVideoGames = await loadList('myListVideoGames'); // Load myList from AsyncStorage
      const savedLikedListVideoGames = await loadList('likedListVideoGames'); // Load likedList from AsyncStorage
      const savedPlayedListVideoGames = await loadList('playedListVideoGames'); // Load playedList from AsyncStorage
      setMyListVideoGames(savedMyListVideoGames); // Set state for myList
      setLikedListVideoGames(savedLikedListVideoGames); // Set state for likedList
      setPlayedListVideoGames(savedPlayedListVideoGames); // Set state for playedList
      setLoading(false); // Set loading to false after initialization
    };
    initializeLists(); // Call the function to initialize lists
  }, []);

  // Return the state variables and handler functions to be used in components
  return {
    personalVideoGames,
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    loading,
    error,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToPlayed,
    fetchMyList,
    fetchPlayedList,
  };
};

export default useVideoGameLists; // Export the custom hook for use in components
