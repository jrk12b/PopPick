import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import PersonalRec from '../../components/movies/recommendations/PersonalRec';
import Loading from '../../components/movies/Loading';
import Error from '../../components/movies/Error';
import VideoGameOptionsModal from '../../components/videoGames/VideoGameOptionsModal';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import MyList from '../../components/movies/lists/MyList';
import WatchedList from '../../components/movies/lists/WatchedList';
import LikedList from '../../components/movies/lists/LikedList';

/**
 * VideoGameScreen Component
 *
 * This screen displays various movie lists and recommendations, allowing users
 * to view and interact with their movie collections and recommendations.
 */
function VideoGameScreen({navigation}) {
  // Custom hook to manage movie lists and fetch movie data
  const {
    myListVideoGames,
    likedListVideoGames,
    playedListVideoGames,
    personalVideoGames,
    error,
    loading,
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

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <Error message={error.message} />;
  }

  const allListVideoGames = [
    ...myListVideoGames,
    ...likedListVideoGames,
    ...playedListVideoGames,
  ]
    .filter(game => game)
    .map(game => game.id);

  const filterList = games =>
    games.filter(game => game && !allListVideoGames.includes(game.id));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Search button to navigate to the search screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Search Video Games')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      <MyList
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      {/* Display list of played games */}
      <WatchedList
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      {/* Display list of liked movies */}
      <LikedList
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      <PersonalRec
        personalMovies={filterList(personalVideoGames)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      {/* Modal for displaying options related to the selected movie */}
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
    </ScrollView>
  );
}

export default VideoGameScreen;
