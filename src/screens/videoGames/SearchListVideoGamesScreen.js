import React from 'react';
import {View} from 'react-native';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/general/OptionsModal';
import SearchList from '../../components/lists/SearchList';
import styles from '../../styles/styles';

/**
 * SearchListVideoGamesScreen Component
 *
 * Displays a list of search results for video games.
 * Users can interact with each game item through a modal
 * that provides options for managing their lists.
 */
function SearchListVideoGamesScreen() {
  // Custom hook to manage movie lists and their state
  const {
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    searchList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useVideoGameLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedVideoGame,
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
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchList
        searchList={searchList}
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="videoGames"
      />
      {/* Modal for displaying options related to the selected movie */}
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
    </View>
  );
}

export default SearchListVideoGamesScreen;
