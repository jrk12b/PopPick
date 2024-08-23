import React from 'react';
import LikedListFull from '../../components/listsFull/LikedListFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/general/OptionsModal';
/**
 * LikedListVideoGamesScreen Component
 *
 * This screen displays the user's list of liked video games and provides functionality
 * for managing the list and viewing options for each game. It utilizes custom hooks
 * to handle video game lists and modal state, and renders a list of liked video games
 * along with a modal for additional actions.
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
