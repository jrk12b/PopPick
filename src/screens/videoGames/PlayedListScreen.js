import React from 'react';
import PlayedListFull from '../../components/videoGames/lists/fullLists/PlayedListFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import VideoGameOptionsModal from '../../components/videoGames/VideoGameOptionsModal';

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
      <PlayedListFull
        playedListVideoGames={playedListVideoGames}
        handleShowOptions={handleShowOptions}
      />
      <VideoGameOptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myListVideoGames={myListVideoGames}
        likedListVideoGames={likedListVideoGames}
        playedListVideoGames={playedListVideoGames}
      />
    </>
  );
}

export default PlayedListScreen;
