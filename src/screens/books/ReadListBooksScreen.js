import React from 'react';
import WatchedListFull from '../../components/listsFull/WatchedListFull';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * ReadListBooksScreen Component
 *
 * This component displays a list of books that the user has marked as read.
 * It provides functionality for managing the read list and viewing options
 * for each book. Custom hooks are utilized to handle the state of the user's
 * book lists and the options modal. The user can perform actions such as
 * liking books or adding them to different lists.
 */
function ReadListBooksScreen() {
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
      {/* Render the full list of watched books with options for each book */}
      <WatchedListFull
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

export default ReadListBooksScreen;
