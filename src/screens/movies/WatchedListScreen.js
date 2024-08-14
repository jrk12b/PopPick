import React from 'react';
import WatchedListFull from '../../components/movies/lists/fullLists/WatchedListFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';

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
    listType,
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

export default WatchedListScreen;
