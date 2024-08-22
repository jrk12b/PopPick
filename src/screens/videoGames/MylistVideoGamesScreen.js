import React from 'react';
import MyListFull from '../../components/movies/lists/fullLists/MyListFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import VideoGameOptionsModal from '../../components/videoGames/VideoGameOptionsModal';

/**
 * MyListScreen Component
 *
 * This screen displays the user's list of movies that they have added to their
 * personal list and provides functionality for managing the list and viewing
 * movie options. It uses custom hooks to manage movie lists and modal state,
 * and renders the personal movie list and a modal for additional options.
 */
function MyListVideoGamesScreen() {
  const {
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToPlayed,
  } = useVideoGameLists();

  const {
    selectedVideoGame,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useVideoGameModal(handleAddToMyList, handleAddToLiked, handleAddToPlayed);

  return (
    <>
      <MyListFull
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="videoGames"
      />
      <VideoGameOptionsModal
        selectedVideoGame={selectedVideoGame}
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

export default MyListVideoGamesScreen;
