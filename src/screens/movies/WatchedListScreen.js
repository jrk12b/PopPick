import React from 'react';
import WatchedListFull from '../../components/listsFull/WatchedListFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * WatchedListScreen Component
 *
 * This screen displays the list of movies that the user has watched. It also
 * provides functionality for interacting with individual movies via a modal.
 */
function WatchedListScreen() {
  const {
    watchedList,
    myList,
    likedList,
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
      <WatchedListFull
        myList={myList}
        likedList={likedList}
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

export default WatchedListScreen;
