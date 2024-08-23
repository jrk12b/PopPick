import {useState} from 'react';

/**
 * Custom hook for managing the state and actions of a video game modal.
 *
 * This hook handles the display of a modal for video game options (e.g., add to list, like, play).
 * It manages the selected video game, the visibility of the modal, and the actions performed on the video game.
 *
 * @param {Function} handleAddToMyList - Function to handle adding/removing video games to/from the personal list.
 * @param {Function} handleAddToLiked - Function to handle adding/removing video games to/from the liked list.
 * @param {Function} handleAddToPlayed - Function to handle adding/removing video games to/from the played list.
 *
 * @returns {Object} - Contains the state and handler functions for the modal.
 */
const useVideoGameModal = (
  handleAddToMyList,
  handleAddToLiked,
  handleAddToPlayed,
) => {
  // State to manage the currently selected video game
  const [selectedVideoGame, setSelectedVideoGame] = useState(null);
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Opens the modal with options for the selected video game.
   *
   * @param {Object} videoGame - The video game to be displayed in the modal.
   */
  const handleShowOptions = videoGame => {
    setSelectedVideoGame(videoGame); // Set the selected video game
    setModalVisible(true); // Show the modal
  };

  /**
   * Closes the modal and resets the selected video game.
   */
  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedVideoGame(null); // Clear the selected video game
  };

  /**
   * Handles the selection of an option in the modal.
   *
   * Depending on the option selected, it will call the appropriate handler function and close the modal.
   *
   * @param {string} option - The option selected (e.g., 'addToMyList', 'addToLiked', 'addToPlayed', etc.).
   */
  const handleOptionSelect = option => {
    if (!selectedVideoGame) {
      return; // Exit if no video game is selected
    }

    switch (option) {
      case 'addToMyList':
      case 'removeFromMyList':
        handleAddToMyList(selectedVideoGame); // Call the function to add/remove from personal list
        break;
      case 'addToLiked':
      case 'removeFromLiked':
        handleAddToLiked(selectedVideoGame); // Call the function to add/remove from liked list
        break;
      case 'addToPlayed':
      case 'removeFromPlayed':
        handleAddToPlayed(selectedVideoGame); // Call the function to add/remove from played list
        break;
      default:
        // Handle unknown options if needed
        console.warn(`Unknown option selected: ${option}`); // Log a warning for unhandled options
        break;
    }

    handleCloseModal(); // Close the modal after handling the selected option
  };

  // Return the current state and handler functions for use in the component
  return {
    selectedVideoGame,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  };
};

export default useVideoGameModal; // Export the custom hook for use in components
