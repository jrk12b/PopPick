import React from 'react';
import LikedListFull from '../../components/listsFull/LikedListFull';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * LikedListBooksScreen Component
 *
 * This component displays the user's list of liked books, providing functionality
 * for managing the list and viewing options for each book. It utilizes custom hooks
 * to manage the state of the user's book lists and the modal for options.
 */
function LikedListBooksScreen() {
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useBookLists();

  const {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useBookModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      {/* Render the full list of liked books with options for each book */}
      <LikedListFull
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
      />
      {/* Render the options modal for the selected book */}
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

export default LikedListBooksScreen;
