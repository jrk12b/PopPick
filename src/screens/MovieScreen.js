/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/styles';
import PopularRec from '../components/movies/recommendations/PopularRec';
import UpcomingRec from '../components/movies/recommendations/UpcomingRec';
import TopRec from '../components/movies/recommendations/TopRec';
import PersonalRec from '../components/movies/recommendations/PersonalRec';
import MyList from '../components/movies/lists/MyList';
import WatchedList from '../components/movies/lists/WatchedList';
import LikedList from '../components/movies/lists/LikedList';
import OptionsModal from '../components/movies/OptionsModal';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import Loading from '../components/movies/Loading';
import Error from '../components/movies/Error';
import {useFocusEffect} from '@react-navigation/native';

function MovieScreen({navigation}) {
  const {
    myList,
    likedList,
    watchedList,
    personalMovies,
    popularMovies,
    upcomingMovies,
    topMovies,
    error,
    loading,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
    fetchRecommendations,
  } = useMovieLists();

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  useFocusEffect(
    useCallback(() => {
      fetchRecommendations();
      fetchMyList();
      fetchWatchedList();
    }, [likedList]),
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  // Combine all movies from the lists
  const allListMovies = [...myList, ...likedList, ...watchedList].map(
    movie => movie.id,
  );

  // Filter out movies that are already on any list
  const filterList = movies =>
    movies.filter(movie => !allListMovies.includes(movie.id));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchListScreen')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      <PersonalRec
        personalMovies={filterList(personalMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <PopularRec
        popularMovies={filterList(popularMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <UpcomingRec
        upcomingMovies={filterList(upcomingMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <TopRec
        topMovies={filterList(topMovies)}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <MyList
        myList={myList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <WatchedList
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <LikedList
        likedList={likedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
      />
    </ScrollView>
  );
}

export default MovieScreen;
