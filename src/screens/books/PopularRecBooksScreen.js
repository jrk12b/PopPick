import React from 'react';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';
import PopularRecFull from '../../components/recommendationsFull/PopularRecFull';

/**
 * MyListScreen Component
 *
 * This screen displays the user's list of movies that they have added to their
 * personal list and provides functionality for managing the list and viewing
 * movie options. It uses custom hooks to manage movie lists and modal state,
 * and renders the personal movie list and a modal for additional options.
 */
function PopularRecsBooksScreen() {
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    popularBooks,
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
      <PopularRecFull
        popularMovies={popularBooks}
        handleShowOptions={handleShowOptions}
        mediaType="books"
      />
      <OptionsModal
        selectedItem={selectedBook}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        mediaType="books"
      />
    </>
  );
}

export default PopularRecsBooksScreen;
