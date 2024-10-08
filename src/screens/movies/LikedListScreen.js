import React from 'react';
import LikedListFull from '../../components/listsFull/LikedListFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';

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
        mediaType="Movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="Movies"
      />
    </>
  );
}

export default LikedListScreen;
