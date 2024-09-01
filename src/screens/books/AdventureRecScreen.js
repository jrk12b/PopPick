import React from 'react';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';
import BookRecFull from '../../components/recommendationsFull/BookRecFull';

/**
 * DramaRecScreen Component
 *
 * This screen displays a list of adventure books that the user has added to their
 * personal collection. It provides functionality for managing the list and viewing
 * options for each book. The component utilizes custom hooks to manage book lists
 * and modal state, and renders the list of books along with a modal for additional options.
 */
function DramaRecScreen() {
  // Fetching book lists and handler functions using the custom hook
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    adventurebooks,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useBookLists();

  // Managing modal state and selected book using the custom hook
  const {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useBookModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      {/* Display the full list of adventure books with options to manage them */}
      <BookRecFull
        books={adventurebooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Adventure"
      />
      {/* Modal for displaying options related to the selected book */}
      <OptionsModal
        selectedItem={selectedBook}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        mediaType="Books"
      />
    </>
  );
}

export default DramaRecScreen;
