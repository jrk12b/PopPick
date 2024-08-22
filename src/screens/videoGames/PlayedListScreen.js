import React from 'react';
import WatchedListFull from '../../components/listsFull/WatchedListFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * WatchedListScreen Component
 *
 * This screen displays the list of movies that the user has watched. It also
 * provides functionality for interacting with individual movies via a modal.
 */
function PlayedListScreen() {
  const {
    playedListVideoGames,
    myListVideoGames,
    likedListVideoGames,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useVideoGameLists();

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useVideoGameModal(
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  );

  return (
    <>
      <WatchedListFull
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="videoGames"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        mediaType="videoGames"
      />
    </>
  );
}

export default PlayedListScreen;
