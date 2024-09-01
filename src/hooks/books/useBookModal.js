import {useState} from 'react';

/**
 * Custom hook for managing the state and actions of a book modal.
 *
 * This hook handles the display of a modal for book options (e.g., add to list, like, watch).
 * It manages the selected book, the type of list it pertains to, and the visibility of the modal.
 *
 * @param {Function} handleAddToMyList - Function to handle adding/removing books to/from the personal list.
 * @param {Function} handleAddToLiked - Function to handle adding/removing books to/from the liked list.
 * @param {Function} handleAddToWatched - Function to handle adding/removing books to/from the watched list.
 *
 * @returns {Object} - Contains the state and handler functions for the modal.
 */
const useBookModal = (
  handleAddToMyList,
  handleAddToLiked,
  handleAddToWatched,
) => {
  // State to manage the currently selected book
  const [selectedBook, setselectedBook] = useState(null);
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Opens the modal with options for the selected book.
   *
   * @param {Object} book - The book to be displayed in the modal.
   */
  const handleShowOptions = book => {
    setselectedBook(book); // Set the selected book
    setModalVisible(true); // Show the modal
  };

  /**
   * Closes the modal and resets the selected book.
   */
  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
    setselectedBook(null); // Reset the selected book
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
      return; // Exit if no book is selected
    }

    switch (option) {
      case 'addToMyList':
      case 'removeFromMyList':
        handleAddToMyList(selectedBook); // Handle adding/removing the book to/from My List
        break;
      case 'addToLiked':
      case 'removeFromLikedList':
        handleAddToLiked(selectedBook); // Handle adding/removing the book to/from Liked List
        break;
      case 'addToWatched':
      case 'removeFromWatchedList':
        handleAddToWatched(selectedBook); // Handle adding/removing the book to/from Watched List
        break;
      default:
        // Handle unknown options if needed
        break;
    }

    handleCloseModal(); // Close the modal after handling the option
  };

  // Return the current state and handler functions for the modal
  return {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  };
};

export default useBookModal;
