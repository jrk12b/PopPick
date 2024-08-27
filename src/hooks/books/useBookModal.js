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
  const [selectedBook, setselectedBook] = useState(null);
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Opens the modal with options for the selected movie.
   *
   * @param {Object} movie - The movie to be displayed in the modal.
   */
  const handleShowOptions = book => {
    setselectedBook(book);
    setModalVisible(true);
  };

  /**
   * Closes the modal and resets the selected movie and list type.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setselectedBook(null);
  };

  /**
   * Handles the selection of an option in the modal.
   *
   * Depending on the option selected, it will call the appropriate handler function and close the modal.
   *
   * @param {string} option - The option selected (e.g., 'addToMyList', 'addToLiked', 'addToWatched', etc.).
   */
  const handleOptionSelect = option => {
    if (!selectedBook) {
      return; // Exit if no movie is selected
    }

    switch (option) {
      case 'addToMyList':
      case 'removeFromMyList':
        handleAddToMyList(selectedBook);
        break;
      case 'addToLiked':
      case 'removeFromLikedList':
        handleAddToLiked(selectedBook);
        break;
      case 'addToWatched':
      case 'removeFromWatchedList':
        handleAddToWatched(selectedBook);
        break;
      default:
        // Handle unknown options if needed
        break;
    }

    handleCloseModal(); // Close the modal after handling the option
  };

  // Return the current state and handler functions
  return {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  };
};

export default useMovieModal;
