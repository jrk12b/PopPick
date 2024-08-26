/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import PopularRec from '../../components/recommendations/PopularRec';
import TopRec from '../../components/recommendations/TopRec';
import PersonalRec from '../../components/recommendations/PersonalRec';
import MyList from '../../components/lists/MyList';
import CustomRec from '../../components/recommendations/CustomRec';
import WatchedList from '../../components/lists/WatchedList';
import LikedList from '../../components/lists/LikedList';
import OptionsModal from '../../components/general/OptionsModal';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import {useFocusEffect} from '@react-navigation/native';

/**
 * MovieScreen Component
 *
 * This screen displays various movie lists and recommendations, allowing users
 * to view and interact with their movie collections and recommendations.
 */
function TvShowsScreen({navigation}) {
  // Custom hook to manage movie lists and fetch movie data
  const {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    personalTvShows,
    popularTvShows,
    topTvShows,
    customTvShows,
    error,
    loading,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
    fetchRecommendations,
    fetchCustomRecs,
  } = useTvShowLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedTvShow,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Fetch movie data and user lists when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchRecommendations();
      fetchMyList();
      fetchWatchedList();
      fetchCustomRecs();
    }, [likedListTvShows]), // Dependency on likedList to refetch when it changes
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
  const allListMovies = [
    ...myListTvShows,
    ...likedListTvShows,
    ...watchedListTvShows,
  ].map(tvShow => tvShow.id);

  // Filter out movies that are already on any list
  const filterList = tvShows =>
    tvShows.filter(tvShow => !allListMovies.includes(tvShow.id));

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
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      {/* Display list of watched movies */}
      <WatchedList
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      {/* Display list of liked movies */}
      <LikedList
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      {/* Display personal movie recommendations */}
      <PersonalRec
        personalMovies={filterList(personalTvShows)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      {/* Display popular movie recommendations */}
      <PopularRec
        popularMovies={filterList(popularTvShows)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      {/* Display top-rated movie recommendations */}
      <TopRec
        topMovies={filterList(topTvShows)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />

      <CustomRec
        customMovies={customTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="movies"
      />

      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedItem={selectedTvShow}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        mediaType="TV Shows"
      />
    </ScrollView>
  );
}

export default TvShowsScreen;
