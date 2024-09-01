import React from 'react';
import MyListFull from '../../components/listsFull/MyListFull';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * MyListBooksScreen Component
 *
 * This component displays the user's personal list of books that they have added.
 * It allows users to manage their personal book collection and view additional
 * options for each book through a modal. The component utilizes custom hooks to
 * manage the state of the book lists and modal visibility.
 */
function MyListBooksScreen() {
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
      {/* Render the full list of the user's personal books with options for each book */}
      <MyListFull
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

export default MyListBooksScreen;
