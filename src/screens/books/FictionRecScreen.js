import React from 'react';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';
import BookRecFull from '../../components/recommendationsFull/BookRecFull';

/**
 * FictionRecScreen Component
 *
 * This component displays a full list of fiction books available for the user.
 * It allows users to interact with their book lists, including adding, liking,
 * or marking books as watched. The screen utilizes custom hooks to manage
 * the state of the book lists and the modal that presents options for the
 * selected book.
 */
function FictionRecScreen() {
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    fictionBooks,
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
      {/* Render the full list of fiction books with options for each book */}
      <BookRecFull
        books={fictionBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Fiction"
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

export default FictionRecScreen;
