import React from 'react';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';
import BookRecFull from '../../components/recommendationsFull/BookRecFull';

/**
 * NonFictionRecScreen Component
 *
 * This component displays a list of non-fiction books that the user can view
 * and manage. It utilizes custom hooks to handle the state of the user's
 * book lists and the modal for additional options. Users can see their
 * non-fiction book recommendations and perform actions such as liking or
 * adding books to their personal lists through the options modal.
 */
function NonFictionRecScreen() {
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    nonFictionBooks,
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
      {/* Render the full list of non-fiction books with options for each book */}
      <BookRecFull
        books={nonFictionBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Non-Fiction"
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

export default NonFictionRecScreen;
