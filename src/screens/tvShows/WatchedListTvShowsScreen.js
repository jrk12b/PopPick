import React from 'react';
import WatchedListFull from '../../components/listsFull/WatchedListFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * WatchedListScreen Component
 *
 * This screen displays the list of movies that the user has watched. It also
 * provides functionality for interacting with individual movies via a modal.
 */
function WatchedListTvShowsScreen() {
  const {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useTvShowLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedTvShow,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <WatchedListFull
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
      <OptionsModal
        selectedItem={selectedTvShow}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        mediaType="TV Shows"
      />
    </>
  );
}

export default WatchedListTvShowsScreen;