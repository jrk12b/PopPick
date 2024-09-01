import React from 'react';
import PersonalRecFull from '../../components/recommendationsFull/PersonalRecFull';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * PersonalRecVideoGamesScreen Component
 *
 * Displays personalized video game recommendations and allows
 * management of lists through a modal. Utilizes custom hooks for
 * state management and rendering.
 */
function PersonalRecVideoGamesScreen() {
  const {
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    personalVideoGames,
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
      <PersonalRecFull
        personalMovies={personalVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
      />
      <OptionsModal
        selectedItem={selectedVideoGame}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        mediaType="Video Games"
      />
    </>
  );
}

export default PersonalRecVideoGamesScreen;
