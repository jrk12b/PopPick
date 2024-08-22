import React from 'react';
import LikedListFull from '../../components/movies/lists/fullLists/LikedListFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/movies/OptionsModal';
/**
 * MyListScreen Component
 *
 * This screen displays the user's list of movies that they have added to their
 * personal list and provides functionality for managing the list and viewing
 * movie options. It uses custom hooks to manage movie lists and modal state,
 * and renders the personal movie list and a modal for additional options.
 */
function LikedListVideoGamesScreen() {
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
      <LikedListFull
        likedList={likedListVideoGames}
        myList={myListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="videoGames"
      />
      <OptionsModal
        selectedItem={selectedVideoGame}
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

export default LikedListVideoGamesScreen;
