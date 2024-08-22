import {useState} from 'react';

/**
 * Custom hook for managing the state and actions of a movie modal.
 *
 * This hook handles the display of a modal for movie options (e.g., add to list, like, watch).
 * It manages the selected movie, the type of list it pertains to, and the visibility of the modal.
 *
 * @param {Function} handleAddToMyList - Function to handle adding/removing movies to/from the personal list.
 * @param {Function} handleAddToLiked - Function to handle adding/removing movies to/from the liked list.
 * @param {Function} handleAddToWatched - Function to handle adding/removing movies to/from the watched list.
 *
 * @returns {Object} - Contains the state and handler functions for the modal.
 */
const useMovieModal = (
  handleAddToMyList,
  handleAddToLiked,
  handleAddToWatched,
) => {
  // State to manage the currently selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State to determine the type of list related to the selected movie (e.g., 'myList', 'liked', 'watched')
  const [listType, setListType] = useState(null);
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Opens the modal with options for the selected movie.
   *
   * @param {Object} movie - The movie to be displayed in the modal.
   * @param {string} type - The type of list the movie pertains to.
   */
  const handleShowOptions = (movie, type) => {
    setSelectedMovie(movie);
    setListType(type);
    setModalVisible(true);
  };

  /**
   * Closes the modal and resets the selected movie and list type.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
    setListType(null);
  };

  /**
   * Handles the selection of an option in the modal.
   *
   * Depending on the option selected, it will call the appropriate handler function and close the modal.
   *
   * @param {string} option - The option selected (e.g., 'addToMyList', 'addToLiked', 'addToWatched', etc.).
   */
  const handleOptionSelect = option => {
    if (!selectedMovie) {
      return; // Exit if no movie is selected
    }

    switch (option) {
      case 'addToMyList':
      case 'removeFromMyList':
        handleAddToMyList(selectedMovie);
        break;
      case 'addtoLiked':
      case 'removeFromLikedList':
        handleAddToLiked(selectedMovie);
        break;
      case 'addToWatched':
      case 'removeFromWatchedList':
        handleAddToWatched(selectedMovie);
        break;
      default:
        // Handle unknown options if needed
        break;
    }

    handleCloseModal(); // Close the modal after handling the option
  };

  // Return the current state and handler functions
  return {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  };
};

export default useMovieModal;
