/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import PopularRec from '../../components/recommendations/PopularRec';
import UpcomingRec from '../../components/recommendations/UpcomingRec';
import TopRec from '../../components/recommendations/TopRec';
import PersonalRec from '../../components/recommendations/PersonalRec';
import MyList from '../../components/lists/MyList';
import CustomRec from '../../components/recommendations/CustomRec';
import WatchedList from '../../components/lists/WatchedList';
import LikedList from '../../components/lists/LikedList';
import OptionsModal from '../../components/general/OptionsModal';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import {useFocusEffect} from '@react-navigation/native';

/**
 * MovieScreen Component
 *
 * This screen displays various movie lists and recommendations, allowing users
 * to view and interact with their movie collections and recommendations.
 */
function MovieScreen({navigation}) {
  // Custom hook to manage movie lists and fetch movie data
  const {
    myList,
    likedList,
    watchedList,
    personalMovies,
    popularMovies,
    upcomingMovies,
    topMovies,
    customMovies,
    error,
    loading,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
    fetchRecommendations,
    fetchCustomRecs,
  } = useMovieLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Fetch movie data and user lists when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchRecommendations();
      fetchMyList();
      fetchWatchedList();
      fetchCustomRecs();
    }, [likedList]), // Dependency on likedList to refetch when it changes
  );

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <Error message={error.message} />;
  }

  // Combine all movies from the lists for filtering
  const allListMovies = [...myList, ...likedList, ...watchedList].map(
    movie => movie.id,
  );

  // Filter out movies that are already on any list
  const filterList = movies =>
    movies.filter(movie => !allListMovies.includes(movie.id));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Search button to navigate to the search screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      {/* Display user’s personal movie list */}
      <MyList
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display list of watched movies */}
      <WatchedList
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display list of liked movies */}
      <LikedList
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display personal movie recommendations */}
      <PersonalRec
        personalMovies={filterList(personalMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display popular movie recommendations */}
      <PopularRec
        popularMovies={filterList(popularMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display upcoming movie recommendations */}
      <UpcomingRec
        upcomingMovies={filterList(upcomingMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Display top-rated movie recommendations */}
      <TopRec
        topMovies={filterList(topMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      <CustomRec
        customMovies={customMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedItem={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="movies"
      />
    </ScrollView>
  );
}

export default MovieScreen;
