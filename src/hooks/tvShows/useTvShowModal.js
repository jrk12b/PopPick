import {useState} from 'react';

/**
 * Custom hook for managing the state and actions of a TV show modal.
 *
 * This hook handles the display of a modal for TV show options (e.g., add to list, like, watch).
 * It manages the selected TV show, the type of list it pertains to, and the visibility of the modal.
 *
 * @param {Function} handleAddToMyList - Function to handle adding/removing TV shows to/from the personal list.
 * @param {Function} handleAddToLiked - Function to handle adding/removing TV shows to/from the liked list.
 * @param {Function} handleAddToWatched - Function to handle adding/removing TV shows to/from the watched list.
 *
 * @returns {Object} - Contains the state and handler functions for the modal.
 */
const useTvShowModal = (
  handleAddToMyList,
  handleAddToLiked,
  handleAddToWatched,
) => {
  // State to manage the currently selected TV show
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Opens the modal with options for the selected TV show.
   *
   * @param {Object} tvShow - The TV show to be displayed in the modal.
   */
  const handleShowOptions = tvShow => {
    setSelectedTvShow(tvShow); // Set the selected TV show
    setModalVisible(true); // Make the modal visible
  };

  /**
   * Closes the modal and resets the selected TV show.
   */
  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedTvShow(null); // Reset the selected TV show
  };

  /**
   * Handles the selection of an option in the modal.
   *
   * Depending on the option selected, it will call the appropriate handler function and close the modal.
   *
   * @param {string} option - The option selected (e.g., 'addToMyList', 'addToLiked', 'addToWatched', etc.).
   */
  const handleOptionSelect = option => {
    if (!selectedTvShow) {
      return; // Exit if no TV show is selected
    }

    switch (option) {
      case 'addToMyList':
      case 'removeFromMyList':
        handleAddToMyList(selectedTvShow); // Handle adding/removing from personal list
        break;
      case 'addToLiked':
      case 'removeFromLiked':
        handleAddToLiked(selectedTvShow); // Handle adding/removing from liked list
        break;
      case 'addToWatched':
      case 'removeFromWatched':
        handleAddToWatched(selectedTvShow); // Handle adding/removing from watched list
        break;
      default:
        // Handle unknown options if needed
        console.warn(`Unknown option selected: ${option}`); // Log unknown option
        break;
    }

    handleCloseModal(); // Close the modal after handling the option
  };

  // Return the current state and handler functions for use in components
  return {
    selectedTvShow, // The currently selected TV show
    modalVisible, // Whether the modal is visible
    handleShowOptions, // Function to show the options modal
    handleCloseModal, // Function to close the modal
    handleOptionSelect, // Function to handle selection of an option
  };
};

export default useTvShowModal;
