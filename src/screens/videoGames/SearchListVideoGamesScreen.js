import React from 'react';
import {View} from 'react-native';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import OptionsModal from '../../components/general/OptionsModal';
import SearchList from '../../components/lists/SearchList';
import styles from '../../styles/styles';

/**
 * SearchListScreen Component
 *
 * This screen displays a list of search results for movies. Users can interact
 * with each movie item through a modal that provides options for adding or
 * removing movies from different lists.
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
