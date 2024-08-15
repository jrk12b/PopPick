import React from 'react';
import LikedListFull from '../../components/movies/lists/fullLists/LikedListFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';

/**
 * LikedListScreen Component
 *
 * This screen displays the user's list of liked movies and provides functionality
 * for managing the list and viewing movie options. It uses custom hooks to manage
 * movie lists and modal state, and renders the liked movies list and a modal for
 * additional options.
 */
function LikedListScreen() {
  const {
    likedList,
    myList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useMovieLists();

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <LikedListFull
        likedList={likedList}
        myList={myList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
      />
      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
      />
    </>
  );
}

export default LikedListScreen;
