import React from 'react';
import {View} from 'react-native';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import VideoGameOptionsModal from '../../components/videoGames/VideoGameOptionsModal';
import SearchListVideoGames from '../../components/videoGames/lists/SearchListVideoGames';
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

  // Wrapper function to pass movie and list type to the handleShowOptions function
  const handleShowOptionsWrapper = (movie, listType) => {
    handleShowOptions(movie, listType);
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchListVideoGames
        searchList={searchList}
        myListVideoGames={myListVideoGames}
        likedListVideoGames={likedListVideoGames}
        playedListVideoGames={playedListVideoGames}
        handleShowOptions={handleShowOptionsWrapper}
      />
      {/* Modal for displaying options related to the selected movie */}
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
    </View>
  );
}

export default SearchListVideoGamesScreen;
