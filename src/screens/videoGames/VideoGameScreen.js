import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import PersonalRec from '../../components/recommendations/PersonalRec';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import OptionsModal from '../../components/general/OptionsModal';
import useVideoGameModal from '../../hooks/videoGames/useVideoGameModal';
import MyList from '../../components/lists/MyList';
import WatchedList from '../../components/lists/WatchedList';
import LikedList from '../../components/lists/LikedList';

/**
 * VideoGameScreen Component
 *
 * Displays various video game lists and recommendations, allowing users
 * to interact with their collections and view personalized recommendations.
 */
function VideoGameScreen({navigation}) {
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

  // Filter out games already in the user's lists
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

      {/* Display list of liked games */}
      <LikedList
        myList={myListVideoGames}
        likedList={likedListVideoGames}
        watchedList={playedListVideoGames}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      {/* Display personal recommendations excluding already listed games */}
      <PersonalRec
        personalMovies={filterList(personalVideoGames)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="videoGames"
      />

      {/* Modal for managing options related to the selected game */}
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
    </ScrollView>
  );
}

export default VideoGameScreen;
